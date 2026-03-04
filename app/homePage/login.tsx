"use client";
import { useState } from "react";
import { login, signUp } from "../apiService/LoginSignupApi";

type Tab = "signin" | "signup";

const inputClass = "bg-white text-gray-800 placeholder-gray-400 rounded-xl px-4 py-3 text-sm outline-none w-full";

export const Login = () => {
  const [tab, setTab] = useState<Tab>("signin");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignIn = tab === "signin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (isSignIn) {
        const res = await login({ email: form.email, password: form.password });
        console.log("Logged in:", res);
        // TODO: save token, redirect
      } else {
        await signUp(form);
        setTab("signin");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-500 opacity-20 blur-3xl" />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center">

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-gradient-to-br from-violet-500 to-pink-500 p-2 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl">VocabEssay</span>
        </div>

        <h2 className="text-white text-2xl font-bold mb-1">
          {isSignIn ? "Welcome back 👋" : "Create account ✨"}
        </h2>
        <p className="text-white/40 text-sm mb-6">
          {isSignIn ? "Sign in to continue" : "Join thousands of learners"}
        </p>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl p-1 mb-6">
          {(["signin", "signup"] as Tab[]).map(t => (
            <button key={t} onClick={() => { setTab(t); setForm({ username: "", email: "", password: "" }); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all ${
                tab === t ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow" : "text-gray-500"
              }`}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        {/* Fields */}
        <div className="flex flex-col gap-3">
          {!isSignIn && (
            <input name="username" type="text" placeholder="Username" className={inputClass}
              value={form.username} onChange={handleChange} />
          )}
          <input name="email" type="email" placeholder="Email" className={inputClass}
            value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" className={inputClass}
            value={form.password} onChange={handleChange} />

          {isSignIn && <p className="text-right text-violet-400 text-xs cursor-pointer">Forgot password?</p>}

          <button onClick={handleSubmit} disabled={loading}
            className="bg-gradient-to-r from-violet-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm cursor-pointer">
            {loading ? (isSignIn ? "Signing in..." : "Creating...") : (isSignIn ? "Sign In" : "Create Account")}
          </button>
        </div>

        <p className="mt-5 text-sm text-white/40">
          {isSignIn ? "No account? " : "Have an account? "}
          <span onClick={() => setTab(isSignIn ? "signup" : "signin")}
            className="text-violet-400 font-semibold cursor-pointer">
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>

      </div>
    </div>
  );
};