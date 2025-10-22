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
      // 🔹 Perform Google Sign-In (from authAPI.ts)
      const user = await loginWithGoogle();

      // 🔹 Restrict only MMDC Gmail accounts
      if (!user.email.endsWith("@mmdc.mcl.edu.ph")) {
        throw new Error("Please use your MMDC Gmail account to sign in.");
      }

      // 🔹 Save user globally + persist
      login(user);
      localStorage.setItem("authUser", JSON.stringify(user));

      // 🔹 Redirect to student dashboard
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      setError(err.message || "Sign-in failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGoogleLogin}
        disabled={isSigningIn}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:opacity-90 transition"
      >
        <FcGoogle className="text-xl bg-white rounded p-0.5" />
        {isSigningIn ? "Signing In..." : "Sign in with MMDC Gmail"}
        <ArrowRight className="w-4 h-4" />
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default GoogleButton;
