import { REGISTER_USER, LOGIN_USER, GET_USER, GET_USERS, LOGOUT_USER } from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    email: null,
    users: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_USER: 
      return updateObject(state, { 
        email: action.payload.email
      })
    case LOGIN_USER: 
      return updateObject(state, {
        email: action.payload.email
      })
    case GET_USER: 
      return updateObject(state, { 
        email: action.payload.email
      })
    case GET_USERS: 
      return updateObject(state, { 
        users: action.payload.users
      })
    case LOGOUT_USER: 
      return updateObject(state, {
        email: null
      })
    default:
      return state;
  }
};

export default reducer;
