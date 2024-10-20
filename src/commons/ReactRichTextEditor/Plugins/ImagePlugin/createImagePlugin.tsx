import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import ImageComponent from './ImageComponent';


function createImagePlugin(config = {}) {

  const component2 = (props) => (
    <ImageComponent {...props} onClick={config.onClick} />
  );


  const component = config.decorator
    ? config.decorator(component2)
    : component2;


  return {
    addImage: (editorState, { url, width, height,unit, textAlign }) => {
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
        'IMAGE',
        'IMMUTABLE',
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
    },
    

    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();

        if (type === 'IMAGE') {
          return {
            component,
            editable: false,
          };
        }
      }

      return null;
    },
  };
}


export default createImagePlugin;