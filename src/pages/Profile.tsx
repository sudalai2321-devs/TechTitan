import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, GraduationCap, Award, Activity } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="md:col-span-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-brand-blue/20 to-transparent z-0"></div>
              
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-brand-blue relative z-10 flex items-center justify-center mb-6 shadow-xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                 <User size={48} style={{ color: 'var(--text-muted)' }} />
              </div>
              
              <h2 className="text-2xl font-bold mb-1 relative z-10" style={{ color: 'var(--text-primary)' }}>{user.name}</h2>
              <p className="text-brand-blue font-mono mb-4 relative z-10">{user.registerNo}</p>
              
              <div className="space-y-3 text-left pt-6 relative z-10" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <GraduationCap size={18} className="text-brand-blue" />
                  <span>{user.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <BookOpen size={18} className="text-brand-blue" />
                  <span>{user.year}</span>
                </div>
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <Mail size={18} className="text-brand-blue" />
                  <span>{user.email}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Dashboard/Stats */}
        <div className="md:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Activity className="text-brand-blue" />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>0</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Queries Submitted</div>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                  <Award className="text-brand-gold" />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>0</div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Events Attended</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
             <GlassCard className="p-6">
               <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
               <div className="space-y-4">
                 <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                   <p style={{ color: 'var(--text-secondary)' }}>No recent activity found.</p>
                   <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Your queries and event registrations will appear here.</p>
                 </div>
               </div>
             </GlassCard>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
