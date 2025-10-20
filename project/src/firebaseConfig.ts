import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOuLXVpLWPP8x8k_UQY-kW0FSrPDjEUJQ",
  authDomain: "mmdcmindcare-93539.firebaseapp.com",
  projectId: "mmdcmindcare-93539",
  storageBucket: "mmdcmindcare-93539.appspot.com",
  messagingSenderId: "244950654009",
  appId: "1:244950654009:web:2241ffd147377b269841e8",
  measurementId: "G-LYZFJ93XJ6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
