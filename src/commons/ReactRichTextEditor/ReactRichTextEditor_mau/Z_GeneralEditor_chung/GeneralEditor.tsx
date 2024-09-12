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


  // Text Aligment

  import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
  import alignmentStyles from './alignmentStyles.module.css';

  // Initialize plugins
  const textAlignmentPlugin = createTextAlignmentPlugin({
    theme: { alignmentStyles },
  });

   // Text Aligment End


  //  Add ImageEditor
  // Tạo plugin hình ảnh
  import createImagePlugin from '@draft-js-plugins/image';
const imagePlugin = createImagePlugin();
  
const toolbarPlugin = createToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, textAlignmentPlugin, imagePlugin];
const text =
  'In this editor a toolbar with a lot more options shows up once you select part of the text …';

const GeneralEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editorRef = useRef(null);

  console.log("editorState.getCurrentContent",editorState.getCurrentContent())

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
            <textAlignmentPlugin.TextAlignment {...externalProps} />
            <ImageAdd
        editorState={editorState}
        onChange={setEditorState}
        modifier={imagePlugin.addImage}
      />
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



  // const ImageAdd = ({ editorState, onChange, modifier }) => {
  //   const [url, setUrl] = useState('');
  
  //   const onURLChange = (e) => setUrl(e.target.value);
  
  //   const onAddImage = (e) => {
  //     e.preventDefault();
  //     if (url) {
  //       const newEditorState = modifier(editorState, url);
  //       onChange(newEditorState);
  //       setUrl(''); // Clear the input field after adding the image
  //     }
  //   };
  
  //   return (
  //     <div>
  //       <input
  //         type="text"
  //         placeholder="Enter image URL"
  //         value={url}
  //         onChange={onURLChange}
  //       />
  //       <button onClick={onAddImage}>Add Image</button>
  //     </div>
  //   );
  // };

  const ImageAdd = ({ editorState, onChange, modifier }) => {
    const [url, setUrl] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
  
    const onURLChange = (e) => setUrl(e.target.value);
    const onWidthChange = (e) => setWidth(e.target.value);
    const onHeightChange = (e) => setHeight(e.target.value);
  
    const onAddImage = (e) => {
      e.preventDefault();
      if (url) {
        console.log("url",url)
        // Create an object for the image data
        const imageData = {
          src: url,
          // width: width ? `${width}px` : '100px',
          // height: height ? `${height}px` : '100px',
          width: '100px',
          height: '100px',
        };
  
        // Pass the image data to the modifier function
        const newEditorState = modifier(editorState, imageData);
        onChange(newEditorState);
        
        // Clear the input fields after adding the image
        setUrl('');
        setWidth('');
        setHeight('');
      }
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter image URL"
          value={url}
          onChange={onURLChange}
        />
        <input
          type="text"
          placeholder="Width (px)"
          value={width}
          onChange={onWidthChange}
        />
        <input
          type="text"
          placeholder="Height (px)"
          value={height}
          onChange={onHeightChange}
        />
        <button onClick={onAddImage}>Add Image</button>
      </div>
    );
  };




// Ghi chú: 
//     Đã thêm textAlignmentPlugin
//     Đã thêm ImageAdd
