import React, { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

// Component hiển thị hình ảnh với sự kiện click
const ImageComponent = ({ block, contentState, onClick }) => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) return null; // Ensure entity exists
  const entity = contentState.getEntity(entityKey);
  const { src, width, height } = entity.getData();
  return (
    <img
      src={src}
      width={width}
      height={height}
      onClick={() => onClick(entityKey)}
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
        <button onClick={() => resizeImage(currentEntityKey,editorState,setEditorState, 300, 300)}>Resize Image</button>
      )}
    </div>
  );
};

export default MycustomResizeImage;



// const addImage = (url,editorState,setEditorState) => {
//   const contentState = editorState.getCurrentContent();
//   const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, width: 150, height: 150 });
//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//   if (!entityKey) return; // Check for valid entity key

//   console.log("entityKey", entityKey)

//   const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
//   console.log("newEditorState", newEditorState)
//   setEditorState(newEditorState);
// };

const resizeImage = (entityKey, editorState, setEditorState, width, height) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.mergeEntityData(entityKey, { width, height});
  const newEditorState = EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
  setEditorState(newEditorState);
};


// const addImage = (url, editorState, setEditorState) => {
//   const contentState = editorState.getCurrentContent();
//   const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
//     src: url,
//     width: 150,
//     height: 150,
//   });
//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//   if (!entityKey) return; // Check for valid entity key

//   console.log("entityKey", entityKey);

//   // Đảm bảo chọn vị trí hợp lý để chèn hình ảnh
//   const selectionState = editorState.getSelection();
//   const newEditorState = AtomicBlockUtils.insertAtomicBlock(
//     EditorState.acceptSelection(editorState, selectionState), 
//     entityKey, 
//     ' ' // Insert a space after the image
//   );

//   console.log("newEditorState", newEditorState);
//   setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
// };



// const addImage = (url, editorState, setEditorState) => {
//   const contentState = editorState.getCurrentContent();
  
//   // Kiểm tra selection hiện tại có phải là valid hay không
//   const selectionState = editorState.getSelection();
//   if (!selectionState || selectionState.isCollapsed()) {
//     console.error("selectionState",selectionState);
//     // console.error("Invalid selection state");
//     return;
//   }

//   // Tạo entity mới cho ảnh
//   const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
//     src: url,
//     width: 150,
//     height: 150,
//   });

//   // Lấy entityKey từ entity vừa tạo
//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//   if (!entityKey) {
//     console.error("Failed to create entity for image.");
//     return; // Dừng nếu không có entityKey hợp lệ
//   }

//   // Thay đổi editorState với entity mới
//   const newContentState = editorState.getCurrentContent();
//   const newEditorState = AtomicBlockUtils.insertAtomicBlock(
//     EditorState.push(editorState, newContentState, 'apply-entity'),
//     entityKey,
//     ' '
//   );

//   // Cập nhật lại editorState với lựa chọn mới
//   setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getSelection()));
// };



const addImage = (url, editorState, setEditorState) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockKey = selectionState.getAnchorKey();
  const block = contentState.getBlockForKey(blockKey);

  // Kiểm tra nếu block hiện tại là AtomicBlock
  if (block.getType() === 'atomic') {
    console.log("Selection is inside an atomic block. Cancelling image insert.");
    return;  // Nếu đang chọn vào một AtomicBlock, return mà không thêm ảnh
  }

  // Tiếp tục thêm ảnh nếu không ở trong AtomicBlock
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, width: 150, height: 150 });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  
  if (!entityKey) return;  // Check for valid entity key

  const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
  setEditorState(newEditorState);
};

