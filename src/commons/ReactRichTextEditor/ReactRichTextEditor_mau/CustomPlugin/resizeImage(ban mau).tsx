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
            component,
            editable: false,
          };
        }
      }

      return null;
    },
  };
};

const MycustomCreateImagePlugin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentEntityKey, setCurrentEntityKey] = useState(null);

  const imagePlugin = createCustomImagePlugin({
    onClick: (entityKey) => setCurrentEntityKey(entityKey),
  });

  const plugins = [imagePlugin];

  const addImage = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, width: 150, height: 150 });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    setEditorState(newEditorState);
  };

  const resizeImage = (entityKey, width, height) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.mergeEntityData(entityKey, { width, height });
    const newEditorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
    setEditorState(newEditorState);
  };

  return (
    <div>
      <button onClick={() => addImage('https://via.placeholder.com/150')}>Add Image</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
      />
      {currentEntityKey && (
        <button onClick={() => resizeImage(currentEntityKey, 300, 300)}>Resize Image</button>
      )}
    </div>
  );
};

export default MycustomCreateImagePlugin;
