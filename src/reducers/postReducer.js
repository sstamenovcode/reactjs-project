import { FETCH_POSTS } from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    posts: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS: 
            return updateObject(state, { posts: action.payload });
        default:
            return state;
    }
};

export default reducer;
