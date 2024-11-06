import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import ImageComponent from './ImageComponent';


const addImageBlock = (editorState, { url, width, height,unit, textAlign }) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
  
    // Kiểm tra nếu block hiện tại là AtomicBlock
    if (block.getType() === 'atomic') {
      console.log("Please select another location!");
      return editorState;  // Nếu đang chọn vào một AtomicBlock, return mà không thêm ảnh
    }
    
    // Tạo entity mới cho ảnh
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE_BLOCK',
      'MUTABLE',
      {
        url,
        width,
        height,
        unit,
        textAlign
      }
    );
  
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  
    // Kiểm tra nếu entityKey là null hoặc không hợp lệ
    if (!entityKey || entityKey === 'null') {
      console.error("Error: Entity creation failed or entityKey is null.");
      return editorState;
    }
  
    // Chèn block kiểu atomic với entityKey hợp lệ
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '  // Thêm một khoảng trắng để hiển thị ảnh
    );
  
    // Cập nhật selectionState sau khi thêm ảnh
    return EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter()
    );
  }

  export default addImageBlock;