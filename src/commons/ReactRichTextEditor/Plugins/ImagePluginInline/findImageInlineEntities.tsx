const findImageInlineEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE_INLINE';
    },
    callback
  );
};

export default findImageInlineEntities;