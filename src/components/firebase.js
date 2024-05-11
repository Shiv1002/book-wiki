// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(
    process.env.REACT_APP_FIREBASE_RECAPTCHAV3_PROVIDER
  ),
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
// const analytics = getAnalytics(app);
