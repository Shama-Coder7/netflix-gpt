// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUTQmxPLlvKv9bKgZwd5ibRs2K4Y8FC_w",
  authDomain: "netflix-gpt-371ce.firebaseapp.com",
  projectId: "netflix-gpt-371ce",
  storageBucket: "netflix-gpt-371ce.appspot.com",
  messagingSenderId: "903017908334",
  appId: "1:903017908334:web:f1b9bb53c11c2306953e7f",
  measurementId: "G-85GV7EL30N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth= getAuth();