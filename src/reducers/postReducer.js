import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    post: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return updateObject(state, { posts: action.payload });
        case FETCH_POST:
            return updateObject(state, { post: action.payload });
        case DELETE_POST:
            return updateObject(state, { post: action.payload });
        default:
            return state;
    }
};

export default reducer;
