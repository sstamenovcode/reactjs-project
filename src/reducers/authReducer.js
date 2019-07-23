import { REGISTER_USER } from '../actions/types';
import updateObject from '../utility';

const initialState = {
    idToken: null,
    expiresIn: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_USER: 
      return updateObject(state, { 
        idToken: action.payload.idToken, 
        expiresIn: action.payload.expiresIn 
      })
    default:
      return state;
  }
};

export default reducer;
