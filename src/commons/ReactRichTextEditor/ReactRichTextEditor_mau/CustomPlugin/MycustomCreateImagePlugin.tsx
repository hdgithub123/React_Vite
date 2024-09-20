import React, { forwardRef, useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor'



// Hàm khởi tạo plugin
// function customCreateImagePlugin() {
//   return {
//     addImage: (editorState, imageInfo) => {
//       const contentState = editorState.getCurrentContent();
//       const contentStateWithEntity = contentState.createEntity(
//         'IMAGE',
//         'IMMUTABLE',
//         { imageInfo }  // Thêm imageInfo (bao gồm src, width, height)
//       );

//       const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//       if (!entityKey) {
//         console.error("Error: Entity creation failed.");
//         return editorState;
//       }

//       const newEditorState = AtomicBlockUtils.insertAtomicBlock(
//         editorState,
//         entityKey,
//         ' '
//       );
//       return EditorState.forceSelection(
//         newEditorState,
//         newEditorState.getCurrentContent().getSelectionAfter()
//       );
//     },

//     blockRendererFn: (contentBlock, { getEditorState, setEditorState }) => {
//       const type = contentBlock.getType();
//       if (type === 'atomic') {
//         return {
//           component: ImageComponent,
//           editable: false,
//           props: { getEditorState, setEditorState },
//         };
//       }
//       return null;
//     },
//   };
// }

function customCreateImagePlugin(decorator) {
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

    // Custom block renderer function for rendering image components
    blockRendererFn: (contentBlock, { getEditorState, setEditorState }) => {
      const type = contentBlock.getType();
      if (type === 'atomic') {
        // Render the image using the custom ImageComponent and handle focus/alignment
        return {
          component: decorator ? decorator(ImageComponent) : ImageComponent,
          editable: false,  // Prevent editing inside the image block
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

// const ImageComponent = ({ block, contentState}) => {
//   const entityKey = block.getEntityAt(0);
//   if (!entityKey) {
//     return <div>Error: Invalid image entity.</div>;
//   }

//   const entity = contentState.getEntity(entityKey);
//   const { imageInfo } = entity.getData();
//   return (
//     <div style={{ maxWidth: '100%', width: imageInfo.width || 'auto', height: imageInfo.height || 'auto' }}>
//       <img
//         src={imageInfo.url}
//         alt="Error Image!"

//       />
//     </div>
//   );
// };


const ImageComponent = forwardRef(
  ({
    block, // eslint-disable-line no-unused-vars
    blockProps, // eslint-disable-line no-unused-vars
    customStyleMap, // eslint-disable-line no-unused-vars
    customStyleFn, // eslint-disable-line no-unused-vars
    decorator, // eslint-disable-line no-unused-vars
    forceSelection, // eslint-disable-line no-unused-vars
    offsetKey, // eslint-disable-line no-unused-vars
    selection, // eslint-disable-line no-unused-vars
    tree, // eslint-disable-line no-unused-vars
    contentState, // eslint-disable-line no-unused-vars
    blockStyleFn, // eslint-disable-line no-unused-vars
    preventScroll, // eslint-disable-line no-unused-vars
    style,
    ...elementProps
  }, 

    
    ref

  ) => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return <div>Error: Invalid image entity.</div>;
  }

  const entity = contentState.getEntity(entityKey);
  const { imageInfo } = entity.getData();
  return (

    <img
      ref={ref}
      {...elementProps}
      src={imageInfo.url ? imageInfo.url : ''}
      alt="Error Image!"
      style={{ width: imageInfo.width || 'auto', height: imageInfo.height || 'auto', ...style }}
    />

  );
});


import { composeDecorators } from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';



import editorStyles from './editorStyles.module.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();


const decorator = composeDecorators(
  alignmentPlugin.decorator,
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);



// Component chính
const MycustomCreateImagePlugin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const imagePlugin = customCreateImagePlugin(decorator);
  // const plugins = [imagePlugin]
  const plugins = [
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
  ];
  const { AlignmentTool } = alignmentPlugin;

  return (
    <div>
      <ButtoncustomCreateImagePlugin editorState={editorState} setEditorState={setEditorState} imagePlugin={imagePlugin} ></ButtoncustomCreateImagePlugin>
      <div className={editorStyles.editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins} // Sử dụng plugin hình ảnh
        />
        <AlignmentTool></AlignmentTool>
      </div>

    </div>
  );
};

export default MycustomCreateImagePlugin;