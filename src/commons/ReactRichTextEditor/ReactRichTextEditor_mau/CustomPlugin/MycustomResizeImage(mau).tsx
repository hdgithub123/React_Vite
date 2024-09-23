import React, { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

// Component hiển thị hình ảnh với sự kiện click
const ImageComponent = ({ block, contentState, onClick }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, width, height } = entity.getData();

  return (
    <img
      src={src}
      width={width}
      height={height}
      onClick={() => onClick(block.getEntityAt(0))}
      alt=""
      style={{ cursor: 'pointer' }}
    />
  );
};



// Plugin tùy chỉnh cho hình ảnh
const createCustomImagePlugin = (config = {}) => {
  const component = (props) => (
    <ImageComponent {...props} onClick={config.onClick} />
  );

  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        if (type === 'IMAGE') {
          return {
            component: component,
            editable: false,
          };
        }
      }

      return null;
    },
  };
};

const MycustomResizeImage = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentEntityKey, setCurrentEntityKey] = useState(null);

  const imagePlugin = createCustomImagePlugin({
    onClick: (entityKey) => setCurrentEntityKey(entityKey),
  });

  const plugins = [imagePlugin];



  return (
    <div>
      <button onClick={() => addImage('https://images.pexels.com/photos/157757/wedding-dresses-fashion-character-bride-157757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',editorState,setEditorState)}>Add Image</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
      />
      {currentEntityKey && (
        <button onClick={() => resizeImage(currentEntityKey,editorState, 300, 300)}>Resize Image</button>
      )}
    </div>
  );
};

export default MycustomResizeImage;



const addImage = (url,editorState,setEditorState) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, width: 150, height: 150 });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  setEditorState(newEditorState);
};

const resizeImage = (entityKey,editorState,setEditorState, width, height) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.mergeEntityData(entityKey, { width, height });
  const newEditorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
  setEditorState(newEditorState);
};