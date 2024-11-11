import React, { useState } from 'react';
import {Editor, EditorState, Modifier, CompositeDecorator, convertToRaw } from 'draft-js';


// const ImageComponentInline = ({ contentState, entityKey }) => {
//   const { url, width, height, unit } = contentState.getEntity(entityKey).getData();
//   console.log(url, width, height, unit)
//   return <img src={url} alt="inline" style={{ width: `${width}${unit}` || 'auto', height: `${height}${unit}` }} />;
// };


const ImageComponentInline = (props) => {
  const { url, width, height, unit } = props.contentState.getEntity(props.entityKey).getData();

  const handleDoubleClick = () => {
    

    const blockInfo = {
      EntityKey: props.entityKey,
      url: url,
      width: width,
      height: height,
      unit: unit,
  }

  if (props.onDoubleClickEntity) {
    props.onDoubleClickEntity(blockInfo);
  }


  };

  return (
    <img
      src={url}
      style={{
        width: `${width}${unit}` || 'auto',
        height: `${height}${unit}` || 'auto',
        // marginLeft: '2px',
        // marginRight: '2px',
        // verticalAlign: 'middle',
      }}
      onDoubleClick={handleDoubleClick}
      alt="Embedded"
    />
  );
};




export default ImageComponentInline;