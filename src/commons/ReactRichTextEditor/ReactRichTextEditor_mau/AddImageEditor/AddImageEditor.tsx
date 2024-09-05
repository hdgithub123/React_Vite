import React, { useState, useRef } from 'react';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import editorStyles from './AddImageEditor.module.css';

// Tạo plugin hình ảnh
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const text =
  'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

const AddImageEditor = () => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(text));
  const editor = useRef(null);

  const focus = () => {
    editor.current.focus();
  };

  return (
    <div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={editor}
        />
      </div>
      <ImageAdd
        editorState={editorState}
        onChange={setEditorState}
        modifier={imagePlugin.addImage}
      />
    </div>
  );
};

export default AddImageEditor;


const ImageAdd = ({ editorState, onChange, modifier }) => {
    const [url, setUrl] = useState('');
  
    const onURLChange = (e) => setUrl(e.target.value);
  
    const onAddImage = (e) => {
      e.preventDefault();
      if (url) {
        const newEditorState = modifier(editorState, url);
        onChange(newEditorState);
        setUrl(''); // Clear the input field after adding the image
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
        <button onClick={onAddImage}>Add Image</button>
      </div>
    );
  };