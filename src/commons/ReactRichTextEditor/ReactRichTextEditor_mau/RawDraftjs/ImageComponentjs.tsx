import React, { useState } from 'react';
import { Editor, EditorState, AtomicBlockUtils } from 'draft-js';

const ImageComponentjs = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const runinsertImage = () => {
    const imageInfo = {
      ulr: 'data:image/jpeg;base64,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',
      width: '100px',  // Thêm thuộc tính width
      height: '200px'  // Thêm thuộc tính height
    }
    const newEditorState = insertImage(editorState, imageInfo);
    setEditorState(newEditorState);
  }

  const blockRendererFn = (block) => {
    const type = block.getType();
    switch (type) {
      case 'atomic': {
        const entity = block.getEntityAt(0);
        if (entity) {
          const contentState = editorState.getCurrentContent();
          const entityType = contentState.getEntity(entity).getType();
          switch (entityType) {
            case 'IMAGE':
              return {
                component: ImageComponent,
                editable: false,
              };
            default:
              return null;
          }
        }
        return null;
      }
      default:
        return null;
    }
  };


  return (
    <div style={{border: '2px black solid'}}>
      <button onClick={runinsertImage}>Insert Image</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={blockRendererFn}
      />
    </div>
  );
};

export default ImageComponentjs;


const insertImage = (editorState, imageInfo) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'IMAGE',
    'IMMUTABLE',
    {
      imageInfo
    }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  return newEditorState
};


const ImageComponent = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { imageInfo } = entity.getData();
  return <div style={{ margin: '100px', background: 'red' }}>
    <img src={imageInfo.ulr} alt="Image" style={{ width: imageInfo.width, height: imageInfo.height }} />;
  </div>
};