import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB4L8Fjjt1j9DA3f4-bwCN2JvvXfqI9WaQ",
    authDomain: "learnsynchub-fc3b1.firebaseapp.com",
    projectId: "learnsynchub-fc3b1",
    storageBucket: "learnsynchub-fc3b1.appspot.com",
    messagingSenderId: "557037022729",
    appId: "1:557037022729:web:8db9f52ec3342e8bfcd2d8"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export Firebase services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();


export default firebase;
