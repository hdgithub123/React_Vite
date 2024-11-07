import EditImageInline from "./EditImageInline";
import ImagePluginInlineForm from "./ImagePluginInlineForm";



// const ImagePluginInline = ({ infoImage, entityKey, editorState, setEditorState }) => {
const ImagePluginInline = ({ infoImage, entityKey ,editorState, setEditorState }) => {
    return <div>
        <ImagePluginInlineForm editorState={editorState} setEditorState={setEditorState} ></ImagePluginInlineForm>
        <EditImageInline infoImage= {infoImage} entityKey={entityKey} editorState= {editorState} setEditorState= {setEditorState} ></EditImageInline>
    </div>
}

export default ImagePluginInline;