import React, { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor'

// Hàm khởi tạo plugin
function customCreateImagePlugin() {
  return {
    addImage: (editorState, imageUrl) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: imageUrl },
      );

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      );
      return EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      );
    },

    blockRendererFn: (contentBlock) => {
      const type = contentBlock.getType();
      if (type === 'atomic') {
        return {
          component: ImageComponent,
          editable: false,
        };
      }
      return null;
    },
  };
}

// Component hiển thị hình ảnh
const ImageComponent = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  return <img src={src} alt="editor-img" style={{ maxWidth: '100%' }} />;
};


// Component thao tac cua user
const ButtoncustomCreateImagePlugin = ({ editorState, setEditorState, imagePlugin }) => {
  // Sử dụng state để lưu trữ URL của hình ảnh được nhập từ textbox
  const [imageUrl, setImageUrl] = useState('');

  // Hàm để thêm hình ảnh vào editor
  const addImageToEditor = () => {
    if (imageUrl) {
      const newEditorState = imagePlugin.addImage(editorState, imageUrl);
      setEditorState(newEditorState);
      setImageUrl(''); // Xóa URL sau khi thêm
    }
  };

  return (
    <div>
      {/* Textbox để nhập URL */}
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)} // Cập nhật state khi người dùng nhập URL
        style={{ marginRight: '10px', padding: '5px' }}
      />
      {/* Nút để thêm hình ảnh */}
      <button onClick={addImageToEditor}>Add Image</button>
    </div>
  );
};


// da het khai bao 1 plugin







// Component chính
const MycustomCreateImagePlugin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const imagePlugin = customCreateImagePlugin();


  return (
    <div>
      <ButtoncustomCreateImagePlugin editorState= {editorState} setEditorState={setEditorState} imagePlugin={imagePlugin} ></ButtoncustomCreateImagePlugin>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={[imagePlugin]} // Sử dụng plugin hình ảnh
      />
    </div>
  );
};

export default MycustomCreateImagePlugin;
