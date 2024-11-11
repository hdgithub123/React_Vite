import EditImage from "./EditImage"
import ImagePluginBlockForm from "./ImagePluginBlockForm"


const ImagePluginBlock = ({ infoImage, editorState, setEditorState }) => {
    return <div>
        <ImagePluginBlockForm editorState= {editorState} setEditorState= {setEditorState} ></ImagePluginBlockForm>
        <EditImage infoImage= {infoImage} editorState= {editorState} setEditorState= {setEditorState} ></EditImage>
    </div>
}

export default ImagePluginBlock;