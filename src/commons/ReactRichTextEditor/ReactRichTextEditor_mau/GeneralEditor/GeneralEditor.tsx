import React, { useState, useRef, useEffect } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';




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






const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text =
  'In this editor a toolbar with a lot more options shows up once you select part of the text …';

const GeneralEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editorRef = useRef(null);

  const focus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    // Fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    setEditorState(createEditorStateWithText(text));
  }, []);

  return (
    <div>
        <Toolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            {/* <Separator {...externalProps} /> */}
            <HeadlinesButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </>
        )}
        </Toolbar>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editorRef}
        />
        
      </div>
    </div>
  );
};

export default GeneralEditor;



  const HeadlinesButton = ({ ...externalProps }) => {
    console.log("externalProps",externalProps)
        return <>
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <HeadlineThreeButton {...externalProps} />
            <HeadlineFourButton {...externalProps} />
            <HeadlineFiveButton {...externalProps} />
            <HeadlineSixButton {...externalProps} />
        </>

  }

  import { RichUtils } from 'draft-js';
  const HeadlineFourButton = ({ getEditorState, setEditorState }) => {
    const applyHeadlineFour = () => {
      const editorState = getEditorState();
    //   setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-four'));
    };
  
    return (
      <button onClick={applyHeadlineFour}>
        H4
      </button>
    );
  };


  const HeadlineFiveButton = ({ getEditorState, setEditorState }) => {
    const applyHeadlineFour = () => {
      const editorState = getEditorState();
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-five'));
    };
  
    return (
      <button onClick={applyHeadlineFour}>
        H5
      </button>
    );
  };


  const HeadlineSixButton = ({ getEditorState, setEditorState }) => {
    const applyHeadlineFour = () => {
      const editorState = getEditorState();
      console.log("editorState",editorState)
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-six'));
    };
  
    return (
      <button onClick={applyHeadlineFour}>
        H6
      </button>
    );
  };