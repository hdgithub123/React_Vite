import {CustomMentionEditor,SimpleEmojiEditor,AddImageEditor,
    CustomAddVideoVideoEditor,CustomStickerEditor,
    CustomHashtagEditor,CustomUndoEditor,
    CustomLinkPluginEditor,
    CustomInlineToolbarEditor,
    ThemedToolbarEditor,

} from "../index";

function ReactRichTextEditorExample() {
    return (
        <div>
            <CustomMentionEditor></CustomMentionEditor>
            {/* <SimpleEmojiEditor></SimpleEmojiEditor>
            <AddImageEditor></AddImageEditor>
            <CustomAddVideoVideoEditor></CustomAddVideoVideoEditor>
            <CustomStickerEditor></CustomStickerEditor>
            <CustomHashtagEditor></CustomHashtagEditor>
            <CustomUndoEditor></CustomUndoEditor> */}
            {/* <CustomLinkPluginEditor></CustomLinkPluginEditor> */}
            <CustomInlineToolbarEditor></CustomInlineToolbarEditor>
            <ThemedToolbarEditor></ThemedToolbarEditor>
        </div>
    )

}
export default ReactRichTextEditorExample;