// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // For Firebase Authentication
import { getFirestore } from "firebase/firestore";  // For Firebase Firestor
// Your web app's Firebase configuration
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAsBI_uUVg48rNRVYnx-5dn82rdWCKVgQ4",
  authDomain: "socialmediafeed-c2aed.firebaseapp.com",
  projectId: "socialmediafeed-c2aed",
  storageBucket: "socialmediafeed-c2aed.appspot.com",  // Fix here for correct storageBucket
  messagingSenderId: "926475095807",
  appId: "1:926475095807:web:7ac6ecaa3558e698f946ca",
  measurementId: "G-Y90HNGVWNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
// Importing required Firebase functions


// Function to upload file to Firebase Storage
const storage = getStorage();




// Export Authentication and Firestore
export { auth, db, storage};
