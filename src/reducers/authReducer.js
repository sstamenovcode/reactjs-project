import { GET_USERS, LOGOUT_USER } from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    email: null,
    users: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS: 
      return updateObject(state, { 
        users: action.payload
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
