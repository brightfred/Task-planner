// src/firebaseSdk.js

import firebase from 'firebase/compat/app'; // Use compat version for compatibility with older Firebase syntax
import 'firebase/compat/auth'; // Import auth module
// import 'firebase/compat/firestore'; // Uncomment if you're using Firestore

// Firebase configuration
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

// Initialize Firebase Auth and providers
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Define other providers as needed

// Exporting the authentication service and providers
export { auth, googleProvider };

// If you're using Firestore, export it
// const db = firebaseApp.firestore();
// export { db };

export default firebaseApp;