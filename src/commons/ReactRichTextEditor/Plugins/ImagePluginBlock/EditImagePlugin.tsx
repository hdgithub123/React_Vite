import EditImage from "./EditImage"
import ControlImagePlugin from "./ControlImagePlugin"


const EditImagePlugin = ({ imagePlugin, infoImage, entityKey, editorState, setEditorState }) => {
    return <div>
        <ControlImagePlugin editorState= {editorState} setEditorState= {setEditorState} imagePlugin = {imagePlugin} ></ControlImagePlugin>
        <EditImage infoImage= {infoImage} entityKey={entityKey} editorState= {editorState} setEditorState= {setEditorState} ></EditImage>
    </div>
}


export default EditImagePlugin;