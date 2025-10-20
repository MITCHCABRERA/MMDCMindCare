import type { User } from "./useAuth"; 
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig"; 

// Mock accounts for Doctor and Admin
const testDoctor: User = {
  email: "clear@gmail.com",
  password: "password123",
  name: "Dr. Maria Santos",
  role: "doctor",
};

const testAdmin: User = {
  email: "admin@mmdc.edu.ph",
  password: "admin123",
  name: "System Administrator",
  role: "admin",
};

// Email login (mock for Doctor and Admin)
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  if (email === testDoctor.email && password === testDoctor.password) {
    return { email: testDoctor.email, name: testDoctor.name, role: "doctor" };
  }
  if (email === testAdmin.email && password === testAdmin.password) {
    return { email: testAdmin.email, name: testAdmin.name, role: "admin" };
  }
  throw new Error("Invalid email or password");
};

// Google login using Firebase (any Google account)
export const loginWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const googleUser = result.user;

    return {
      email: googleUser.email || "",
      name: googleUser.displayName || "Google User",
      role: "student", // Default role for Google logins
      photoURL: googleUser.photoURL || "",
    };
  } catch (error: any) {
    console.error("Google Sign-In Error:", error.code, error.message);
    throw new Error("Google sign-in failed. Please try again.");
  }
};
