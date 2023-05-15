import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDEsdTCyV6YaaIGLawqCeSRuFFMbYg5lcM",
    authDomain: "smartdreoacation.firebaseapp.com",
    projectId: "smartdreoacation",
    storageBucket: "smartdreoacation.appspot.com",
    messagingSenderId: "888265809316",
    appId: "1:888265809316:web:9c58d7ce52f0da01a5f531",
    measurementId: "G-RGSVZWG28M"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, firebaseConfig };