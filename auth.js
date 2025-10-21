// auth.js
// Use ES module imports from Firebase CDN. This file should be loaded via module import from script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

/*
  Your web app's Firebase configuration
  (Using the config you provided)
*/
const firebaseConfig = {
  apiKey: "AIzaSyCK9FJ_Ck3WANqUolE4nsNrrG_81_Z2vfI",
  authDomain: "kamil-ahmed-portfolio.firebaseapp.com",
  projectId: "kamil-ahmed-portfolio",
  storageBucket: "kamil-ahmed-portfolio.firebasestorage.app",
  messagingSenderId: "622381161793",
  appId: "1:622381161793:web:e6edcac810532df4a615c0",
  measurementId: "G-H0ZPKXK8WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is optional and will error if blocked in environments without access;
// we attempt to initialize it in a try/catch to avoid runtime failures.
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics may fail in some environments (e.g., file:// or blocked trackers)
  // swallow gracefully
  // console.warn('Firebase analytics not initialized:', e);
}

// Firestore instance
const db = getFirestore(app);

// Export the Firestore db instance for use in other scripts
export { db };
