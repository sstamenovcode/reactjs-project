import { REGISTER_USER } from './types';

const registerUser = (email, password) => {
  return (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQQKqn590aXeoRuoOxd0tnpscnWbVhUJI',
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: REGISTER_USER,
          payload: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export {
  registerUser
};
