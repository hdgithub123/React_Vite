import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import ImageComponent from './ImageComponent';
import styles from './createImagePlugin.module.css';

function createImagePlugin(config = {}) {

  const component2 = (props) => (
    <ImageComponent {...props} onDoubleClick={config.onDoubleClick} />
  );
  const component = config.decorator
    ? config.decorator(component2)
    : component2;
  return {
    // Block Renderer
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();

        if (type === 'IMAGE_BLOCK') {
          return {
            component,
            editable: false,
          };
        }
      }

      return null;
    },
  }
}


export default createImagePlugin;