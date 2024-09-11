import {CustomMentionEditor,SimpleEmojiEditor,AddImageEditor,
    CustomAddVideoVideoEditor,CustomStickerEditor,
    CustomHashtagEditor,CustomUndoEditor,
    CustomLinkPluginEditor,
    CustomInlineToolbarEditor,
    ThemedToolbarEditor,
    GeneralEditor,
    ThemedAlignmentEditor,
    TextAlignmentPlugin,
    ResizeableEditor,
    DndPlugin,
    DividerWithSideToolbarEditor,
    CustomCounterEditor,

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
            {/* <CustomInlineToolbarEditor></CustomInlineToolbarEditor> */}
            {/* <ThemedToolbarEditor></ThemedToolbarEditor> */}
            <GeneralEditor></GeneralEditor>
            {/* <ThemedAlignmentEditor></ThemedAlignmentEditor>
            <TextAlignmentPlugin></TextAlignmentPlugin>
            <ResizeableEditor></ResizeableEditor>
            <DndPlugin></DndPlugin>
            <DividerWithSideToolbarEditor></DividerWithSideToolbarEditor> */}
            {/* <CustomCounterEditor></CustomCounterEditor> */}
        </div>
    )

}
export default ReactRichTextEditorExample;