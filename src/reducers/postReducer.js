import { FETCH_POSTS, ADD_POST, FETCH_POST, UPDATE_POST, DELETE_POST } from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    post: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return updateObject(state, { posts: action.payload });
        case ADD_POST:
            return updateObject(state, { posts: [action.payload, ...state.posts] });
        case FETCH_POST:
            return updateObject(state, { post: action.payload });
        case UPDATE_POST:
            return updateObject(state, { post: action.payload });
        case DELETE_POST:
            return updateObject(state, { post: action.payload });
        default:
            return state;
    }
};

export default reducer;
