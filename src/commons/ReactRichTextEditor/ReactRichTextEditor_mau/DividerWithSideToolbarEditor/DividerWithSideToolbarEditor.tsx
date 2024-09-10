import React, { useState, useRef } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';

import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';

import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

import createDividerPlugin from '@draft-js-plugins/divider';
import editorStyles from './editorStyles.module.css';
import '@draft-js-plugins/side-toolbar/lib/plugin.css';

// Initialize plugins
const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(focusPlugin.decorator);

const dividerPlugin = createDividerPlugin({ decorator });
const { DividerButton } = dividerPlugin;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;




// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;

const plugins = [focusPlugin, dividerPlugin, toolbarPlugin];

/* eslint-disable */
const initialState = {
  entityMap: {
    0: {
      type: 'divider',
      mutability: 'IMMUTABLE',
      data: {},
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'This is a simple example for divider plugin. Click side toolbar divider button.',
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
  ],
};
/* eslint-enable */

const DividerWithSideToolbarEditor = () => {
  // Use useState to manage the editor state
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
    <div className={editorStyles.editor} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={editor}
      />

      <Toolbar>
        {
          // Use React.Fragment to avoid unnecessary div
          (externalProps) => (
            <>
              <DividerButton {...externalProps} />
            </>
          )
        }
      </Toolbar>
    </div>
  );
};

export default DividerWithSideToolbarEditor;
