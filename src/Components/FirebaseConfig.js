// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWhzSAl2pSmSica9YO83Hz5h7BD7EYFqA",
    authDomain: "todo-list-853a5.firebaseapp.com",
    projectId: "todo-list-853a5",
    storageBucket: "todo-list-853a5.appspot.com",
    messagingSenderId: "123312782991",
    appId: "1:123312782991:web:23cc0e0e9eafa1eebbbafa"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
