import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Calendar, Users, Target, Code, ArrowRight } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo';

export const Home = () => {
  return (
    <div className="pt-20 pb-12">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(0,151,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,151,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Tech Titans Logo in Hero */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block relative"
            >
              <div className="absolute inset-0 rounded-full bg-brand-blue/30 blur-2xl animate-pulse"></div>
              <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full bg-white flex items-center justify-center shadow-[0_0_50px_var(--shadow-glow)] border-4 border-brand-blue/40 overflow-hidden relative z-10 animate-glow-pulse">
                <img src={logoImg} alt="Tech Titans Logo" className="w-full h-full object-cover scale-105" />
              </div>
            </motion.div>

            <div>
              <div className="inline-block p-2 px-4 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-medium mb-4 backdrop-blur-sm">
                The Official Department Portal
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400">TechTitans</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>
              Create <span className="text-brand-blue">•</span> Code <span className="text-brand-red">•</span> Conquer
            </p>
            
            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Empowering students to explore technology, collaborate, innovate, and lead. Join us in shaping the future of digital excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link to="/association" className="w-full sm:w-auto px-8 py-3 rounded-lg bg-brand-blue hover:bg-blue-600 text-white font-medium transition-all shadow-[0_0_20px_rgba(0,151,255,0.4)] hover:shadow-[0_0_30px_rgba(0,151,255,0.6)]">
                Explore Association
              </Link>
              <Link to="/queries" className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium transition-all backdrop-blur-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                Ask a Subject Doubt
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEACHER'S DAY SPECIAL SECTION */}
      <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))` }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
              <BookOpen className="text-brand-gold" size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Celebrating the Mentors Who Shape Our Future</h2>
            <p className="text-2xl font-serif italic max-w-3xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              "Behind every successful student is a teacher who believed in them."
            </p>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Happy Teacher's Day from the entire Tech Titans association. Thank you for guiding us to Create, Code, and Conquer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DEPARTMENT SECTION */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>About Our Department</h2>
              <div className="h-1 w-20 bg-brand-blue rounded-full"></div>
              <p className="leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
                We foster a culture of continuous learning and technological advancement. Our department focuses on building strong fundamentals while encouraging students to explore emerging technologies through hands-on projects, research, and active participation in technical communities.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {[
                  { value: '500+', label: 'Students' },
                  { value: '5', label: 'Clubs' },
                  { value: '50+', label: 'Events' },
                  { value: '100+', label: 'Activities' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-cyan-400 mb-2">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="grid grid-cols-2 gap-4"
            >
              <GlassCard className="p-6 aspect-square flex flex-col justify-center items-center text-center">
                <Target className="text-brand-red mb-4" size={32} />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Our Vision</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>To be a center of excellence in information technology education and innovation.</p>
              </GlassCard>
              <GlassCard className="p-6 aspect-square flex flex-col justify-center items-center text-center translate-y-8">
                <Lightbulb className="text-brand-gold mb-4" size={32} />
                <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Our Mission</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Empowering minds with technical skills and ethical values.</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-24 relative border-y" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>What We Offer</h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Discover the opportunities and resources available to you as a member of our department.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Academic Support', desc: 'Get help with your subjects, assignments, and exam preparations.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Turn your ideas into reality with our project support and mentorship.' },
              { icon: Calendar, title: 'Technical Events', desc: 'Participate in workshops, hackathons, and guest lectures.' },
              { icon: Users, title: 'Student Community', desc: 'Connect with peers, alumni, and industry professionals.' },
              { icon: Target, title: 'Leadership', desc: 'Develop your soft skills and leadership qualities through clubs.' },
              { icon: Code, title: 'Coding & Technology', desc: 'Enhance your programming skills with competitive coding sessions.' },
            ].map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard hoverEffect className="p-8 h-full group">
                  <div className="w-12 h-12 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <offer.icon className="text-brand-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{offer.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{offer.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT VOICE */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="p-12 rounded-3xl relative overflow-hidden border" style={{ background: `linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))`, borderColor: 'var(--border-color)' }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px]"></div>
            
            <h2 className="text-3xl font-bold mb-6 relative z-10" style={{ color: 'var(--text-primary)' }}>Your Voice Matters</h2>
            <p className="text-lg mb-8 relative z-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a doubt about a subject, feedback for an event, or a brilliant idea to improve our association—we want to hear it.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/feedback" className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                Share Feedback <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
