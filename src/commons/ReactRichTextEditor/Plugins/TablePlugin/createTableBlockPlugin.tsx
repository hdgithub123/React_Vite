import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'
import TableBlockComponent from './TableBlockComponent';

function createTableBlockPlugin(config = {}) {

  const component = (props) => (
    <TableBlockComponent {...props} onInput={config.onInput} />
  );

  return {
    // Block Renderer
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();

        if (type === 'TABLE') {
          return {
            component,
            editable: true,
          };
        }
      }

      return null;
    },
  }
}


export default createTableBlockPlugin;