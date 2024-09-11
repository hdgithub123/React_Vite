import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createCounterPlugin from '@draft-js-plugins/counter';
import editorStyles from './editorStyles.module.css';
import counterStyles from './counterStyles.module.css';

const theme = {
  counter: counterStyles.counter,
  counterOverLimit: counterStyles.counterOverLimit,
};
const counterPlugin = createCounterPlugin({ theme });
const { CharCounter, WordCounter, LineCounter, CustomCounter } = counterPlugin;
const plugins = [counterPlugin];
const text = `This editor has counters below!
Try typing here and watch the numbers go up. 🙌

Note that the color changes when you pass one of the following limits:
- 200 characters
- 30 words
- 10 lines
`;

const CustomCounterEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editor = useRef(null);

  const focus = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const customCountFunction = (str) => {
    const wordArray = str.match(/\S+/g); // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
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
      <div>
        <CharCounter limit={200} /> characters
      </div>
      <div>
        <WordCounter limit={30} /> words
      </div>
      <div>
        <LineCounter limit={10} /> lines
      </div>
      <div>
        <CustomCounter limit={40} countFunction={customCountFunction} />
        <span> words (custom function)</span>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CustomCounterEditor;
