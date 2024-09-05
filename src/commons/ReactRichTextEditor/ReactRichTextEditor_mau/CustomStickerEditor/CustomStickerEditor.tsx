import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import { fromJS } from 'immutable';
import createStickerPlugin from '@draft-js-plugins/sticker';
import editorStyles from './CustomStickerEditor.module.css';

import '@draft-js-plugins/sticker/lib/plugin.css';

const stickers = fromJS({
    data: {
      'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b': {
        id: 'b3aa388f-b9f4-45b0-bba5-d92cf2caa48b',
        url: '../images/unicorn-4.png',
      },
      'adec3f13-823c-47c3-b4d1-be4f68dd9d6d': {
        id: 'adec3f13-823c-47c3-b4d1-be4f68dd9d6d',
        url: '../images/unicorn-1.png',
      },
      'e14b5a20-1025-4952-b731-41cd4b118ba0': {
        id: 'e14b5a20-1025-4952-b731-41cd4b118ba0',
        url: '../images/unicorn-6.png',
      },
      '659a0dbf-5f85-4f32-999d-eb9ba6b0f417': {
        id: '659a0dbf-5f85-4f32-999d-eb9ba6b0f417',
        url: '../images/unicorn-2.png',
      },
      'fab0ae95-ae95-4775-b484-72c290437602': {
        id: 'fab0ae95-ae95-4775-b484-72c290437602',
        url: '../images/unicorn-5.png',
      },
      '71853190-8acd-4d3b-b4fd-63f7b0648daa': {
        id: '71853190-8acd-4d3b-b4fd-63f7b0648daa',
        url: '../images/unicorn-3.png',
      },
    },
  });

const stickerPlugin = createStickerPlugin({ stickers });
const plugins = [stickerPlugin];
const StickerSelect = stickerPlugin.StickerSelect;

const CustomStickerEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const editorRef = React.useRef(null); // Create a ref for the editor

  return (
    <div>
      <div className={editorStyles.editor} onClick={focusEditor}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editorRef} // Attach the ref to the Editor
        />
      </div>
      <div className={editorStyles.options}>
        <StickerSelect editor={editorRef.current} />
      </div>
    </div>
  );
};

export default CustomStickerEditor;






