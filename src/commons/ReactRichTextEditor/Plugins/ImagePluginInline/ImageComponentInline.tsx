import React, { useState } from 'react';
import {Editor, EditorState, Modifier, CompositeDecorator, convertToRaw } from 'draft-js';


const ImageComponentInline = ({ contentState, entityKey }) => {
  const { url, width, height, unit } = contentState.getEntity(entityKey).getData();
  console.log(url, width, height, unit)
  return <img src={url} alt="inline" style={{ width: `${width}${unit}` || 'auto', height: `${height}${unit}` }} />;
};



export default ImageComponentInline;