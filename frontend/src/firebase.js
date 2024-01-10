// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6b1a6.firebaseapp.com",
  projectId: "mern-estate-6b1a6",
  storageBucket: "mern-estate-6b1a6.appspot.com",
  messagingSenderId: "1067003488574",
  appId: "1:1067003488574:web:b658080737bcbc3ba6246f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
