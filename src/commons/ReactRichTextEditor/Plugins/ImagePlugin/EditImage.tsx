import { EditorState } from "draft-js";

// const updateImage = (entityKey, info, editorState, setEditorState) => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
//         width: info.width,
//         height: info.height,
//         textAlign: info.textAlign,
//     });

//     const newEditorState = EditorState.push(
//         editorState,
//         contentStateWithEntity,
//         'apply-entity'
//     );

//     // Buộc editor render lại
//     const selectionState = newEditorState.getSelection();
//     const forcedEditorState = EditorState.forceSelection(newEditorState, selectionState);

//     // Cập nhật editorState mới
//     setEditorState(forcedEditorState);
// };




// const EditImage = ({ entityKey, editorState, setEditorState }) => {
//     const infoIMG = {
//         width: '400px',
//         height: '300px',
//         textAlign: 'center'
//       }
    
    
    
//     return <div>
//         <button onClick={() => updateImage(entityKey, infoIMG, editorState, setEditorState)}>Change Image</button>
//     </div>


// }


import React, { useState, useEffect} from 'react';

const updateImage = (entityKey, infoImage, editorState, setEditorState) => {
    const contentState = editorState.getCurrentContent();
    const { width, height, unit, textAlign } = infoImage;
    const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
    width: `${width}${unit}`, // Kết hợp width và unit
    height: `${height}${unit}`, // Kết hợp height và unit
    textAlign,
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
  


  const EditImage = ({ entityKey,infoImage, editorState, setEditorState }) => {
    const [imageInfo, setImageInfo] = useState({
      width: '400',
      height: '300',
      unit: 'px', // Đơn vị mặc định
      textAlign: 'center',
    });
  
    // useEffect(() => {
    //     setImageInfo({infoImage})
    // },[entityKey])

    // Hàm để cập nhật giá trị width, height, và textAlign
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setImageInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Hàm để cập nhật đơn vị (px, mm, em, rem)
    const handleUnitChange = (e) => {
      setImageInfo((prev) => ({
        ...prev,
        unit: e.target.value,
      }));
    };
  
    return (
      <div>
        <div>
          <label>
            Width:
            <input
              type="number"
              name="width"
              value={imageInfo.width}
              onChange={handleInputChange}
              placeholder="Enter width"
            />
          </label>

        </div>
  
        <div>
          <label>
            Height:
            <input
              type="number"
              name="height"
              value={imageInfo.height}
              onChange={handleInputChange}
              placeholder="Enter height"
            />
          </label>
          <label>
            Unit:
            <select value={imageInfo.unit} onChange={handleUnitChange}>
              <option value="px">px</option>
              <option value="mm">mm</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </select>
          </label>
        </div>
  
        <div>
          <label>
            Text Align:
            <select
              name="textAlign"
              value={imageInfo.textAlign}
              onChange={handleInputChange}
            >
              <option value="center">Center</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
  
        <button
          onClick={() =>
            updateImage(entityKey, imageInfo, editorState, setEditorState)
          }
        >
          Change Image
        </button>
      </div>
    );
  };
  

  




export default EditImage;