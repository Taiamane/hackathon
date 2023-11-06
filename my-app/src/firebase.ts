import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyBtuCBjl-Ij1c-rQnT0zlxT6CWCzWjMsEg",
  authDomain: "hackathon-a90a5.firebaseapp.com",
  projectId: "hackathon-a90a5",
  storageBucket: "hackathon-a90a5.appspot.com",
  messagingSenderId: "456915642953",
  appId: "1:456915642953:web:bee41d3ab73155c6292d98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);