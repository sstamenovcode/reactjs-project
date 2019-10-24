import firebase from 'firebase';
import { toastr } from 'react-redux-toastr';
import { FETCH_POSTS, FETCH_POST, UPDATE_POST, DELETE_POST } from './types';
import db from '../firestoreInit';

export const fetchPosts = () => {
  return dispatch => {
    db.collection('articles')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ id, ...data });
        });
        dispatch({
          type: FETCH_POSTS,
          payload: docs
        });
      });
  };
};

export const createPost = (title, text) => {
  return dispatch => {
    const post = { title, text };
    db.collection('articles')
      .add({
        ...post,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        toastr.error('Error', error.message);
      });
  };
};

export const fetchPost = id => {
  return dispatch => {
    db.collection('articles')
      .doc(id)
      .get()
      .then(docRef => {
        dispatch({
          type: FETCH_POST,
          payload: docRef.data()
        });
      })
      .catch(error => {
        toastr.error('Error', error.message);
      });
  };
};

export const editPost = (id, title, text) => {
  return dispatch => {
    const post = { title, text };
    db.collection('articles')
      .doc(id)
      .set({
        ...post,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        dispatch({
          type: UPDATE_POST,
          payload: post
        });
      })
      .catch(error => {
        toastr.error('Error', error.message);
      });
  };
};

export const deletePost = (id, isPermanent) => {
  return dispatch => {
    if (isPermanent) {
      db.collection('articles')
        .doc(id)
        .delete()
        .then(() => {
          return id;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    dispatch({
      type: DELETE_POST,
      payload: {}
    });
  };
};
