// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDCnogLDw8Lwg3_l_BfEGZ5gk5dnSk6ybE",
  authDomain: "todo-list-9b183.firebaseapp.com",
  projectId: "todo-list-9b183",
  storageBucket: "todo-list-9b183.appspot.com",
  messagingSenderId: "574796784724",
  appId: "1:574796784724:web:fb6efe49c09e55a25839c1"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
