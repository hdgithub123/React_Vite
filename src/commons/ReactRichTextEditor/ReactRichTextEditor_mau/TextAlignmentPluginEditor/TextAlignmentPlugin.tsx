import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from '@draft-js-plugins/buttons';
import editorStyles from './editorStyles.module.css';
import buttonStyles from './buttonStyles.module.css';
import alignmentStyles from './alignmentStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

// Initialize plugins
const textAlignmentPlugin = createTextAlignmentPlugin({
  theme: { alignmentStyles },
});

const staticToolbarPlugin = createStaticToolbarPlugin({
  theme: { buttonStyles, toolbarStyles },
});
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin];

const text =
  'Try selecting a part of this text and click on one of alignment buttons';

const TextAlignmentPlugin = () => {
  // useState to manage editorState
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(text)
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
    </div>
  );
};

export default TextAlignmentPlugin;