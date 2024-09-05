import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import '@draft-js-plugins/emoji/lib/plugin.css';
import editorStyles from './SimpleEmojiEditor.module.css';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
const text = `Cool, we can have all sorts of Emojis here. 🙌
🌿☃️🎉🙈 aaaand maybe a few more here 🐲☀️🗻 Quite fun!`;

const SimpleEmojiEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editor = useRef(null);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const focus = () => {
    editor.current.focus();
  };

  return (
    <div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editor}
        />
      </div>
      <div className={editorStyles.options}>
        <EmojiSuggestions />
        <EmojiSelect />
      </div>
    </div>
  );
};

export default SimpleEmojiEditor;
