import {Editor, EditorState} from 'draft-js';
import { useState } from 'react';

const RawDraftjs = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
console.log("EditorState",EditorState)
  return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default RawDraftjs