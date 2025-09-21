import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../useAuth";
import { loginWithEmail } from "../authAPI";
import { useNavigate } from "react-router-dom";

const EmailForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async () => {
  setIsSigningIn(true);
  setError(null);
  try {
    const user = await loginWithEmail(email, password);
    login(user); // update global auth state

    // Redirect based on role
    if (user.role === "doctor") {
    navigate("/doctor-panel");
  } else if (user.role === "student") {
    navigate("/dashboard");
  } else {
    console.warn("⚠️ Login fallback triggered: role not defined", user);
    navigate("/dashboard", { state: { fallback: true } });
  }
  } catch (err) {
    setError("Invalid credentials");
    console.error(err);
  } finally {
    setIsSigningIn(false);
  }
};

  return (
    <div className="space-y-5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-3 border rounded-xl"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-3 border rounded-xl"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleEmailLogin}
        disabled={isSigningIn}
        className="w-full flex justify-center items-center gap-2 py-3 bg-gray-100 rounded-xl"
      >
        {isSigningIn ? "Signing In..." : "Sign in"} <ArrowRight />
      </button>
    </div>
  );
};

export default EmailForm;
