const updateObject = (mainObject, newDataObject) => {
  return {
    ...mainObject,
    ...newDataObject
  }
};

const parseFirestoreData = (data) => {
  const parsedData = data.map(el => {
    return { ...el.fields };
  })
  return parsedData;
};

export { 
  updateObject,
  parseFirestoreData
};
