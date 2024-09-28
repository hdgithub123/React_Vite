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
//     // blockRendererFn: (contentBlock, { getEditorState, setEditorState }) => {
//     //   const type = contentBlock.getType();
//     //   if (type === 'atomic') {
//     //     return {
//     //       component: ImageComponent,
//     //       editable: false,
//     //       props: { getEditorState, setEditorState },
//     //     };
//     //   }
//     //   return null;
//     // },

//     blockRendererFn: (block, { getEditorState, setEditorState }) => {
//       if (block.getType() === 'atomic') {
//         const contentState = getEditorState().getCurrentContent();
//         const entity = contentState.getEntity(block.getEntityAt(0));
//         const type = entity.getType();

//         if (type === 'IMAGE') {
//           return {
//             component: ImageComponent,
//             editable: false,
//             props: {
//               updateData: (newData) => {
//                 const contentState = getEditorState().getCurrentContent();
//                 const updatedContentState = contentState.mergeEntityData(block.getEntityAt(0), newData);
//                 const newEditorState = EditorState.push(getEditorState(), updatedContentState, 'apply-entity');
//                 setEditorState(newEditorState);
//               },
//             },
//           };
//         }
//       }
//       return null;
//     },
//   };
// }

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

      // Kiểm tra nếu entityKey là null hoặc không hợp lệ
      if (!entityKey || entityKey === 'null') {
        console.error("Error: Entity creation failed or entityKey is null.");
        return editorState;
      }

      // Chèn block kiểu atomic với entityKey hợp lệ
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '  // Thêm một khoảng trắng để hiển thị ảnh
      );

      return EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      );
    },

    blockRendererFn: (block, { getEditorState, setEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entityKey = block.getEntityAt(0);

        // Kiểm tra entityKey trước khi sử dụng
        if (!entityKey || entityKey === 'null') {
          console.error("Error: Entity key is null for atomic block.");
          return null;
        }

        const entity = contentState.getEntity(entityKey);
        const type = entity.getType();

        if (type === 'IMAGE') {
          return {
            component: ImageComponent,
            editable: false,
            props: {
              updateData: (newData) => {
                const contentState = getEditorState().getCurrentContent();
                const updatedContentState = contentState.mergeEntityData(entityKey, newData);
                const newEditorState = EditorState.push(getEditorState(), updatedContentState, 'apply-entity');
                setEditorState(newEditorState);
              },
            },
          };
        }
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

// const ImageComponent = forwardRef(
//   ({
//     block, // eslint-disable-line no-unused-vars
//     blockProps, // eslint-disable-line no-unused-vars
//     customStyleMap, // eslint-disable-line no-unused-vars
//     customStyleFn, // eslint-disable-line no-unused-vars
//     decorator, // eslint-disable-line no-unused-vars
//     forceSelection, // eslint-disable-line no-unused-vars
//     offsetKey, // eslint-disable-line no-unused-vars
//     selection, // eslint-disable-line no-unused-vars
//     tree, // eslint-disable-line no-unused-vars
//     contentState, // eslint-disable-line no-unused-vars
//     blockStyleFn, // eslint-disable-line no-unused-vars
//     preventScroll, // eslint-disable-line no-unused-vars
//     style,
//     ...elementProps
//   },


//     ref

//   ) => {
//     const entityKey = block.getEntityAt(0);
//     if (!entityKey) {
//       return <div>Error: Invalid image entity.</div>;
//     }

//     const entity = contentState.getEntity(entityKey);
//     const { imageInfo } = entity.getData();
//     return (

//       <img
//         ref={ref}
//         {...elementProps}
//         src={imageInfo.url ? imageInfo.url : ''}
//         alt="Error Image!"
//         style={{ width: imageInfo.width || 'auto', height: imageInfo.height || 'auto', ...style }}
//       />

//     );
//   });

// const ImageComponent = ({ block, contentState, onClick}) => {
//   const entityKey = block.getEntityAt(0);
//   if (!entityKey) {
//     return <div>Error: Invalid image entity.</div>;
//   }

//   const entity = contentState.getEntity(entityKey);
//   const { imageInfo } = entity.getData();
//   const handleOnclick = () => {
//     onClick(entityKey)
//   }
//   return (
//     <div>
//       <img
//         src={imageInfo.url}
//         alt="Error Image!"
//         onClick={handleOnclick}
//         style={{ cursor: 'pointer', width: imageInfo.width || 'auto', height: imageInfo.height || 'auto', display:'flex' , justifyContent: 'center' }}
//       />
//     </div>
//   );
// };



const ImageComponent = ({ block, contentState, blockProps }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  // const { src, width, height, alignment } = entity.getData();  // Thêm thuộc tính alignment
  const { imageInfo } = entity.getData();  // Thêm thuộc tính alignment
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [imageWidth, setImageWidth] = useState(imageInfo.width || '100%');
  const [imageHeight, setImageHeight] = useState(imageInfo.height || 'auto');
  const [imageAlignment, setImageAlignment] = useState(imageInfo.alignment || 'center');  // Mặc định là căn giữa

  let imageNewInfo = {
        ...imageInfo
  }

  // console.log("imageInfo.width", imageInfo.width)
  // console.log("imageInfo.height", imageInfo.height)
  // console.log("imageInfo.alignment", imageInfo.alignment)
  // Hàm xử lý khi double-click vào ảnh
  const handleDoubleClick = () => {
    setShowEditPanel(!showEditPanel);
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value + 'px';
    setImageWidth(newWidth);
    imageNewInfo = {
      ...imageNewInfo,
      width: newWidth
    }
    blockProps.updateData({ imageInfo: imageNewInfo });
    // blockProps.updateData({ width: newWidth });
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value + 'px';
    setImageHeight(newHeight);
    imageNewInfo = {
      ...imageNewInfo,
      height: newHeight,
    }
    console.log("imageNewInfo",imageNewInfo)
    blockProps.updateData({ imageInfo: imageNewInfo });
    // blockProps.updateData({ height: newHeight });
  };

  const handleAlignmentChange = (alignment) => {
    setImageAlignment(alignment);
    blockProps.updateData({ alignment });
  };


// const handleUpdateWidthHeight = () =>{
//   blockProps.updateData({ imageInfo: imageNewInfo });
// }



  return (
    <div style={{ textAlign: imageAlignment }}>
      <img
        src={imageInfo.url}
        width={imageWidth}
        height={imageHeight}
        onDoubleClick={handleDoubleClick}
        alt="Draft.js Image"
        style={{ cursor: 'pointer' }}
      />

      {/* Bảng chỉnh sửa khi double click */}
      {showEditPanel && (
        <div className="edit-panel" style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>
          {/* <label>Width (%): </label>
          <input type="range" min="10" max="100" value={parseInt(imageWidth)} onChange={handleWidthChange} /> */}

          <label style={{ marginLeft: '10px' }}>Width (px): </label>
          <input type="number" value={parseInt(imageWidth)} onChange={handleWidthChange} />

          <label style={{ marginLeft: '10px' }}>Height (px): </label>
          <input type="number" value={parseInt(imageHeight)} onChange={handleHeightChange} />

          {/* Chỉnh căn lề */}
          <div style={{ marginTop: '10px' }}>
          {/* <button onClick={handleUpdateWidthHeight}>Update</button> */}
            <label>Alignment: </label>
            <button onClick={() => handleAlignmentChange('left')}>Left</button>
            <button onClick={() => handleAlignmentChange('center')}>Center</button>
            <button onClick={() => handleAlignmentChange('right')}>Right</button>
          </div>
        </div>
      )}
    </div>
  );
};



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
  const plugins = [
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
  ];



  return (
    <div>
      <ButtoncustomCreateImagePlugin editorState={editorState} setEditorState={setEditorState} imagePlugin={imagePlugin} ></ButtoncustomCreateImagePlugin>
      <div className={editorStyles.editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins} // Sử dụng plugin hình ảnh
        />
        {/* <AlignmentTool></AlignmentTool> */}
      </div>

    </div>
  );
};

export default MycustomCreateImagePlugin;