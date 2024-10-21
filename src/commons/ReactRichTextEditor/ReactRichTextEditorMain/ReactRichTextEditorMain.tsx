import React, { forwardRef, useRef, useState } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor'

import draftToHtml from 'draftjs-to-html';  // Import thư viện
import { composeDecorators } from '@draft-js-plugins/editor';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
// import createImagePlugin from '@draft-js-plugins/image';



import editorStyles from './ReactRichTextEditorMain.module.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();


import createImagePlugin from '../Plugins/ImagePlugin/createImagePlugin';
import EditImagePlugin from '../Plugins/ImagePlugin/EditImagePlugin';

const decorator = composeDecorators(
  // alignmentPlugin.decorator,
  //resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);


const ReactRichTextEditorMain = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [currentEntityKey, setCurrentEntityKey] = useState(null);
    const [currentInfoBlock, setCurrentInfoBlock] = useState(null);

    const handleImageOnDoubleClick = (info) => {
      setCurrentEntityKey(info.EntityKey)
      setCurrentInfoBlock(info)
    }

    const imagePlugin = createImagePlugin({ decorator, onDoubleClick: handleImageOnDoubleClick });
    
    const plugins = [
      blockDndPlugin,
      focusPlugin,
      // alignmentPlugin,
      // resizeablePlugin,
      imagePlugin,
    ];
  
    const viewEditorContent = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      console.log("Raw Content: ", JSON.stringify(rawContent));
    };
  
  
    const convertToHtml = () => {
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState); // Chuyển đổi thành định dạng thô
      const htmlContent = draftToHtml(rawContent);   // Chuyển đổi thành HTML
      console.log("HTML Content: ", htmlContent);
    };
  
  
  
    return (
      <div>
        <EditImagePlugin infoImage={currentInfoBlock} imagePlugin= {imagePlugin} entityKey = {currentEntityKey} editorState= {editorState} setEditorState= {setEditorState}></EditImagePlugin>
        <div className={editorStyles.editor}>

          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
          />
        </div>
        
        <button onClick={viewEditorContent}>ViewRaw</button>
        <button onClick={convertToHtml}>ViewHTML</button>
      </div>
    );
  };
  
  export default ReactRichTextEditorMain;