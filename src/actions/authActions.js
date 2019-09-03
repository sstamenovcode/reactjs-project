import { REGISTER_USER } from './types';
import { LOGIN_USER, GET_USER, GET_USERS, LOGOUT_USER } from './types';
import { toastr } from 'react-redux-toastr';

const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    dispatch({
      type: LOGOUT_USER
    });
  }
};

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
      }
    )
      .then(res => res.json())
      .then(userData => {
        if (userData.error) {
          userData.error.message === 'EMAIL_EXISTS' ? 
            toastr.error('Email exists', 'Please try again with different email') : 
            toastr.error('Error', 'Please try again with different input')
          return;
        }

        const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
        localStorage.setItem('token', userData.idToken);
        localStorage.setItem('expiresIn', expirationDate);
        checkAuthTimeout(parseInt(userData.expiresIn, 10));
        dispatch({
          type: REGISTER_USER,
          payload: userData
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};

const loginUser = (email, password) => {
  return (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQQKqn590aXeoRuoOxd0tnpscnWbVhUJI',
      { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      }
    )
      .then(res => res.json())
      .then(userData => {
        if (userData.error) {
          toastr.error('Error', 'Please try again with different input');
          return;
        }

        const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
        localStorage.setItem('token', userData.idToken);
        localStorage.setItem('expiresIn', expirationDate);
        checkAuthTimeout(parseInt(userData.expiresIn, 10), dispatch);
        dispatch({
          type: LOGIN_USER,
          payload: userData
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};

const getUserData = () => {
  return (dispatch) => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAQQKqn590aXeoRuoOxd0tnpscnWbVhUJI',
        { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idToken: userToken
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            logoutUser()(dispatch);
            return false;
          }

          dispatch({
            type: GET_USER,
            payload: data.users[0]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};

const getAllUsers = () => {
  return (dispatch) => {
    fetch('https://us-central1-test-72840.cloudfunctions.net/getAllUsers',
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {}
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_USERS,
          payload: data.result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const checkAuthTimeout = (expirationTime, dispatch) => {
  setTimeout(() => {
    logoutUser()(dispatch);
  }, expirationTime * 999);
}

export {
  registerUser,
  loginUser,
  getUserData,
  getAllUsers,
  logoutUser,
  checkAuthTimeout
};
