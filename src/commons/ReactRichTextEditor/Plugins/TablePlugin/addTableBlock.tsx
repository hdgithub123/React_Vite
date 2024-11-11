import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import ImageComponent from './TableBlockComponent';

  const addTableBlock = (editorState, { rows, cols, data = null }) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
  
    // Kiểm tra nếu block hiện tại là AtomicBlock
    if (block.getType() === 'atomic') {
      console.log("Please select another location!");
      return editorState;  // Nếu đang chọn vào một AtomicBlock, return mà không thêm ảnh
    }



    const tableData =
    data ||
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

  export default addTableBlock;