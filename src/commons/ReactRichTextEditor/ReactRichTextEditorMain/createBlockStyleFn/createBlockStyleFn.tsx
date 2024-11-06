import editorStyles from './createBlockStyleFn.module.css';

const createBlockStyleFn = (editorState) => (contentBlock) => {
    const type = contentBlock.getType();
  
    // Check if block type is 'atomic'
    if (type === 'atomic') {
      // Get entity key of the first character in the block
      const entityKey = contentBlock.getEntityAt(0);
  
      // If an entity exists and is of type 'IMAGE', return the specific style class
      if (entityKey) {
        const contentState = editorState.getCurrentContent();
        const entity = contentState.getEntity(entityKey);
  
        if (entity && entity.getType() === 'IMAGE_BLOCK') {
          return editorStyles.atomic_block_image ; // Apply specific style for IMAGE type
        }
      }
  
      // If block is atomic but not an IMAGE, apply generic atomic style
      return editorStyles.atomic_block;
    }
  
    return null;
  };

  export default createBlockStyleFn;