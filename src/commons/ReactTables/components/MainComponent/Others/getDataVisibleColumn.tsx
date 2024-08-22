export function getDataVisibleColumn(originalData, objectDataRemove) {
    return originalData.map(item => {
      let newItem = { ...item };
      for (let key in objectDataRemove) {
        if (objectDataRemove[key] === false) {
          delete newItem[key];
        }
      }
      return newItem;
    });
  }