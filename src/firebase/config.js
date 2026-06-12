// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQoQhfvnBDxqLs7mM2tExltSrpoTKgW28",
  authDomain: "tt-react-proyecto.firebaseapp.com",
  projectId: "tt-react-proyecto",
  storageBucket: "tt-react-proyecto.firebasestorage.app",
  messagingSenderId: "447609954708",
  appId: "1:447609954708:web:d837d5cfb096a2fe8daf81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
