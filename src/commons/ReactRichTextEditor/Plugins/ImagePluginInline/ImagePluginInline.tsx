import EditImageInline from "./EditImageInline";
import ImagePluginInlineForm from "./ImagePluginInlineForm";
import { DropableSelectClick, DropableSelectHover } from "../../ultils/DropSelect/DropableSelect";
import { useEffect, useState } from "react";


// const ImagePluginInline = ({ infoImage, entityKey, editorState, setEditorState }) => {
const ImagePluginInline = ({ infoImage, editorState, setEditorState }) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [openImgInline, setOpenImgInline] = useState(false);

    useEffect(() => {
        if (isFirstRender) {
             setIsFirstRender(false)
        }
        else {
            setOpenImgInline(true)
        }

    }, [infoImage]);

    return <div>
        <div style={{ background: 'white', border: '1px black solid', width: '100px' }}>
            <DropableSelectClick droptitle={<div>anh</div>} position="botton">
                <div style={{ background: 'white', border: '1px black solid', padding: '1px' }}>
                    <ImagePluginInlineForm editorState={editorState} setEditorState={setEditorState} ></ImagePluginInlineForm>
                </div>
            </DropableSelectClick>
            {openImgInline ? <div>
                <button onClick={() => { 
                    setOpenImgInline(false)
                 }}> close</button>
                <EditImageInline infoImage={infoImage} editorState={editorState} setEditorState={setEditorState} ></EditImageInline>
            </div> : null}
        </div>


    </div>
}

export default ImagePluginInline;