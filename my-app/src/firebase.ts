// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkX8hao3qKDMLqPxsX1nTB-49_edbm3i8",
  authDomain: "term4-taishu-fujiura.firebaseapp.com",
  projectId: "term4-taishu-fujiura",
  storageBucket: "term4-taishu-fujiura.appspot.com",
  messagingSenderId: "169011336171",
  appId: "1:169011336171:web:7d453bd64071adec927fae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);