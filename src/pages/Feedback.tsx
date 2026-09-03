import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../api/googleScript';
import { Loader2, CheckCircle2, MessageSquare, Calendar, Lightbulb } from 'lucide-react';
import { cn } from '../utils/cn';

export const Feedback = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'association' | 'event' | 'suggestion'>('association');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiCall('submitFeedback', { type: activeTab, registerNo: user?.registerNo });
      if (response.success) setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'association', label: 'Association Feedback', icon: MessageSquare },
    { id: 'event', label: 'Event Feedback', icon: Calendar },
    { id: 'suggestion', label: 'Suggestions', icon: Lightbulb },
  ] as const;

  if (success) {
    return (
      <div className="pt-32 pb-20 max-w-2xl mx-auto px-4 text-center">
        <GlassCard className="p-12">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            <CheckCircle2 className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Thank You!</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Your voice helps us improve and grow. We appreciate your input.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="px-8 py-3 bg-brand-blue hover:bg-blue-600 rounded-lg text-white font-medium transition-all"
          >
            Submit Another
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Your Voice Matters</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Help us improve the association, events, and academic experience.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all",
              activeTab === tab.id 
                ? "bg-brand-blue text-white shadow-[0_0_15px_rgba(0,151,255,0.4)]" 
                : ""
            )}
            style={activeTab !== tab.id ? { background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' } : undefined}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {activeTab === 'association' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Overall Experience Rating (1-5)</label>
                  <select className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50" required>
                    <option value="" disabled>Select rating...</option>
                    {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} - {num === 5 ? 'Excellent' : num === 1 ? 'Poor' : ''}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>What do you like about Tech Titans?</label>
                  <textarea rows={3} className="w-full theme-input rounded-lg py-3 px-4 focus:border-brand-blue/50 resize-none" required></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>What can we improve?</label>
                  <textarea rows={3} className="w-full theme-input rounded-lg py-3 px-4 focus:border-brand-blue/50 resize-none" required></textarea>
                </div>
              </>
            )}

            {activeTab === 'event' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Select Event</label>
                  <select className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50" required>
                    <option value="" disabled>Select an event...</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Content Quality</label>
                    <select className="w-full theme-input rounded-lg py-3 px-4" required><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Organization</label>
                    <select className="w-full theme-input rounded-lg py-3 px-4" required><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Overall Experience & Suggestions</label>
                  <textarea rows={4} className="w-full theme-input rounded-lg py-3 px-4 focus:border-brand-blue/50 resize-none" required></textarea>
                </div>
              </>
            )}

            {activeTab === 'suggestion' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Category</label>
                  <select className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50" required>
                    <option value="Event">Event Idea</option>
                    <option value="Club">Club Activity</option>
                    <option value="Academic">Academic Support</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Suggestion Title</label>
                  <input type="text" className="w-full theme-input rounded-lg py-3 px-4 focus:border-brand-blue/50" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Detailed Description</label>
                  <textarea rows={5} className="w-full theme-input rounded-lg py-3 px-4 focus:border-brand-blue/50 resize-none" required></textarea>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-white/20 text-brand-blue focus:ring-brand-blue/50" />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Submit Anonymously</span>
                </label>
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-[0_0_15px_rgba(0,151,255,0.4)] transition-all flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit'}
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};
