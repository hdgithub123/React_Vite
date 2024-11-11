import EditImage from "./updateTableBlock"
import TablePluginBlockForm from "./TablePluginBlockForm"
import updateTableBlock from "./updateTableBlock"

const TablePluginBlock = ({ infoTable, editorState, setEditorState }) => {

    
    return <div>
        <TablePluginBlockForm editorState= {editorState} setEditorState= {setEditorState} ></TablePluginBlockForm>
    </div>
}

export default TablePluginBlock;