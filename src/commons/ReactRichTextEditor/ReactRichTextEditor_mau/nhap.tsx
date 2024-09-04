import React, { useState } from 'react';
import Editor from '@draft-js-plugins/editor';
import { EditorState, RichUtils } from 'draft-js';

// Import các plugin
import createEmojiPlugin from '@draft-js-plugins/emoji';
import createMentionPlugin from '@draft-js-plugins/mention';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import createImagePlugin from '@draft-js-plugins/image';
import createDragNDropPlugin from '@draft-js-plugins/drag-n-drop';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment'; // Import Text Alignment Plugin

// Import các stylesheet của plugin
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/mention/lib/plugin.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/hashtag/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css'; // Import CSS cho Text Alignment Plugin

// Khởi tạo các plugin
const emojiPlugin = createEmojiPlugin();
const mentionPlugin = createMentionPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin();
const hashtagPlugin = createHashtagPlugin();
const imagePlugin = createImagePlugin();
const dragNDropPlugin = createDragNDropPlugin();
const textAlignmentPlugin = createTextAlignmentPlugin(); // Khởi tạo Text Alignment Plugin

const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { MentionSuggestions } = mentionPlugin;
const { InlineToolbar } = inlineToolbarPlugin;

const ReactRichTextEditor_mau = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mentions, setMentions] = useState([
    { name: 'John Doe' },
    { name: 'Jane Smith' },
  ]);

  const handleEditorChange = (newState) => {
    setEditorState(newState);
  };

  const onSearchChange = ({ value }) => {
    const mentionSuggestions = mentions.filter((mention) =>
      mention.name.toLowerCase().includes(value.toLowerCase())
    );
    setMentions(mentionSuggestions);
  };

  // Function to apply text alignment
  const applyAlignment = (alignment) => {
    setEditorState(RichUtils.toggleBlockType(editorState, alignment));
  };


  const [open, setOpen] = useState(false);  // Trạng thái mở/đóng dropdown

  const onOpenChange = (isOpen) => {
    setOpen(isOpen);
  };

  // Plugin array
  const plugins = [
    emojiPlugin,
    mentionPlugin,
    inlineToolbarPlugin,
    linkifyPlugin,
    hashtagPlugin,
    imagePlugin,
    dragNDropPlugin,
    textAlignmentPlugin, // Thêm Text Alignment Plugin vào danh sách plugin
  ];

  return (
    <div>
      <h2>Editor tích hợp tất cả plugin</h2>
      <div style={{ border: '1px solid #ddd', padding: '15px', minHeight: '200px' }}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          plugins={plugins}  // Sử dụng plugin
        />
        {/* Emoji */}
        <EmojiSuggestions />
        {/* Mention */}
        <MentionSuggestions
          onSearchChange={onSearchChange}
          suggestions={mentions}
          onOpenChange={onOpenChange}
        />
        {/* Inline Toolbar */}
        <InlineToolbar />
        <div>
          <button onClick={() => applyAlignment('left')}>Căn Trái</button>
          <button onClick={() => applyAlignment('center')}>Căn Giữa</button>
          <button onClick={() => applyAlignment('right')}>Căn Phải</button>
          <button onClick={() => applyAlignment('justify')}>Căn Đều</button>
        </div>
      </div>

      {/* Emoji Selector */}
      <EmojiSelect />
    </div>
  );
};

export default ReactRichTextEditor_mau;
