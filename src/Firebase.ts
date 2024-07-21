// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // @ts-ignore
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pramodhini-arts.firebaseapp.com",
  projectId: "pramodhini-arts",
  storageBucket: "pramodhini-arts.appspot.com",
  messagingSenderId: "996907515185",
  appId: "1:996907515185:web:042ddef63d0d097c828410",
  measurementId: "G-X22CKB6693",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
