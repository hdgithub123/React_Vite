import React, { useState, useRef } from 'react';
import { Editor, EditorState, Modifier, SelectionState, ContentBlock, ContentState, genKey,EditorBlock,convertToRaw } from 'draft-js';
import { Map } from 'immutable';
import { createPortal } from 'react-dom';
import 'draft-js/dist/Draft.css';
// import camelCase from 'lodash/camelCase';


import TableGrid from './TableGrid';
// Table Component
const Table = props => {
  const { block, blockProps: { editorRef } } = props;
  console.log("propstable", props);
  // console.log("block", block);
  // console.log("editor", editor);
  if (block.getData().get('tablePosition') && !block.getData().get('tableShape')) {
    const position = block.getData().get('tablePosition');
    const target = editorRef?.editor.querySelector(`[data-position='${position}']`);
    if (target) {
      return createPortal(<EditorBlock {...props} />, target);
    }
    return null;
  }
  const data = block.getData();
  const tableKey = data.get('tableKey');
  const tableShape = data.get('tableShape');
  const tableStyle = Map(data.get('tableStyle')).mapKeys(k => camelCase(k)).toJS();

  if (!tableShape) return null;
  console.log("tableShape", tableShape);


  return (
    <table key={tableKey} style={tableStyle} id={tableKey}>
      <tbody>
        {tableShape.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const cellStyle = Map(cell.style).mapKeys(k => camelCase(k)).toJS();
              return (
                // <td key={j} style={cellStyle} data-position={`${tableKey}-${i}-${j}`}>
                <td key={j} style={cellStyle} data-position={`${tableKey}-${i}-${j}`}>
                   {/* {!!((i === 0) && (j === 0)) && <EditorBlock {...props} />} */}
                  {((i === 0) && (j === 0)) && <EditorBlock {...props} />}
                
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};



// Insert Table Function
const insertTable = (editorState, onChange) => {
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) return null;

  const defaultCellStyle = { border: '1px solid rgba(0, 0, 0, 0.2)', padding: '6px', textAlign: 'center' };
  const cols = Array(3).fill(1);
  const tableShape = Array(3).fill(cols).map(row => row.map(() => ({ element: 'td', style: { ...defaultCellStyle } })));


  const tableKey = genKey();
  const newBlocks = [];
  tableShape.forEach((row, i) => {
    row.forEach((cell, j) => {
      let data = Map({
        tableKey,
        tablePosition: `${tableKey}-${i}-${j}`,
        textAlign: 'center',
      });
      if (i === 0 && j === 0) {
        data = data.set('tableShape', tableShape).set('tableStyle', { borderCollapse: 'collapse', margin: '15px 0', width: '100%' });
      }
      const newBlock = new ContentBlock({ key: genKey(), type: 'table', text: ' ', data });
      newBlocks.push(newBlock);
    });
  });

  console.log("newBlocks", newBlocks);


  let contentState = editorState.getCurrentContent();
  contentState = Modifier.splitBlock(contentState, selection);
  const blockArray = contentState.getBlocksAsArray();
  const currBlock = contentState.getBlockForKey(selection.getAnchorKey());
  const index = blockArray.findIndex(block => block === currBlock);
  blockArray.splice(index + 1, 0, ...newBlocks);

  const entityMap = contentState.getEntityMap();
  contentState = ContentState.createFromBlockArray(blockArray, entityMap);
  let newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
  const key = newBlocks[0].getKey();
  selection = SelectionState.createEmpty(key);
  newEditorState = EditorState.acceptSelection(newEditorState, selection);
  // console.log("newEditorState", newEditorState);
  onChange(newEditorState);
};




const insertTable2 = (editorState, onChange, size) => {
  let selection = editorState.getSelection();
  if (!selection.isCollapsed()) return null;

  const { cols, rows } = size;
  const defaultCellStyle = { border: '1px solid rgba(0, 0, 0, 0.2)', padding: '6px', textAlign: 'center' };
  const tableShape = Array(rows).fill(Array(cols).fill(1)).map(row => row.map(() => ({ element: 'td', style: { ...defaultCellStyle } })));

  const tableKey = genKey();
  const newBlocks = [];
  tableShape.forEach((row, i) => {
    row.forEach((cell, j) => {
      let data = Map({
        tableKey,
        tablePosition: `${tableKey}-${i}-${j}`,
        textAlign: 'center',
      });
      if (i === 0 && j === 0) {
        data = data.set('tableShape', tableShape).set('tableStyle', { borderCollapse: 'collapse', margin: '15px 0', width: '100%' });
      }
      const newBlock = new ContentBlock({ key: genKey(), type: 'table', text: ' ', data });
      newBlocks.push(newBlock);
      console.log("data2", data);
      console.log("newBlocks", newBlocks);
    });
  });


  let contentState = editorState.getCurrentContent();
  contentState = Modifier.splitBlock(contentState, selection);
  const blockArray = contentState.getBlocksAsArray();
  const currBlock = contentState.getBlockForKey(selection.getAnchorKey());
  const index = blockArray.findIndex(block => block === currBlock);
  blockArray.splice(index + 1, 0, ...newBlocks);
  console.log("blockArray", blockArray);
  const entityMap = contentState.getEntityMap();
  contentState = ContentState.createFromBlockArray(blockArray, entityMap);
  let newEditorState = EditorState.push(editorState, contentState, 'insert-fragment');
  const key = newBlocks[0].getKey();
  selection = SelectionState.createEmpty(key);
  newEditorState = EditorState.acceptSelection(newEditorState, selection);
  onChange(newEditorState);
};



// Custom Block Renderer
const getBlockRendererFn = (editorRef, getEditorState, onChange) => block => {
  if (block.getType() === 'table') {
    return {
      component: Table,
      editable: true,
      props: {
        editorRef,
      },
    };
  }
  return null;
};

// Main Editor Component
const TableRichEditor = () => {
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = newState => {
    setEditorState(newState);
  };

  const handleCellClick = (size) => {
    console.log("size", size);
    insertTable2(editorState, onChange, size);
  };






  return (
    <div>
      <button onClick={() => insertTable(editorState, onChange,'200px','500px')}>Insert Table</button>
      <TableGrid handleSubmit={handleCellClick} maxGridSize = {10}/>
      <Editor
        ref={editorRef}
        editorState={editorState}
        blockRendererFn={getBlockRendererFn(editorRef.current, () => editorState, onChange)}
        onChange={onChange}
      />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default TableRichEditor;



function camelCase(input) {
  return input
    .toLowerCase() // Ensure all characters are lowercase initially
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase()); // Replace delimiter and capitalize next character
}