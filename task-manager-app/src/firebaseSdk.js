
import firebase from 'firebase/app';
import 'firebase/auth';
// If you're using Firestore, uncomment the next line
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWoeiX1hVpkngbhGeW01lrpKWQJl7Inj8",
  authDomain: "fl-easy-planner.firebaseapp.com",
  projectId: "fl-easy-planner",
  storageBucket: "fl-easy-planner.appspot.com",
  messagingSenderId: "893200709217",
  appId: "1:893200709217:web:1fd3331e5c037407115c20",
  measurementId: "G-2C4YZXG7DK"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Exporting the authentication service
export const auth = firebaseApp.auth();

// If you're using Firestore, export it
// export const db = firebaseApp.firestore();

export default firebaseApp;