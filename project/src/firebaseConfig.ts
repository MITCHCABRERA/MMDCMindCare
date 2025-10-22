// firebaseConfig.js (or firebase.js / authAPI.js)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGvmKTGpLSK_xDDHO5hIf2ztZhXmEJLD4",
  authDomain: "mmdcmindcare-26a53.firebaseapp.com",
  projectId: "mmdcmindcare-26a53",
  storageBucket: "mmdcmindcare-26a53.firebasestorage.app",
  messagingSenderId: "14628770249",
  appId: "1:14628770249:web:41468d476ad564c92d1818",
  measurementId: "G-66764Y3N01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Auth + Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Force Google to ask user which account to use
googleProvider.setCustomParameters({ prompt: "select_account" });
