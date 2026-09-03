import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../api/googleScript';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const subjectsByYear: Record<string, string[]> = {
  "3rd Year": [
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "Computer Networks",
    "Software Engineering",
    "Professional Elective 1"
  ],
  "4th Year": [
    "Artificial Intelligence",
    "Cyber Security",
    "Blockchain Technology",
    "Project Management",
    "Professional Elective 3"
  ]
};

export const Queries = () => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<string>('');
  
  const [subject, setSubject] = useState('');
  const [queryType, setQueryType] = useState('Concept Doubt');
  const [question, setQuestion] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [queryId, setQueryId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !question) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await apiCall('submitQuery', {
        registerNo: user?.registerNo,
        name: user?.name,
        year: selectedYear,
        subject,
        queryType,
        question
      });

      if (response.success) {
        setSuccess(true);
        setQueryId(response.id || `TT-QRY-${Math.floor(Math.random() * 10000)}`);
        setSubject('');
        setQuestion('');
      } else {
        setError(response.message || 'Failed to submit query.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Ask Your Academic Doubt</h1>
        <p className="text-brand-blue tracking-[0.2em] uppercase font-medium">Learn. Ask. Understand.</p>
      </div>

      {!selectedYear ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Select Your Year</h2>
          <div className="flex justify-center gap-6">
            {Object.keys(subjectsByYear).map((year) => (
              <GlassCard 
                key={year} 
                hoverEffect 
                className="p-8 cursor-pointer w-48 text-center"
                onClick={() => setSelectedYear(year)}
              >
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{year}</h3>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedYear} Subjects</h2>
            <button 
              onClick={() => { setSelectedYear(''); setSuccess(false); }}
              className="text-sm hover:text-brand-blue transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              &larr; Change Year
            </button>
          </div>

          <GlassCard className="p-6 md:p-8">
            {success ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <CheckCircle2 className="text-green-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Query Submitted Successfully</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Your query ID is <span className="text-brand-blue font-mono">{queryId}</span></p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>You can track the status in your profile.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2 rounded-lg transition-colors" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  Ask Another Doubt
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="p-3 bg-brand-red/10 border border-brand-red/30 rounded-lg flex items-center gap-2 text-brand-red text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Subject</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50"
                      required
                    >
                      <option value="" disabled>Select a subject...</option>
                      {subjectsByYear[selectedYear].map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Query Type</label>
                    <select 
                      value={queryType}
                      onChange={(e) => setQueryType(e.target.value)}
                      className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50"
                    >
                      <option value="Concept Doubt">Concept Doubt</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Lab">Lab</option>
                      <option value="Exam Preparation">Exam Preparation</option>
                      <option value="Project">Project</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Your Doubt / Question</label>
                  <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={5}
                    className="w-full theme-input rounded-lg py-3 px-4 focus:outline-none focus:border-brand-blue/50 resize-none placeholder-gray-500"
                    placeholder="Describe your doubt in detail..."
                    required
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-[0_0_15px_rgba(0,151,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Submit Query'}
                  </button>
                </div>
              </form>
            )}
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
};
