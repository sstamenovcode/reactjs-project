import firebase from 'firebase/app';
import 'firebase/firestore';
import firestoreConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firestoreConfig);
const db = firebaseApp.firestore();

export default db;
