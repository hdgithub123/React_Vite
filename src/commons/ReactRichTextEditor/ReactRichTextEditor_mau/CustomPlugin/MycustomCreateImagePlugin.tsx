import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import Editor from '@draft-js-plugins/editor'


function customCreateImagePlugin(config = {}) {
  

  const component2 = (props) => (
    <ImageComponent {...props} onClick={config.onClick} />
  );


  const component = config.decorator
    ? config.decorator(component2)
    : component2;


  return {
    addImage: (editorState, {url,width, height,textAlign}) => {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        // { imageInfo }  // Thêm imageInfo (bao gồm src, width, height)
        {
        url,
        width,
        height,
        textAlign
      }
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
}

// Component thao tác của user

const ButtoncustomCreateImagePlugin = ({ editorState, setEditorState, imagePlugin }) => {
  const imageInfoInnit = {
    url: '',
    width: '',
    height: '',
    unit: 'px', // Default unit
    textAlign: 'center',
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
        textAlign: `${imageInfo.textAlign}${imageInfo.unit}`
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



// const ImageComponent =
// (

//   { block, contentState, onClick }
  
// ) => {
//   const entity = contentState.getEntity(block.getEntityAt(0));
//   const { url,width, height,textAlign } = entity.getData();
//   const handleOnClick = () => {
//     onClick(block.getEntityAt(0))
//     console.log("block.getEntityAt(0)",block.getEntityAt(0))
//   }
//   return (
//     <div 
//     style={{ textAlign: textAlign }}
//     >
//       <img
      
//         src={url}
//         width={width}
//         height={height}
//         onClick={handleOnClick}
//         alt="Draft.js Image"
//         style={{ cursor: 'pointer' }}
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
    onClick,
    ...elementProps
  }, 

    
    ref

  ) => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return <div>Error: Invalid image entity.</div>;
  }

  const handleOnClick = () => {
    onClick(block.getEntityAt(0))
    console.log("block.getEntityAt(0)",block.getEntityAt(0))
  }


  const entity = contentState.getEntity(entityKey);
  const { url,width, height,textAlign } = entity.getData();
  return (

    <img
      ref={ref}
      {...elementProps}
      onClick={handleOnClick}
      src={url ? url : ''}
      alt="Error Image!"
      style={{ width: width || 'auto', height: height || 'auto', textAlign: textAlign, ...style }}
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
  // alignmentPlugin.decorator,
  // resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);



// Component chính
const MycustomCreateImagePlugin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentEntityKey, setCurrentEntityKey] = useState(null);
  // const imagePlugin = customCreateImagePlugin({ onClick: (entityKey) => setCurrentEntityKey(entityKey) });
  const imagePlugin = customCreateImagePlugin({ decorator, onClick: (entityKey) => setCurrentEntityKey(entityKey)  });


  
  const plugins = [
    blockDndPlugin,
    focusPlugin,
    // alignmentPlugin,
    // resizeablePlugin,
    imagePlugin,
  ];


  const infoIMG = {
    width: '400px',
    height: '300px',
    textAlign: 'center'
  }
  const infoIMG2 = {
    width: '100px',
    height: '200px',
    textAlign: 'left'
  }

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
      {/* <button onClick={() => resizeImage(currentEntityKey, infoIMG)}>Change Image</button> */}
      <button onClick={()=>resizeImage(currentEntityKey, infoIMG,editorState,setEditorState )}>Change Image</button>
      <button onClick={()=>resizeImage(currentEntityKey, infoIMG2,editorState,setEditorState )}>Change Image 2</button>
      <button onClick={()=> console.log("currentEntityKey",currentEntityKey)}>console</button>
    </div>
  );
};

export default MycustomCreateImagePlugin;



const resizeImage = (entityKey, info, editorState, setEditorState) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
    width: info.width,
    height: info.height,
    textAlign: info.textAlign,
  });

  const newEditorState = EditorState.push(
    editorState,
    contentStateWithEntity,
    'apply-entity'
  );

  // Buộc editor render lại
  const selectionState = newEditorState.getSelection();
  const forcedEditorState = EditorState.forceSelection(newEditorState, selectionState);

  // Cập nhật editorState mới
  setEditorState(forcedEditorState);
};
