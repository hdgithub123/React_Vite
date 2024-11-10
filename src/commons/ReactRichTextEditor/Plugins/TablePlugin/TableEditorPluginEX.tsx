import React, { useState } from 'react';
import { EditorState, Modifier, CompositeDecorator, convertToRaw, Editor } from 'draft-js';

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
  const newContentState = Modifier.insertText(
    contentState,
    editorState.getSelection(),
    ' ', // Placeholder
    null,
    entityKey
  );

  const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

// Table Component
const TableComponent = (props) => {
  const { data } = props.contentState.getEntity(props.entityKey).getData();
  const { contentState, setEditorState, editorState, entityKey } = props;

  const handleBlur = (rowIndex, colKey, newValue) => {
    data[rowIndex][colKey] = newValue;

    const newContentState = contentState.mergeEntityData(entityKey, { data });
    const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity');

    setEditorState(newEditorState);
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
                suppressContentEditableWarning={true}
                onBlur={(e) => handleBlur(rowIndex, colKey, e.target.innerText)}
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

// Strategy to find TABLE entities
const findTableEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'TABLE';
    },
    callback
  );
};

// Create Composite Decorator
const decorator = new CompositeDecorator([
  {
    strategy: findTableEntities,
    component: (props) => (
      <TableComponent
        {...props}
        editorState={props.editorState}
        setEditorState={props.setEditorState}
      />
    ),
  },
]);

// Main Editor Component
const TableEditorPluginEX = ({ initialRawData = null }) => {
  const [editorState, setEditorState] = useState(
    initialRawData
      ? EditorState.createWithContent(convertFromRaw(initialRawData), decorator)
      : EditorState.createEmpty(decorator)
  );

  const handleAddTable = () => {
    const rows = 5;
    const cols = 3;
    const initialData = [
      { col_1: 'Value1', col_2: 'Value2', col_3: 'Value3' },
      { col_1: 'Value4', col_2: 'Value5', col_3: 'Value6' },
      { col_1: 'Value7', col_2: 'Value8', col_3: 'Value9' },
    ];

    setEditorState(addTable(editorState, { rows, cols, initialData }));
  };

  return (
    <div>
      <button onClick={handleAddTable}>Add Table</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={(block) => {
          if (block.getType() === 'atomic') {
            return {
              component: TableComponent,
              editable: false,
              props: { editorState, setEditorState },
            };
          }
          return null;
        }}
      />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default TableEditorPluginEX;
