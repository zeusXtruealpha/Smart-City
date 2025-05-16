import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics"; // Import isSupported

const firebaseConfig = {
  apiKey: "AIzaSyBV58f4P23OR5Z4yRqQkfA9Qwd8tQCmEig",
  authDomain: "smart-city-management-6b9ec.firebaseapp.com",
  projectId: "smart-city-management-6b9ec",
  storageBucket: "smart-city-management-6b9ec.appspot.com",
  messagingSenderId: "117780971854",
  appId: "1:117780971854:web:3d642c8ebeb069a66e5e1f",
  measurementId: "G-D8SV3QMECX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore for event storage
const auth = getAuth(app); // Firebase Authentication

// Initialize Analytics only if supported (browser environment)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  analytics, // Export analytics if needed elsewhere
};