import { GET_USERS } from './types';
import { toastr } from 'react-redux-toastr';

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

const addAdminRole = (email, token) => {
  return (dispatch) => {
    fetch('https://us-central1-test-72840.cloudfunctions.net/addAdminRole',
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        data: {
          email,
          token
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.error) {
          toastr.error('Error', 'message: There was an error.');
          return;
        }

        toastr.success('Success', `message: Success! ${data.result.email} has been made an admin.`);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const removeAdminRole = (email, token) => {
  return (dispatch) => {
    fetch('https://us-central1-test-72840.cloudfunctions.net/removeAdminRole',
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        data: {
          email,
          token
        } 
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.error) {
          toastr.error('Error', 'message: There was an error.');
          return;
        }

        toastr.success('Success', `message: Success! ${data.result.email} has been removed as an admin.`);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export {
  getAllUsers,
  addAdminRole,
  removeAdminRole
};
