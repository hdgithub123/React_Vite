import React, { useState, useRef } from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createDividerPlugin from '@draft-js-plugins/divider';
import editorStyles from './editorStyles.module.css';
import '@draft-js-plugins/side-toolbar/lib/plugin.css';

// Initialize plugins
const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(focusPlugin.decorator);

const dividerPlugin = createDividerPlugin({ decorator });
const { DividerButton } = dividerPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [focusPlugin, dividerPlugin, sideToolbarPlugin];

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

      <SideToolbar>
        {
          // Use React.Fragment to avoid unnecessary div
          (externalProps) => (
            <>
              <DividerButton {...externalProps} />
            </>
          )
        }
      </SideToolbar>
    </div>
  );
};

export default DividerWithSideToolbarEditor;
