// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiWYxNNDEnytSjry3DXFzXRcyNaTyTqzg",
  authDomain: "rahul-79a9f.firebaseapp.com",
  databaseURL: "https://rahul-79a9f-default-rtdb.firebaseio.com",
  projectId: "rahul-79a9f",
  storageBucket: "rahul-79a9f.firebasestorage.app",
  messagingSenderId: "333910964548",
  appId: "1:333910964548:web:bce4b24ee065332e94ff11",
  measurementId: "G-4F699J6CKY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Initialize Analytics (only on client side)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, storage, auth, analytics };
