// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcJk1a8TGeIvA4t444o4HRhn0NcXKkl44",
  authDomain: "hamza-shabbir.firebaseapp.com",
  projectId: "hamza-shabbir",
  storageBucket: "hamza-shabbir.firebasestorage.app",
  messagingSenderId: "312202136976",
  appId: "1:312202136976:web:1837752b0d20d5ba113715",
  measurementId: "G-3WEHBHFP51"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };