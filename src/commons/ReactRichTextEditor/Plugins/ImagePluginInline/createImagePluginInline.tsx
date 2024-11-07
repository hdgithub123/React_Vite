import React from 'react';
import { Modifier, CompositeDecorator, EditorState } from 'draft-js';
import addImageInline from './addImageInline';
import ImageComponentInline from './ImageComponentInline';
import findImageInlineEntities from './findImageInlineEntities';

// The actual plugin export
// const createImagePluginInline = () => ({
//   decorators: [
//     {
//       strategy: findImageInlineEntities,
//       component: ImageComponentInline,
//     },
//   ],
//   addImage: addImageInline,
// });


const createImagePluginInline = ({ onDoubleClickEntity }) => ({
  decorators: [
    {
      strategy: findImageInlineEntities,
      component: (props) => (
        <ImageComponentInline {...props} onDoubleClickEntity={onDoubleClickEntity} />
      ),
    },
  ],
  addImage: addImageInline,
});


export default createImagePluginInline;
