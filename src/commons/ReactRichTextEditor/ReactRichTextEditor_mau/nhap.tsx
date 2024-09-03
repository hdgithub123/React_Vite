
import { Editor, EditorState } from 'draft-js';
// import './init'
//import 'draft-js/dist/Draft.css'; // Để thêm các style mặc định của Draft.js

import { RichUtils } from 'draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js';

const ReactRichTextEditor_mau = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onHeaderClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };
  
  const onULClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
  };


  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };



  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log('Saved Content:', JSON.stringify(raw));
  };


  const loadContent = (rawContent) => {
    const contentState = convertFromRaw(JSON.parse(rawContent));
    setEditorState(EditorState.createWithContent(contentState));
  };


  return (
    <div>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={onHeaderClick}>H1</button>
      <button onClick={onULClick}>UL</button>
      <button onClick={saveContent}>saveContent</button>
      <button onClick={loadContent}>loadContent</button>
      <div style={{ border: '1px solid black', minHeight: '200px', padding: '10px' }}>
        <Editor 
          editorState={editorState} 
          onChange={setEditorState} 
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default ReactRichTextEditor_mau;



  
