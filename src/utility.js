const updateObject = (mainObject, newDataObject) => {
  return {
    ...mainObject,
    ...newDataObject
  };
};

export default updateObject;
