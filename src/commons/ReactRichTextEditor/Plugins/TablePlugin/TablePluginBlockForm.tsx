import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import addTableBlock from './addTableBlock';



const TablePluginBlockForm = ({ editorState, setEditorState }) => {


  // Hàm để thêm hình ảnh vào editor
  const handleAddTable = () => {

      const tableInfo = {
        rows: 3,
        cols: 5,
        data: [
          { col_1: 'A1', col_2: 'B1', col_3: 'C1' },
          { col_1: 'A2', col_2: 'B2', col_3: 'C2' },
          { col_1: 'A3', col_2: 'B3', col_3: 'C3' },
        ],
      };
      // const newEditorState = imagePlugin.addImage(editorState, updatedImageInfo);
      const newEditorState = addTableBlock(editorState, tableInfo);
      setEditorState(newEditorState);
  };

  return (
    <div>
      <button onClick={handleAddTable}>Add Table</button>
    </div>
  )
};


export default TablePluginBlockForm;



