import React, { useState, useEffect } from 'react';
import { EditorState } from "draft-js";

const updateImageBlock = (infoImage, editorState, setEditorState) => {
    console.log("infoImage",infoImage)
    const contentState = editorState.getCurrentContent();
    const { width, height, unit, textAlign } = infoImage;
    const contentStateWithEntity = contentState.mergeEntityData(infoImage.EntityKey, {
        width,
        height, 
        unit,
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



const EditImage = ({ infoImage, editorState, setEditorState }) => {
    const [imageInfo, setImageInfo] = useState({
        width: '400',
        height: '300',
        unit: 'px', // Default unit
        textAlign: 'center',
    });
    const [aspectRatio, setAspectRatio] = useState(1); // Aspect ratio for locking
    const [locked, setLocked] = useState(true); // Lock ratio state

    useEffect(() => {
        if (infoImage) {
            const infoImg = {
                ...infoImage,
                width: infoImage.width,
                height: infoImage.height,
                unit: infoImage.unit,
                textAlign: infoImage.textAlign,
            };
            setImageInfo(infoImg);
            setAspectRatio(infoImage.width / infoImage.height);
        }
    }, [infoImage]);

    // Function to update width, height, and textAlign
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setImageInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle width change, and adjust height if locked
    const handleWidthChange = (e) => {
        const newWidth = e.target.value;
        if (locked) {
            const newHeight = (newWidth / aspectRatio).toFixed(2);
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

    // Function to handle height change, and adjust width if locked
    const handleHeightChange = (e) => {
        const newHeight = e.target.value;
        if (locked) {
            const newWidth = (newHeight * aspectRatio).toFixed(2);
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

    // Function to handle unit change (px, mm, em, rem)
    const handleUnitChange = (e) => {
        setImageInfo((prev) => ({
            ...prev,
            unit: e.target.value,
        }));
    };

    // Toggle the lock for aspect ratio
    const toggleLock = () => {
        setLocked(!locked);
    };

    const onUpdateImageBlock = () => {
        if(imageInfo){
            updateImageBlock( imageInfo, editorState, setEditorState)
        }
        
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
                        onChange={handleWidthChange}
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
                        onChange={handleHeightChange}
                        placeholder="Enter height"
                    />
                </label>
            </div>

            <div>
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

            <div>
                <label>
                    Lock Aspect Ratio:
                    <input
                        type="checkbox"
                        checked={locked}
                        onChange={toggleLock}
                    />
                </label>
            </div>

            <button onClick={onUpdateImageBlock}> Change Image </button>
        </div>
    );
};

export default EditImage;