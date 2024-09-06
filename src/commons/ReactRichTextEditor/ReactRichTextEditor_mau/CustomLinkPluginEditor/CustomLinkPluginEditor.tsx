import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkPlugin from '@draft-js-plugins/anchor';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';
import editorStyles from './editorStyles.module.css';

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];
const text =
  'Try selecting a part of this text and click on the link button in the toolbar that appears …';

const CustomLinkPluginEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editorRef = useRef(null);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className={editorStyles.editor} onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={editorRef}
      />
      <InlineToolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            {/* <linkPlugin.LinkButton {...externalProps} /> */}
          </>
        )}
      </InlineToolbar>
    </div>
  );
};

export default CustomLinkPluginEditor;
