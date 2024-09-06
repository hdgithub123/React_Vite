import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import editorStyles from './CustomHashtagEditor.module.css';

const hashtagPlugin = createHashtagPlugin({ theme: editorStyles });
const plugins = [hashtagPlugin];
const text = 'In this editor, we can even apply our own styles … #design #theme';

const CustomHashtagEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editorRef = useRef(null);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className={editorStyles.editor} onClick={focusEditor}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={editorRef}
      />
    </div>
  );
};

export default CustomHashtagEditor;
