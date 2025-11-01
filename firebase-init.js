// Initialize Firebase (ES module, using CDN ESM builds)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';

// Replace or verify these values in Firebase Console if needed
const firebaseConfig = {
  apiKey: "AIzaSyCyG_ipwJ525HQxKzBOxb4jkxjpkHaSJmE",
  authDomain: "recurra-b33c3.firebaseapp.com",
  projectId: "recurra-b33c3",
  storageBucket: "recurra-b33c3.firebasestorage.app",
  messagingSenderId: "663240331825",
  appId: "1:663240331825:web:81a60047f571168d61fb10",
  measurementId: "G-8KLBN38SS9"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Analytics is optional and may throw on some environments
export let analytics = null;
try {
  analytics = getAnalytics(firebaseApp);
} catch (err) {
  console.warn('Firebase analytics init skipped:', err);
}

// Auth setup
export const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

// Expose a global helper so non-module scripts (like your Shadow DOM header) can call it
window.signInWithGoogle = async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    // result.user contains user info
    return result;
  } catch (err) {
    console.error('Google sign-in failed', err);
    throw err;
  }
};

// Listen for auth state changes and redirect to dashboard when signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // avoid redirect loop if already on dashboard
    if (!location.pathname.includes('dashboard')) {
      location.href = 'dashboard.html';
    }
  }
});