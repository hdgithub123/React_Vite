import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils, CompositeDecorator, convertToRaw } from 'draft-js';

// Add Image Function
const addImage = (editorState, setEditorState, src, alt) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'IMAGE', // Entity type
    'MUTABLE', // Inline entity type, as opposed to 'IMMUTABLE' for block entities
    { src, alt } // Entity data
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const selectionState = editorState.getSelection();
  const contentStateWithImage = Modifier.insertText(
    contentStateWithEntity,
    selectionState,
    ' ', // Placeholder for the image (will be replaced)
    null,
    entityKey
  );

  const newEditorState = EditorState.push(
    editorState,
    contentStateWithImage,
    'insert-characters'
  );
  setEditorState(RichUtils.toggleLink(newEditorState, selectionState, entityKey));
};

// Custom Image Component to render the inline image
const ImageComponent = ({ contentState, entityKey }) => {
  const { src, alt } = contentState.getEntity(entityKey).getData();
  return <img src={src} alt={alt} style={{ maxWidth: '100px', verticalAlign: 'middle' }} />;
};

// Strategy to find entities of type IMAGE
const findImageEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
    },
    callback
  );
};

// Create a CompositeDecorator
const decorator = new CompositeDecorator([
  {
    strategy: findImageEntities,
    component: ImageComponent,
  },
]);

// Main component
const InlineImageExample = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
  const url = 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg';

  return (
    <div>
      <button
        onClick={() => addImage(editorState, setEditorState, url, 'Example Image')}
      >
        Add Inline Image
      </button>
      <Editor editorState={editorState} onChange={setEditorState} />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default InlineImageExample;
