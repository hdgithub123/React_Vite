import React, { useState } from 'react';
import { EditorState, Modifier } from 'draft-js';


const addImageInline = (editorState, { url, width, height, unit }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'IMAGE_INLINE',
    'MUTABLE',
    { url, width, height, unit }
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

  return newEditorState;
};

export default addImageInline;