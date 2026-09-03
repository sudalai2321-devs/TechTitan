import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  userName: string;
  onComplete: () => void;
}

const flashMessages = [
  "Authenticating...",
  "Verifying Credentials...",
  "Access Granted ✓",
  "Loading Your Dashboard...",
  "Initializing Portal...",
  "Welcome to Tech Titans",
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ userName, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    // Flash messages
    const msgTimers = flashMessages.map((_, i) =>
      setTimeout(() => setCurrentMsg(i), i * 500)
    );

    // Show welcome after messages
    const welcomeTimer = setTimeout(() => setShowWelcome(true), flashMessages.length * 500 + 200);

    // Fade out and complete
    const fadeTimer = setTimeout(() => setFadeOut(true), flashMessages.length * 500 + 1800);
    const completeTimer = setTimeout(onComplete, flashMessages.length * 500 + 2500);

    return () => {
      clearInterval(progressInterval);
      msgTimers.forEach(clearTimeout);
      clearTimeout(welcomeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#020c1b' }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[80px] animate-blob" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,151,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,151,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Scanning line effect */}
          <motion.div
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">

            {/* Logo with pulse ring */}
            <div className="relative">
              {/* Outer pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-brand-blue/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                style={{ width: '160px', height: '160px', top: '-16px', left: '-16px' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-brand-blue/20"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: [1, 1.8, 2.2], opacity: [0.4, 0.1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                style={{ width: '160px', height: '160px', top: '-16px', left: '-16px' }}
              />

              <motion.div
                initial={{ scale: 0, rotateY: 90 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="w-32 h-32 rounded-full bg-white overflow-hidden shadow-[0_0_60px_rgba(0,151,255,0.4)] border-2 border-brand-blue/40"
              >
                <img src="/logo.png" alt="Tech Titans" className="w-full h-full object-cover scale-110" />
              </motion.div>
            </div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-2">
                TECH <span className="text-brand-blue">TITANS</span>
              </h1>
              <p className="text-sm tracking-[0.3em] uppercase text-gray-400">
                Create <span className="text-brand-blue">•</span> Code <span className="text-brand-red">•</span> Conquer
              </p>
            </motion.div>

            {/* Flash Messages */}
            <div className="h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMsg}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm font-mono tracking-wider"
                  style={{ color: currentMsg === 2 ? '#22c55e' : '#94a3b8' }}
                >
                  {flashMessages[currentMsg]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-72 md:w-96">
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-blue to-cyan-400"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                  style={{ boxShadow: '0 0 10px rgba(0,151,255,0.5)' }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-600 font-mono">{Math.min(Math.round(progress), 100)}%</span>
                <span className="text-xs text-gray-600 font-mono">LOADING</span>
              </div>
            </div>

            {/* Welcome Message */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mt-4"
                >
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">{userName}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-2">Your portal is ready</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom branding */}
          <div className="absolute bottom-8 text-center">
            <p className="text-xs text-gray-700 tracking-widest uppercase">Department Student Portal</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100]"
          style={{ backgroundColor: '#020c1b' }}
        />
      )}
    </AnimatePresence>
  );
};
