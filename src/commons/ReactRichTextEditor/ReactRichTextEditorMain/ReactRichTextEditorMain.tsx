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
import ImagePluginBlock from '../Plugins/ImagePluginBlock/ImagePluginBlock';


import buttonStyles from './buttonStyles.module.css';
import alignmentStyles from './alignmentStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

import createImagePluginInline from '../Plugins/ImagePluginInline/createImagePluginInline';
import ImagePluginInline from '../Plugins/ImagePluginInline/ImagePluginInline';

import createTableBlockPlugin from '../Plugins/TablePlugin/createTableBlockPlugin'

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


import TablePluginBlock from '../Plugins/TablePlugin/TablePluginBlock';


const ReactRichTextEditorMain = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [currentImageBlock, setCurrentImageBlock] = useState(null);
    const [currentImageInline, setCurrentImageInline] = useState(null);
    const [currentTableBlock, setCurrentTableBlock] = useState(null);

    const handleImageOnDoubleClick = (info) => {
      setCurrentImageBlock(info)
    }
    const imagePlugin = createImagePlugin({ decorator, onDoubleClick: handleImageOnDoubleClick });

    const handleEntityDoubleClick = (info) => {
      setCurrentImageInline(info)
    };
    const imagePluginInline = createImagePluginInline({
      onDoubleClickEntity: handleEntityDoubleClick,
    });



    const handleTableInput = (info) => {
      console.log('info:', info);
      setCurrentTableBlock(info)
    };
    const tablePluginBlock = createTableBlockPlugin({
      onInput: handleTableInput,
    });

    const plugins = [
      blockDndPlugin,
      focusPlugin,
      // alignmentPlugin,
      // resizeablePlugin,
      imagePlugin,
      staticToolbarPlugin,
      textAlignmentPlugin,
      imagePluginInline,
      tablePluginBlock,
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
        <ImagePluginBlock infoImage={currentImageBlock} editorState= {editorState} setEditorState= {setEditorState}></ImagePluginBlock>
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

      
     <ImagePluginInline infoImage={currentImageInline} editorState={editorState} setEditorState={setEditorState} ></ImagePluginInline>
   

      <TablePluginBlock infoTable={currentTableBlock} editorState= {editorState} setEditorState= {setEditorState}></TablePluginBlock>

      <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
        <button onClick={viewEditorContent}>ViewRaw</button>
        <button onClick={convertToHtml}>ViewHTML</button>
      </div>
    );
  };
  
  export default ReactRichTextEditorMain;