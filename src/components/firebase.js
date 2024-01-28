// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "book-store-a3ba4.firebaseapp.com",
  projectId: "book-store-a3ba4",
  storageBucket: "book-store-a3ba4.appspot.com",
  messagingSenderId: "585982264217",
  appId: "1:585982264217:web:67399294a16fe5c95dc908",
  measurementId: "G-VXQJDFZKF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
// const analytics = getAnalytics(app);
