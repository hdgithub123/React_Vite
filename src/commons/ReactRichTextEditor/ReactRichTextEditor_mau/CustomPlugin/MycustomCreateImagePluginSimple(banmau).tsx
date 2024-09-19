import React, { useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor'



// Hàm khởi tạo plugin
function customCreateImagePlugin() {
  return {
    addImage: (editorState, imageInfo) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { imageInfo }  // Thêm imageInfo (bao gồm src, width, height)
      );

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      if (!entityKey) {
        console.error("Error: Entity creation failed.");
        return editorState;
      }

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

    blockRendererFn: (contentBlock, { getEditorState, setEditorState }) => {
      const type = contentBlock.getType();
      if (type === 'atomic') {
        return {
          component: ImageComponent,
          editable: false,
          props: { getEditorState, setEditorState },
        };
      }
      return null;
    },
  };
}

// Component thao tác của user

const ButtoncustomCreateImagePlugin = ({ editorState, setEditorState, imagePlugin }) => {
  const imageInfoInnit = { 
    url: '',
    width: '',
    height: '',
    unit: 'px', // Default unit
  };
  const [imageInfo, setImageInfo] = useState(imageInfoInnit);
  const [locked, setLocked] = useState(true); // State for lock
  const [aspectRatio, setAspectRatio] = useState(1); // To store the aspect ratio

  // Hàm để thêm hình ảnh vào editor
  const addImageToEditor = () => {
    if (imageInfo.url && imageInfo.width && imageInfo.height) {
      const updatedImageInfo = {
        ...imageInfo,
        width: `${imageInfo.width}${imageInfo.unit}`, // Combine width with unit
        height: `${imageInfo.height}${imageInfo.unit}`, // Combine height with unit
      };
      const newEditorState = imagePlugin.addImage(editorState, updatedImageInfo);
      setEditorState(newEditorState);
    }
  };

  // Khi người dùng thay đổi width
  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    if (locked && aspectRatio) {
      const newHeight = (newWidth / aspectRatio).toFixed(2); // Calculate height based on aspect ratio
      setImageInfo((prev) => ({
        ...prev,
        width: newWidth,
        height: newHeight,
      }));
    } else {
      setImageInfo((prev) => ({
        ...prev,
        width: newWidth,
      }));
    }
  };

  // Khi người dùng thay đổi height
  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    if (locked && aspectRatio) {
      const newWidth = (newHeight * aspectRatio).toFixed(2); // Calculate width based on aspect ratio
      setImageInfo((prev) => ({
        ...prev,
        height: newHeight,
        width: newWidth,
      }));
    } else {
      setImageInfo((prev) => ({
        ...prev,
        height: newHeight,
      }));
    }
  };

  // Khi người dùng thay đổi URL ảnh
  const handleUrlOnChange = (e) => {
    const url = e.target.value;
    setImageInfo((prev) => ({
      ...prev,
      url: url,
    }));

    // Cập nhật tỷ lệ khi URL thay đổi (sử dụng URL để lấy kích thước ảnh ban đầu)
    if (url) {
      const img = new Image();
      img.onload = () => {
        // Khi ảnh đã tải xong, cập nhật width, height và tỷ lệ
        setImageInfo((prev) => ({
          ...prev,
          width: img.width,
          height: img.height,
        }));
        setAspectRatio(img.width / img.height); // Tính và lưu tỷ lệ gốc
      };
      img.src = url; // Load ảnh từ URL
    }
  };

  // Khi người dùng thay đổi đơn vị px, mm, rem, em
  const handleUnitChange = (e) => {
    setImageInfo((prev) => ({
      ...prev,
      unit: e.target.value,
    }));
  };

  // Khi người dùng tick/untick vào checkbox
  const handleLockToggle = () => {
    if (!locked && imageInfo.width && imageInfo.height) {
      // Tính toán tỷ lệ khi khóa
      const ratio = imageInfo.width / imageInfo.height;
      setAspectRatio(ratio);
    }
    setLocked(!locked); // Đổi trạng thái khóa/mở khóa
  };

  return (
    <div>
      {/* Textbox để nhập URL */}
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageInfo.url}
        onChange={handleUrlOnChange}
        style={{ marginRight: '10px', padding: '5px' }}
      />

      <p>Edit Image Size:</p>
      <input
        type="number"
        placeholder="Width"
        value={imageInfo.width}
        onChange={handleWidthChange}
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        placeholder="Height"
        value={imageInfo.height}
        onChange={handleHeightChange}
      />

      {/* Dropdown để chọn đơn vị */}
      <select value={imageInfo.unit} onChange={handleUnitChange} style={{ marginLeft: '10px' }}>
        <option value="px">px</option>
        <option value="mm">mm</option>
        <option value="rem">rem</option>
        <option value="em">em</option>
      </select>

      {/* Checkbox để khóa tỷ lệ */}
      <label style={{ marginLeft: '10px', display: 'inline-flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={locked}
          onChange={handleLockToggle}
          style={{ marginRight: '5px' }}
        />
        Lock Aspect Ratio
      </label>

      {/* Nút để thêm hình ảnh */}
      <button onClick={addImageToEditor} style={{ marginLeft: '10px' }}>Add Image</button>
    </div>
  );
};



// component sẽ được Render ra editor

const ImageComponent = ({ block, contentState}) => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return <div>Error: Invalid image entity.</div>;
  }

  const entity = contentState.getEntity(entityKey);
  const { imageInfo } = entity.getData();
  return (
    <div>
      <img
        src={imageInfo.url}
        alt="Error Image!"
        style={{ maxWidth: '100%', width: imageInfo.width || 'auto', height: imageInfo.height || 'auto' }}
      />
    </div>
  );
};


// Component chính
const MycustomCreateImagePlugin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const imagePlugin = customCreateImagePlugin();
  const plugins = [imagePlugin]
  return (
    <div>
      <ButtoncustomCreateImagePlugin editorState={editorState} setEditorState={setEditorState} imagePlugin={imagePlugin} ></ButtoncustomCreateImagePlugin>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins} // Sử dụng plugin hình ảnh
      />
    </div>
  );
};

export default MycustomCreateImagePlugin;