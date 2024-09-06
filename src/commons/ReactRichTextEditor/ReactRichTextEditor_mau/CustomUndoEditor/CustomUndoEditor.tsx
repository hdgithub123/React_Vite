import React, { useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createUndoPlugin from '@draft-js-plugins/undo';
import editorStyles from './CustomUndoEditor.module.css';

const theme = {
  undo: editorStyles.button,
  redo: editorStyles.button,
};
const undoPlugin = createUndoPlugin({
  undoContent: 'Undo',
  redoContent: 'Redo',
  theme,
});
const { UndoButton, RedoButton } = undoPlugin;
const plugins = [undoPlugin];

const CustomUndoEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
    <div>
      <div className={editorStyles.editor} onClick={focusEditor}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editorRef}
        />
      </div>
      <div className={editorStyles.options}>
        <UndoButton />
        <RedoButton />
      </div>
    </div>
  );
};

export default CustomUndoEditor;
