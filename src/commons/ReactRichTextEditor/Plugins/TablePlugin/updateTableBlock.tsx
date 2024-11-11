import React, { useState, useEffect } from 'react';
import { EditorState } from "draft-js";

const updateTableBlock = (editorState, setEditorState, entityKey, infoTable ) => {
    const contentState = editorState.getCurrentContent();
    const { rows, cols, data } = infoTable;
    const contentStateWithEntity = contentState.mergeEntityData(entityKey, {
        rows,
        cols, 
        data,
    });

    const newEditorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'apply-entity'
    );

    // Buộc editor render lại
    const selectionState = newEditorState.getSelection();
    const forcedEditorState = EditorState.forceSelection(newEditorState, selectionState);

    // Cập nhật editorState mới
    setEditorState(forcedEditorState);
};



export default updateTableBlock;