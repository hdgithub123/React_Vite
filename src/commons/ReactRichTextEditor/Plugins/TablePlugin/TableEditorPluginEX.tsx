import React, { useState } from 'react';
import {
  EditorState,
  AtomicBlockUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';

// Add Table Function
const addTable = (editorState, { rows, cols, initialData = null }) => {
  const contentState = editorState.getCurrentContent();

  const tableData =
    initialData ||
    Array.from({ length: rows }, () => {
      const rowData = {};
      for (let i = 0; i < cols; i++) {
        rowData[`col_${i + 1}`] = '';
      }
      return rowData;
    });

  const contentStateWithEntity = contentState.createEntity('TABLE', 'IMMUTABLE', {
    rows,
    cols,
    data: tableData,
  });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

  return newEditorState;
};

// Update Table Entity Function
const updateTable = (editorState, entityKey, newData) => {
  const contentState = editorState.getCurrentContent();
  const newContentState = contentState.mergeEntityData(entityKey, { data: newData });

  return EditorState.push(editorState, newContentState, 'apply-entity');
};

// Table Component
const TableComponent = ({ block, contentState, onInputTable }) => {
  const entityKey = block.getEntityAt(0);
  const { data } = contentState.getEntity(entityKey).getData();

  const handleInput = (rowIndex, colKey, newValue) => {
    const newData = [...data];
    newData[rowIndex][colKey] = newValue;

    const blockTableInfo = {
      entityKey,
      data: newData,
    };

    if (onInputTable) {
      onInputTable(blockTableInfo);
    }
  };

  
  return (
    <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((colKey, colIndex) => (
              <td
                key={colIndex}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => handleInput(rowIndex, colKey, e.target.innerText)}
              >
                {row[colKey] || ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// blockRendererFn để render Atomic Block
const blockRendererFn = (block, editorState, onInputTable) => {
  if (block.getType() === 'atomic') {
    const entity = editorState.getCurrentContent().getEntity(block.getEntityAt(0));
    if (entity.getType() === 'TABLE') {
      return {
        component: TableComponent,
        editable: false,
        props: { onInputTable, contentState: editorState.getCurrentContent() },
      };
    }
  }
  return null;
};

// Main Editor Component
const TableEditorPluginEX = ({ initialRawData = null }) => {
  const [editorState, setEditorState] = useState(
    initialRawData
      ? EditorState.createWithContent(convertFromRaw(initialRawData))
      : EditorState.createEmpty()
  );

  const handleAddTable = () => {
    const rows = 3;
    const cols = 3;
    const initialData = [
      { col_1: 'A1', col_2: 'B1', col_3: 'C1' },
      { col_1: 'A2', col_2: 'B2', col_3: 'C2' },
      { col_1: 'A3', col_2: 'B3', col_3: 'C3' },
    ];

    setEditorState(addTable(editorState, { rows, cols, initialData }));
  };

  const handleInputTable = ({ entityKey, data }) => {
    setEditorState(updateTable(editorState, entityKey, data));
  };

  return (
    <div>
      <button onClick={handleAddTable}>Add Table</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={(block) =>
          blockRendererFn(block, editorState, handleInputTable)
        }
      />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default TableEditorPluginEX;
