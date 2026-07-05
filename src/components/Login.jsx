import React, { useState } from "react";

const Login = ({ Log,loading,setloading, setsigntrue, email, password }) => {
  const [isField, setisField] = useState(true);

  const checkfield = () => {
    
    if (email.email.trim() === "" || password.password.trim() === "") {
      setisField(false);
      return;
    }
    setloading(true);
    console.log(email.email +" "+password.password)
     Log();
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl">
      <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Log in to continue your conversations</p>
        </div>

        <div className="space-y-5">
          {!isField && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center animate-shake">
              All fields are required for Login
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-600"
              value={email.email}
              type="email"
              onChange={(e) => {
                email.setemail(e.target.value);
                setisField(true);
              }}
              required
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-600"
              value={password.password}
              type="password"
              onChange={(e) => {
                password.setpassword(e.target.value);
                setisField(true);
              }}
              required
              placeholder="••••••••"
            />
          </div>

          <button 
            onClick={checkfield}
            disabled={loading}
            className={`w-full py-3.5 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2
              ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-violet-600" required />
            <p>I agree to the Terms and Conditions</p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <span
                onClick={() => setsigntrue(true)}
                className="ml-2 font-semibold text-violet-400 hover:text-violet-300 cursor-pointer transition-colors"
              >Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
