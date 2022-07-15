import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDo4p5JMdu8iVTPzA4ajHtI7oOZ9bu98GQ",
    authDomain: "sefinaldtumate.firebaseapp.com",
    projectId: "sefinaldtumate",
    storageBucket: "sefinaldtumate.appspot.com",
    messagingSenderId: "669361681932",
    appId: "1:669361681932:web:7ee7b81527a385e3786029",
    measurementId: "G-BPXVMQY74Q"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };