import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USER, APP_NAME, LOGO_URL } from '../constants';
import { Lock, Mail, ArrowRight, Fingerprint, User as UserIcon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (isSignUp) {
          // Registration logic simulation
          if (password !== confirmPassword) {
              alert("Passwords do not match!");
              return;
          }
          const newUser: User = {
              id: `u-${Date.now()}`,
              name: name || "New Faculty",
              email: email,
              role: UserRole.FACULTY, // Defaulting to Faculty for demo
              department: "General",
              avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'New User')}&background=1a237e&color=fff`
          };
          onLogin(newUser);
      } else {
          // Login logic simulation
          onLogin({
              ...MOCK_USER, 
              email: email || MOCK_USER.email
          });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1a237e] rounded-b-[30%] lg:rounded-b-[50%] z-0"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="p-8 pb-0 flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 -mt-12 border-4 border-slate-50 overflow-hidden p-2">
                <img src={LOGO_URL} alt="PSNA Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-center text-slate-800">
                {isSignUp ? 'Create Account' : 'PSNA CET'}
            </h2>
            <p className="text-slate-500 text-sm text-center mt-1">
                {isSignUp ? 'Join the Academic Management System' : 'Academic Management System'}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {!useBiometric ? (
              <>
                {isSignUp && (
                    <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition-all"
                                placeholder="Dr. John Doe"
                                required={isSignUp}
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">College Email / ID</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition-all"
                            placeholder="faculty@psnacet.edu.in"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {isSignUp && (
                    <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required={isSignUp}
                            />
                        </div>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#1a237e] hover:bg-blue-900 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
              </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-pulse">
                 <div className="p-4 bg-blue-50 rounded-full text-[#1a237e]">
                    <Fingerprint size={64} />
                 </div>
                 <p className="text-slate-600 font-medium">Scan fingerprint to verify</p>
                 <button 
                    type="button" 
                    onClick={() => onLogin(MOCK_USER)}
                    className="text-xs text-blue-600 hover:underline"
                >
                    (Simulator: Click to Pass)
                </button>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
             <div className="flex items-center justify-between">
                <button 
                    type="button" 
                    onClick={() => setUseBiometric(!useBiometric)}
                    className="text-sm text-slate-500 hover:text-[#1a237e] flex items-center gap-1 transition-colors"
                >
                    {useBiometric ? <Mail size={14} /> : <Fingerprint size={14} />}
                    {useBiometric ? 'Use Password' : 'Biometric Login'}
                </button>
                {!isSignUp && (
                    <a href="#" className="text-sm text-slate-500 hover:text-[#1a237e] transition-colors">Forgot Password?</a>
                )}
             </div>

             <div className="text-center text-sm">
                <span className="text-slate-500">
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                </span>
                <button 
                    type="button"
                    onClick={() => {
                        setIsSignUp(!isSignUp);
                        setUseBiometric(false);
                    }}
                    className="font-semibold text-[#1a237e] hover:underline"
                >
                    {isSignUp ? "Sign In" : "Sign Up"}
                </button>
             </div>
          </div>
        </form>
      </div>
      
      <p className="mt-8 text-slate-500 text-sm font-medium">&copy; {new Date().getFullYear()} {APP_NAME}</p>
    </div>
  );
};

export default Login;