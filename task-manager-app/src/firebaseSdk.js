
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWoeiX1hVpkngbhGeW01lrpKWQJl7Inj8",
  authDomain: "fl-easy-planner.firebaseapp.com",
  projectId: "fl-easy-planner",
  storageBucket: "fl-easy-planner.appspot.com",
  messagingSenderId: "893200709217",
  appId: "1:893200709217:web:1fd3331e5c037407115c20",
  measurementId: "G-2C4YZXG7DK"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleProvider, firebase };