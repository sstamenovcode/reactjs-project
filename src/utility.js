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

const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

export {
  isUserAuth,
  updateObject,
  parseFirestoreData,
  validateEmail
};
