import React, { useState, useRef } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createFocusPlugin from '@draft-js-plugins/focus';
import createColorBlockPlugin from './colorBlockPlugin';
import editorStyles from './editorStyles.module.css';

// Initialize plugins
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator
);

const colorBlockPlugin = createColorBlockPlugin({ decorator });
const plugins = [focusPlugin, resizeablePlugin, colorBlockPlugin];

/* eslint-disable */
const initialState = {
  entityMap: {
    0: {
      type: 'colorBlock',
      mutability: 'IMMUTABLE',
      data: {},
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'This is a simple example. Hover the block and change the width by dragging the mouse.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'More text here …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */

const ResizeableEditor = () => {
  // Use useState to manage editor state
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(initialState))
  );

  // useRef to reference the editor
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
    </div>
  );
};

export default ResizeableEditor;