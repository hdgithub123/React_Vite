import React, { useState, useRef } from 'react';
import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createVideoPlugin from '@draft-js-plugins/video';
import editorStyles from './CustomAddVideoVideoEditor.module.css';

const videoPlugin = createVideoPlugin();
const plugins = [videoPlugin];

const CustomAddVideoVideoEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const focus = () => {
    editorRef.current.focus();
  };

  return (
    <div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={editorRef}
        />
      </div>
      <VideoAdd
        editorState={editorState}
        onChange={onChange}
        modifier={videoPlugin.addVideo}
      />
    </div>
  );
};

export default CustomAddVideoVideoEditor;


const VideoAdd = ({ editorState, onChange, modifier }) => {
    const [videoURL, setVideoURL] = useState('');
  
    const onURLChange = (e) => {
      setVideoURL(e.target.value);
    };
  
    const addVideo = (e) => {
      e.preventDefault();
      if (videoURL) {
        // Modifier function from the video plugin
        const newEditorState = modifier(editorState, { src: videoURL });
        onChange(newEditorState);
        setVideoURL(''); // Clear the input after adding the video
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={videoURL}
          onChange={onURLChange}
          placeholder="Enter video URL"
        />
        <button onClick={addVideo}>Add Video</button>
      </div>
    );
  };