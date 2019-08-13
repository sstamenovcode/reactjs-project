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

const truncate = (text) => {
  if (text.length > 150) {
      return text.slice(0, 150).concat('...');
  }

  return text;
};

export {
  isUserAuth,
  updateObject,
  parseFirestoreData,
  validateEmail,
  truncate
};
