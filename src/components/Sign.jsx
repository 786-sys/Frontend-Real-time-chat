import React, { useState } from "react";
import Desc from "./Desc";
import toast from "react-hot-toast";
const Sign = ({ register,setsigntrue ,fullname,email,password , description}) => {
  
  const [isdesc,setisdesc]=useState(false);
  const dekhozara=async(e)=>{
           if (
      fullname.fullname.trim() === "" ||
      email.email.trim() === "" ||
      password.password.trim() === "" 
    ) {
      alert("Please fill all fields first");
      return;
    }

    // ✅ move to next page ONLY if valid
    setisdesc(true);
  }
  return (
    <div className="w-full max-w-md bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
      {!isdesc ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Join our community today</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 ml-1">Full Name</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-600"
                type="text"
                onChange={(e) => fullname.setfullname(e.target.value)}
                required
                placeholder="John Doe"
                value={fullname.fullname}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 ml-1">Email Address</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-600"
                type="email"
                onChange={(e) => email.setemail(e.target.value)}
                required
                placeholder="name@example.com"
                value={email.email}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 ml-1">Password</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm outline-none focus:ring-2 focus:ring-violet-500/50 transition-all placeholder-gray-600"
                type="password"
                onChange={(e) => password.setpassword(e.target.value)}
                required
                placeholder="••••••••"
                value={password.password}
              />
            </div>

            <button 
              onClick={dekhozara} 
              className="w-full py-3.5 mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => setisdesc(false)}
              className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-white">Tell us about yourself</h2>
            <div className="w-8" /> {/* Spacer */}
          </div>
          <Desc description={description} register={register} isdesc={isdesc} setisdesc={setisdesc} />
        </>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-violet-600" required />
          <p>I agree to the Terms and Conditions</p>
        </div>

        <div className="pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?
            <span
              onClick={() => setsigntrue(false)}
              className="ml-2 font-semibold text-violet-400 hover:text-violet-300 cursor-pointer transition-colors"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign;
