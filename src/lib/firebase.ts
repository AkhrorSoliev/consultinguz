// Import the functions you need from the SDKs you need
"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC-owycg3SCoTW2_9fZuVHA2d8irqUH3A",
  authDomain: "consultinguz.firebaseapp.com",
  projectId: "consultinguz",
  storageBucket: "consultinguz.firebasestorage.app",
  messagingSenderId: "498235977281",
  appId: "1:498235977281:web:edaf3ea5e8bda9507d20c0",
  measurementId: "G-9E9XNSC0HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
