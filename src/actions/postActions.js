import FireStoreParser from 'firestore-parser';
import { FETCH_POSTS, FETCH_POST } from './types';
import firestoreConfig from '../firestoreConfig';
import { parseFirestoreData } from '../utility';

export const fetchPosts = () => {
  return (dispatch) => {
    const doc = 'articles';
    const url = `https://firestore.googleapis.com/v1beta1/projects/${firestoreConfig.projectId}/databases/(default)/documents/${doc}?key=${firestoreConfig.apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(json => FireStoreParser(json))
        .then(json => {
          const docs = parseFirestoreData(json.documents);
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
    const doc = 'articles';
    const url = `https://firestore.googleapis.com/v1beta1/projects/${firestoreConfig.projectId}/databases/(default)/documents/${doc}/${id}?key=${firestoreConfig.apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(json => FireStoreParser(json))
        .then(doc => {
          dispatch({ 
            type: FETCH_POST,
            payload: doc.fields
          })
        })
        .catch(function(error) {
          console.log(error);
        });
  }
}
