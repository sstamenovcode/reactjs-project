import { REGISTER_USER } from './types';
import { LOGOUT_USER } from './types';

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
      .then(userData => {
        const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
        localStorage.setItem('token', userData.idToken);
        localStorage.setItem('expiresIn', expirationDate);
        dispatch({
          type: REGISTER_USER,
          payload: userData
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    dispatch({
      type: LOGOUT_USER
    });
  }
}

export {
  registerUser,
  logoutUser
};
