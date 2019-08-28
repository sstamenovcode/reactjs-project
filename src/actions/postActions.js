import { FETCH_POSTS, FETCH_POST, UPDATE_POST, DELETE_POST } from './types';
import db from '../firestoreInit';

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
      .catch(function(error) {
        console.log(error);
      });
  }
}

export const fetchPost = (id) => {
  return (dispatch) => {
    db.collection('articles')
      .doc(id)
      .get()
      .then(docRef => {
        dispatch({ 
          type: FETCH_POST,
          payload: docRef.data()
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

export const editPost = (id, title, text) => {
  return (dispatch) => {
    const post = { id, title, text };
    db.collection('articles')
    .doc(id)
    .set(post)
    .then(() => {
      dispatch({ 
        type: UPDATE_POST,
        payload: post
      })
    });
  }
}

export const deletePost = (id, isPermanent) => {
  return (dispatch) => {
    if (isPermanent) {
      db.collection('articles')
        .doc(id)
        .delete()
        .then(() => {
            return id;
        });
    }
    dispatch({ 
      type: DELETE_POST,
      payload: {}
    })
  }
}
