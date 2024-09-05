import React, { useState, useRef, useEffect } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
// Import các plugin cần thiết
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createImagePlugin from '@draft-js-plugins/image';
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

import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css';
import editorStyles from './ReactRichTextEditor.module.css';

// Components HeadlinesPicker và HeadlinesButton như trên
const HeadlinesPicker = ({ onOverrideContent }) => {
  useEffect(() => {
    const onWindowClick = () => onOverrideContent(undefined);
    window.addEventListener('click', onWindowClick);

    return () => {
      window.removeEventListener('click', onWindowClick);
    };
  }, [onOverrideContent]);

  const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];

  return (
    <div>
      {buttons.map((Button, i) => (
        <Button key={i} {...this.props} />
      ))}
    </div>
  );
};

const HeadlinesButton = ({ onOverrideContent }) => {
  const onClick = () => onOverrideContent(HeadlinesPicker);

  return (
    <div className={editorStyles.headlineButtonWrapper}>
      <button onClick={onClick} className={editorStyles.headlineButton}>
        H
      </button>
    </div>
  );
};

// Khởi tạo plugin
const toolbarPlugin = createToolbarPlugin();
const emojiPlugin = createEmojiPlugin();
const hashtagPlugin = createHashtagPlugin();
const textAlignmentPlugin = createTextAlignmentPlugin();
const imagePlugin = createImagePlugin();

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { Toolbar } = toolbarPlugin;
// const { AlignmentTool } = textAlignmentPlugin;








// Sử dụng các plugin
const plugins = [toolbarPlugin, emojiPlugin, hashtagPlugin, textAlignmentPlugin,imagePlugin];

const text = 'In this editor a toolbar shows up once you select part of the text …';

const ReactRichTextEditor_mau = () => {
  const [editorState, setEditorState] = useState(() => createEditorStateWithText(text));
  const editor = useRef(null);


  const [editorImgState, setEditorImgState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const focus = () => {
    editor.current.focus();
  };

  useEffect(() => {
    setEditorState(createEditorStateWithText(text));
  }, []);

  const insertImage = (editorImgState, url) => {
    const contentState = editorImgState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorImgState, {
      currentContent: contentStateWithEntity,
    });
    return EditorState.forceSelection(
      newEditorState,
      newEditorState.getCurrentContent().getSelectionAfter()
    );
  };


  const addImage = () => {
    const url = window.prompt('Nhập URL hình ảnh');
    if (url) {
      const newState = insertImage(editorImgState, url);
      setEditorImgState(newState);
    }
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
        {/* Toolbar */}
        <Toolbar>
          {(externalProps) => (
            <div className={editorStyles.toolbar}>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <CodeButton {...externalProps} />
              {/* <Separator {...externalProps} /> */}
              {/* <HeadlinesButton {...externalProps} /> */}
              <UnorderedListButton {...externalProps} />
              <OrderedListButton {...externalProps} />
              <BlockquoteButton {...externalProps} />
              <CodeBlockButton {...externalProps} />
              <textAlignmentPlugin.TextAlignment {...externalProps} />
              <button onClick={addImage}>Thêm Hình Ảnh</button>
            </div>
          )}
        </Toolbar>
        {/* Emoji Suggestions and Picker */}
        <EmojiSuggestions />
      </div>
      {/* Emoji Selector */}
      <EmojiSelect />

    </div>
  );
};

export default ReactRichTextEditor_mau;
