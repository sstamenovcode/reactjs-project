import { FETCH_POSTS } from './types'
import db from './../firestoreInit';

export const fetchPosts = () => {
  return (dispatch) => {
    db.collection('articles')
      .get()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            docs.push({ id, ...data });
        })
        dispatch({ 
          type: FETCH_POSTS,
          payload: docs
        })
      })
  }
}
