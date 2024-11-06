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


import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';



import createBlockStyleFn from './createBlockStyleFn/createBlockStyleFn';
import editorStyles from './ReactRichTextEditorMain.module.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();


import createImagePlugin from '../Plugins/ImagePluginBlock/createImagePlugin';
import EditImagePluginBlock from '../Plugins/ImagePluginBlock/EditImagePluginBlock';


import buttonStyles from './buttonStyles.module.css';
import alignmentStyles from './alignmentStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

import createImagePluginInline from '../Plugins/ImagePluginInline/createImagePluginInline';
import ImagePluginInlineForm  from '../Plugins/ImagePluginInline/ImagePluginInlineForm';


// Initialize plugins
const textAlignmentPlugin = createTextAlignmentPlugin({
  theme: { alignmentStyles },
});

const staticToolbarPlugin = createStaticToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = staticToolbarPlugin;



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
    const imagePluginInline = createImagePluginInline();

    const plugins = [
      blockDndPlugin,
      focusPlugin,
      // alignmentPlugin,
      // resizeablePlugin,
      imagePlugin,
      staticToolbarPlugin,
      textAlignmentPlugin,
      imagePluginInline,
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
  
  
    const addImageToEditorInline = (imageData) => {
      const neweditor = imagePluginInline.addImage(editorState, imageData)
      setEditorState(neweditor);
    };


    const url1 = 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg';

  
    return (
      <div>
        <EditImagePluginBlock infoImage={currentInfoBlock} entityKey = {currentEntityKey} editorState= {editorState} setEditorState= {setEditorState}></EditImagePluginBlock>
        
        <div className={editorStyles.editor}>

          <Editor
            editorState={editorState}
            onChange={setEditorState}
            plugins={plugins}
            // blockStyleFn={blockStyleFn}
            blockStyleFn={createBlockStyleFn(editorState)}
          />
        </div>
        <Toolbar>
        {
          // React.Fragment is used to improve performance and avoid extra divs
          (externalProps) => (
            <>
              <ItalicButton {...externalProps} />
              <BoldButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <textAlignmentPlugin.TextAlignment {...externalProps} />
            </>
          )
        }
      </Toolbar>


      <button onClick={() => addImageToEditorInline({ url: url1, width: '100px', height: '100px' })}>
        Add Inline Image 1
      </button>
      
     <ImagePluginInlineForm editorState={editorState} setEditorState={setEditorState} ></ImagePluginInlineForm>
   

      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
        <button onClick={viewEditorContent}>ViewRaw</button>
        <button onClick={convertToHtml}>ViewHTML</button>
      </div>
    );
  };
  
  export default ReactRichTextEditorMain;