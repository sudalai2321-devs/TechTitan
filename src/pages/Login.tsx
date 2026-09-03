import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2, Zap, Shield, Code, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../api/googleScript';
import { GlassCard } from '../components/ui/GlassCard';
import { SplashScreen } from '../components/ui/SplashScreen';

type LoginStep = 'register' | 'setPassword' | 'login';

const floatingIcons = [
  { icon: Code, x: '10%', y: '20%', delay: 0, size: 20 },
  { icon: Shield, x: '80%', y: '30%', delay: 1.5, size: 18 },
  { icon: Zap, x: '15%', y: '70%', delay: 3, size: 16 },
  { icon: Code, x: '75%', y: '75%', delay: 0.8, size: 22 },
  { icon: Shield, x: '50%', y: '15%', delay: 2, size: 14 },
];

export const Login = () => {
  // State
  const [step, setStep] = useState<LoginStep>('register');
  const [registerNo, setRegisterNo] = useState('');
  const [studentName, setStudentName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Step 1: Check Register Number
  const handleCheckRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!registerNo.trim()) { setError('Please enter your Register Number.'); return; }

    setLoading(true);
    try {
      const res = await apiCall('checkRegister', { registerNo: registerNo.trim() });
      if (res.success) {
        setStudentName(res.studentName);
        if (res.needsSetup) {
          setStep('setPassword');
        } else {
          setStep('login');
        }
      } else {
        setError(res.message || 'Invalid Register Number.');
      }
    } catch {
      setError('Connection failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Set Password (first time)
  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      const res = await apiCall('setPassword', { registerNo: registerNo.trim(), password });
      if (res.success && res.user) {
        setLoggedInUser(res.user);
        login(res.user);
        setShowSplash(true);
      } else {
        setError(res.message || 'Failed to set password.');
      }
    } catch {
      setError('Connection failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Normal Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password) { setError('Please enter your password.'); return; }

    setLoading(true);
    try {
      const res = await apiCall('login', { registerNo: registerNo.trim(), password });
      if (res.success && res.user) {
        setLoggedInUser(res.user);
        login(res.user);
        setShowSplash(true);
      } else if (res.needsSetup) {
        setStep('setPassword');
        setPassword('');
      } else {
        setError(res.message || 'Invalid credentials.');
      }
    } catch {
      setError('Connection failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('register');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  // Show splash after login
  if (showSplash && loggedInUser) {
    return <SplashScreen userName={loggedInUser.name.split(' ')[0]} onComplete={() => navigate('/')} />;
  }

  // Determine which form to show
  const renderForm = () => {
    switch (step) {
      case 'register':
        return (
          <motion.div key="step-register" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="text-center space-y-3 mb-8">
              <div className="lg:hidden w-24 h-24 mx-auto rounded-full bg-white overflow-hidden shadow-[0_0_30px_rgba(0,151,255,0.3)] mb-4 border-2 border-brand-blue/30">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <h2 className="text-3xl font-bold">
                <span style={{ color: 'var(--text-primary)' }}>Welcome, </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">Tech Titan</span>
              </h2>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Enter your Register Number to get started</p>
            </div>

            <form onSubmit={handleCheckRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Register Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}><User size={18} /></div>
                  <input
                    type="text" value={registerNo} onChange={(e) => setRegisterNo(e.target.value)}
                    className="w-full theme-input rounded-xl py-3.5 pl-11 pr-4 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="e.g. 11524100084" autoFocus
                  />
                </div>
              </div>

              <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,151,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><span>Continue</span><ArrowRight size={18} /></>}
              </motion.button>
            </form>
          </motion.div>
        );

      case 'setPassword':
        return (
          <motion.div key="step-setup" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="text-center space-y-3 mb-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-2">
                <KeyRound className="text-brand-blue" size={28} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Hello, <span className="text-brand-blue">{studentName.split(' ')[0]}</span>!
              </h2>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">This is your first login. Please set a password for your account.</p>
              <div className="inline-block px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {registerNo} — {studentName}
              </div>
            </div>

            <form onSubmit={handleSetPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Create Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}><Lock size={18} /></div>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full theme-input rounded-xl py-3.5 pl-11 pr-12 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="Min. 4 characters" autoFocus />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center" style={{ color: 'var(--text-muted)' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}><Lock size={18} /></div>
                  <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full theme-input rounded-xl py-3.5 pl-11 pr-12 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="Re-enter password" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center" style={{ color: 'var(--text-muted)' }}>
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && confirmPassword && password === confirmPassword && (
                  <p className="text-xs text-green-500 flex items-center gap-1"><CheckCircle2 size={12} /> Passwords match</p>
                )}
              </div>

              <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,151,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <><Zap size={18} /><span>Set Password & Login</span></>}
              </motion.button>

              <button type="button" onClick={handleBack} className="w-full text-sm text-center py-2" style={{ color: 'var(--text-muted)' }}>
                ← Back to Register Number
              </button>
            </form>
          </motion.div>
        );

      case 'login':
        return (
          <motion.div key="step-login" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="text-center space-y-3 mb-8">
              <div className="lg:hidden w-24 h-24 mx-auto rounded-full bg-white overflow-hidden shadow-[0_0_30px_rgba(0,151,255,0.3)] mb-4 border-2 border-brand-blue/30">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Welcome back, <span className="text-brand-blue">{studentName.split(' ')[0]}</span>
              </h2>
              <div className="inline-block px-4 py-2 rounded-lg text-xs font-mono" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {registerNo}
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-muted)' }}><Lock size={18} /></div>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full theme-input rounded-xl py-3.5 pl-11 pr-12 focus:outline-none focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/20 transition-all"
                    placeholder="Enter your password" autoFocus />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center" style={{ color: 'var(--text-muted)' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-brand-blue to-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,151,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70">
                {loading ? <><Loader2 className="animate-spin" size={20} /><span>Authenticating...</span></> : <><Zap size={18} /><span>LOGIN</span></>}
              </motion.button>

              <button type="button" onClick={handleBack} className="w-full text-sm text-center py-2" style={{ color: 'var(--text-muted)' }}>
                ← Use a different Register Number
              </button>
            </form>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex font-sans overflow-hidden relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-3/5 relative flex-col justify-center items-center p-12 overflow-hidden" style={{ borderRight: '1px solid var(--border-color)' }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-red/8 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(0,151,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,151,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {floatingIcons.map((item, i) => (
          <motion.div key={i} className="absolute opacity-10" style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}>
            <item.icon size={item.size} className="text-brand-blue" />
          </motion.div>
        ))}

        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 800 600">
          <motion.path d="M100,300 L250,300 L250,150 L400,150 L400,300 L550,300" stroke="#0097ff" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }} />
          <motion.path d="M200,450 L350,450 L350,350 L500,350 L500,500 L650,500" stroke="#0097ff" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', delay: 1 }} />
        </svg>
        
        <div className="z-10 text-center space-y-8">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, type: 'spring', stiffness: 80 }} className="relative">
            <div className="absolute inset-0 w-56 h-56 mx-auto rounded-full bg-brand-blue/20 blur-[40px] animate-pulse"></div>
            <div className="w-56 h-56 mx-auto rounded-full flex items-center justify-center border-4 border-brand-blue/30 shadow-[0_0_60px_rgba(0,151,255,0.3)] relative overflow-hidden bg-white animate-glow-pulse">
              <img src="/logo.png" alt="Tech Titans Logo" className="w-full h-full object-cover scale-110" />
            </div>
          </motion.div>
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-widest" style={{ color: 'var(--text-primary)' }}>TECH <span className="text-brand-blue">TITANS</span></h1>
            <div className="flex items-center justify-center gap-3 text-lg font-light tracking-[0.3em] uppercase" style={{ color: 'var(--text-secondary)' }}>
              <span>Create</span><span className="w-2 h-2 rounded-full bg-brand-blue"></span><span>Code</span><span className="w-2 h-2 rounded-full bg-brand-red"></span><span>Conquer</span>
            </div>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="inline-block px-6 py-3 rounded-xl backdrop-blur-md" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>🚀 Department Student Portal • Powered by Innovation</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 z-0" style={{ background: `linear-gradient(to top, var(--bg-primary), transparent)` }}></div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 sm:p-8 relative">
        <div className="absolute inset-0 pointer-events-none lg:hidden overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] animate-blob"></div>
        </div>

        <div className="w-full max-w-md z-10">
          <GlassCard className="p-8">
            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-brand-red/10 border border-brand-red/30 p-3 rounded-lg flex items-center gap-3 text-brand-red text-sm mb-6">
                  <AlertCircle size={18} className="shrink-0" /><p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {renderForm()}
            </AnimatePresence>

            <div className="text-center pt-6 mt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>🔒 Authorized Department Students Only</p>
            </div>
          </GlassCard>

          <p className="text-center mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Tech Titans • Department Student Portal</p>
        </div>
      </div>
    </div>
  );
};
