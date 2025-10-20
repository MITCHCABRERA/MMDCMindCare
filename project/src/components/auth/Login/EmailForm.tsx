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
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      login(user);
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError(err.message || "Google login failed");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleLogin}
        disabled={isSigningIn}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl shadow-lg hover:opacity-90 transition"
      >
        <FcGoogle className="text-xl bg-white rounded p-0.5" />
        {isSigningIn ? "Signing In..." : "Login with MMDC Gmail"} <ArrowRight className="w-4 h-4" />
      </button>
      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
    </div>
  );
};

export default GoogleButton;
