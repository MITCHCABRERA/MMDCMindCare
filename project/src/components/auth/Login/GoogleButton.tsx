import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../useAuth";
import { loginWithGoogle } from "../authAPI";
import { useNavigate } from "react-router-dom";

const GoogleButton: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleLogin = async () => {
  setIsSigningIn(true);
  try {
    const user = await loginWithGoogle();
    login(user);

    // Redirect based on role
    if (user.role === "doctor") {
      navigate("/doctor-panel");
    } else {
      navigate("/student-portal");
    }
  } catch (err) {
    console.error(err);
  } finally {
    setIsSigningIn(false);
  }
};


  return (
    <button
      onClick={handleGoogleLogin}
      disabled={isSigningIn}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl"
    >
      <FcGoogle className="text-xl bg-white rounded p-0.5" />
      {isSigningIn ? "Signing In..." : "Sign in with MMCD Gmail"} <ArrowRight className="w-4 h-4" />
    </button>
  );
};

export default GoogleButton;
