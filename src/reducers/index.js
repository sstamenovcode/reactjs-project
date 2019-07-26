import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  toastr: toastrReducer
})

export default rootReducer;
