import React, { useState } from 'react';
import { Editor, EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';

import editorStyles from './TryCustomImage.module.css';

// Image Component
const ImageComponent = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, alt } = entity.getData();
  return <img src={src} alt={alt} style={{ maxWidth: '100%' }} />;
};

// Block Renderer Function
const blockRendererFn = (block) => {
  if (block.getType() === 'atomic') {
    return {
      component: ImageComponent,
      editable: false,
    };
  }
  return null;
};

// Add Image Function
const addImage = (editorState, setEditorState, src, alt) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src, alt });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');

  setEditorState(
    EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter()
    )
  );
};

// Block Style Function (override default figure tag styling)
const blockStyleFn = (block) => {
  if (block.getType() === 'atomic') {
    return editorStyles.atomic_block; // Custom class for atomic block
  }
  return '';
};

// Main Component
const TryCustomImage = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const url = 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg';

  return (
    <div>
      <button
        onClick={() => addImage(editorState, setEditorState, url, 'Example Image')}
      >
        Add Image
      </button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={blockRendererFn}
        blockStyleFn={blockStyleFn} // Override the default block style
      />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default TryCustomImage;
