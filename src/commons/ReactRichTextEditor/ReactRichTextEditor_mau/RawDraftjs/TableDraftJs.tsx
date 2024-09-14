import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

// Table Block Component
const TableBlockComponent = ({ block, editorState, onChange }) => {
    console.log("block3",block)
  const data = block.getData().toJS();
  const rows = data.rows || 3;
  const columns = data.columns || 3;
  const tableData = data.data || Array.from({ length: rows }, () => Array(columns).fill(''));

  console.log("block",block)
  console.log("data",data)
  console.log("tableData",tableData)



  const handleCellChange = (rowIndex, colIndex, value) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;

    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.setBlockData(
      contentState,
      editorState.getSelection(),
      {
        ...data,
        data: newTableData, // Update the specific cell content
      }
    );

    onChange(EditorState.push(editorState, newContentState, 'change-block-data'));
  };

  return (
    <table style={{border: '5px' }}>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', border: '5px' }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// blockRendererFn for Table Block
const blockRendererFn = (block, editorState, onChange) => {
    console.log("block2",block)
  console.log("editorState2",editorState)
  console.log("onChange",onChange)


  if (block.getType() === 'table') {
    return {
      component: TableBlockComponent,
      editable: false, // Prevents direct text input in block, only allows cell editing
      props: { editorState, onChange },
    };
  }
  return null;
};

// Utility function to insert a table block
const insertTableBlock = (editorState, rows = 3, columns = 3) => {
    console.log("editorState",editorState)


  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  console.log("contentState",contentState)
  console.log("selectionState",selectionState)



  const newContentState = Modifier.setBlockData(
    contentState,
    selectionState,
    {
      type: 'table',
      rows,
      columns,
      data: Array.from({ length: rows }, () => Array(columns).fill('')),
    }
  );

  const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
  return RichUtils.insertSoftNewline(newEditorState); // Insert the table as a new block
};

// Main Editor Component
const TableEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null); 
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleInsertTable = () => {
    const newEditorState = insertTableBlock(editorState, 4, 4); // Insert a 4x4 table
    setEditorState(newEditorState);
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // Focus the editor
    }
  };


const TableBlock = (block)=>{
    blockRendererFn(block, editorState, handleEditorChange)
}

  return (
    <div>
      <button onClick={handleInsertTable}>Insert Table</button>
      <div
        style={{ border: '1px solid black', minHeight: '200px', padding: '10px' }}
        onClick={focusEditor} // Now uses the ref to focus
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          blockRendererFn={TableBlock}
          ref={editorRef} // Attach the ref to the Editor
        />
      </div>
    </div>
  );
};

export default TableEditor;
