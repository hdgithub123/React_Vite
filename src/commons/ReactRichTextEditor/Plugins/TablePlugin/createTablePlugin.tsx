import React from 'react';
import { Modifier, EditorState, ContentBlock } from 'draft-js';

// Table Component
const TableComponent = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { rows, cols, data } = entity.getData();

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%', border:'1px black solid' }}>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex} contentEditable>
                {data?.[rowIndex]?.[colIndex] || ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Block Renderer Function
const blockRendererFn = (contentBlock) => {
  if (contentBlock.getType() === 'table') {
    return {
      component: TableComponent,
      editable: false,
    };
  }
  return null;
};

// Add Table Function
const addTable = (editorState, rows, cols) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('TABLE', 'IMMUTABLE', {
    rows,
    cols,
    data: Array.from({ length: rows }, () => Array(cols).fill('')), // Empty table data
  });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newContentState = Modifier.insertText(
    contentState,
    editorState.getSelection(),
    ' ', // Placeholder to add the table
    null,
    entityKey
  );

  const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
  return EditorState.forceSelection(newEditorState, newContentState.getSelectionAfter());
};

// Plugin Structure
const createTablePlugin = () => ({
  blockRendererFn,
  addTable,
});

export default createTablePlugin;
