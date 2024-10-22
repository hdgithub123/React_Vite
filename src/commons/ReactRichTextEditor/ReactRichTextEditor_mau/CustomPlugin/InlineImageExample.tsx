import React, { useState } from 'react';
import { Editor, EditorState, Modifier, CompositeDecorator, convertToRaw } from 'draft-js';


// Add Image Function
const addImage = (editorState, setEditorState, src, alt) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'IMAGE',
    'MUTABLE',
    { src, alt }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const selectionState = editorState.getSelection();
  
  // Add a space before the image
  let contentStateWithSpace = Modifier.insertText(
    contentState,
    selectionState,
    ' '
  );
  
  // Update selection state to be after the added space
  const selectionAfterSpace = contentStateWithSpace.getSelectionAfter();
  
  // Insert the image
  let contentStateWithImage = Modifier.insertText(
    contentStateWithSpace,
    selectionAfterSpace,
    ' ', // Placeholder for the image
    null,
    entityKey
  );

  // Add a space after the image
  const imageTextSelection = contentStateWithImage.getSelectionAfter();
  contentStateWithImage = Modifier.insertText(
    contentStateWithImage,
    imageTextSelection,
    ' '
  );

  const newEditorState = EditorState.push(
    editorState,
    contentStateWithImage,
    'insert-characters'
  );
  setEditorState(newEditorState);
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
  const url2 = 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-meo-ngau-35.jpg';
  return (
    <div>
      <button
        onClick={() => addImage(editorState, setEditorState, url, 'Example Image')}
      >
        Add Image 1
      </button>
      <button
        onClick={() => addImage(editorState, setEditorState, url2, 'Example Image')}
      >
        Add Image 2
      </button>
      <Editor editorState={editorState} onChange={setEditorState} />
      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
    </div>
  );
};

export default InlineImageExample;
