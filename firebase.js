// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';
const FirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAajekd2bhMTu_Zuo_ugukS0bw87q9E11s",
    authDomain: "instagram-clone-99055.firebaseapp.com",
    databaseURL: "https://instagram-clone-99055-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-99055",
    storageBucket: "instagram-clone-99055.appspot.com",
    messagingSenderId: "1044484358199",
    appId: "1:1044484358199:web:74a092ee9a63ec6a42bfb2",
    measurementId: "G-NV5H40PKK0"
  });

const db = FirebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };