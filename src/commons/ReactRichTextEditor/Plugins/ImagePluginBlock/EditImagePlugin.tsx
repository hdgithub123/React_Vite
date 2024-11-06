import EditImage from "./EditImage"
import ControlImagePlugin from "./ControlImagePlugin"


const EditImagePlugin = ({ infoImage, entityKey, editorState, setEditorState }) => {
    return <div>
        <ControlImagePlugin editorState= {editorState} setEditorState= {setEditorState} ></ControlImagePlugin>
        <EditImage infoImage= {infoImage} entityKey={entityKey} editorState= {editorState} setEditorState= {setEditorState} ></EditImage>
    </div>
}


export default EditImagePlugin;