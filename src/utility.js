const isUserAuth = () => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}

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
  isUserAuth,
  updateObject,
  parseFirestoreData
};
