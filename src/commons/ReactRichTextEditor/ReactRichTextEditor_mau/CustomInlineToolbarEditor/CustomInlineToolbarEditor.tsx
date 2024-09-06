/* eslint-disable react/no-multi-comp */
import React, { useState, useRef, useEffect } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createInlineToolbarPlugin, { Separator } from '@draft-js-plugins/inline-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import editorStyles from './editorStyles.module.css';

const HeadlinesPicker = ({ onOverrideContent, ...props }) => {
  useEffect(() => {
    const onWindowClick = () => {
      onOverrideContent(undefined);
    };
    window.addEventListener('click', onWindowClick);
    return () => {
      window.removeEventListener('click', onWindowClick);
    };
  }, [onOverrideContent]);

  const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
  return (
    <div>
      {buttons.map((Button, i) => (
        <Button key={i} {...props} />
      ))}
    </div>
  );
};

const HeadlinesButton = ({ onOverrideContent }) => {
  const onMouseDown = (event) => event.preventDefault();

  const onClick = () => {
    onOverrideContent(HeadlinesPicker);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={editorStyles.headlineButtonWrapper}
    >
      <button onClick={onClick} className={editorStyles.headlineButton}>
        H
      </button>
    </div>
  );
};

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text =
  'In this editor a toolbar shows up once you select part of the text …';

const CustomInlineToolbarEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editorRef = useRef(null);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <div className={editorStyles.editor} onClick={focusEditor}>
      <Editor
        editorKey="CustomInlineToolbarEditor"
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
            <CodeButton {...externalProps} />
            <Separator {...externalProps} />
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </>
        )}
      </InlineToolbar>
    </div>
  );
};

export default CustomInlineToolbarEditor;
