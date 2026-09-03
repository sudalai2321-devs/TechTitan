import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Users, Shield, Target, Code, Cpu, Database, Cloud } from 'lucide-react';
import logoImg from '../assets/logo';

const leaders = [
  { name: 'Vishwa', role: 'President', description: 'Leading the Tech Titans with a vision for innovation and excellence.' },
  { name: 'Swetha', role: 'Vice President', description: 'Coordinating association activities and empowering student initiatives.' },
  { name: 'Ashika', role: 'Security', description: 'Ensuring smooth operations and maintaining association integrity.' },
];

const clubs = [
  { name: 'Club 01', icon: Code, desc: 'Focuses on modern web technologies, UI/UX, and full-stack development.', lead: 'Club Lead' },
  { name: 'Club 02', icon: Cpu, desc: 'Exploring machine learning algorithms, neural networks, and data science.', lead: 'Club Lead' },
  { name: 'Club 03', icon: Shield, desc: 'Learning ethical hacking, network security, and cryptography.', lead: 'Club Lead' },
  { name: 'Club 04', icon: Cloud, desc: 'Mastering AWS, Azure, GCP, and DevOps practices.', lead: 'Club Lead' },
  { name: 'Club 05', icon: Database, desc: 'Enhancing algorithmic thinking and data structure problem solving.', lead: 'Club Lead' },
];

export const Association = () => {
  return (
    <div className="pt-24 pb-20">
      
      {/* HERO */}
      <section className="text-center mb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
           <div className="w-36 h-36 mx-auto rounded-full flex items-center justify-center border-4 border-brand-blue/40 shadow-[0_0_40px_var(--shadow-glow)] mb-8 bg-white overflow-hidden animate-glow-pulse">
            <img src={logoImg} alt="Tech Titans Logo" className="w-full h-full object-cover scale-105" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase" style={{ color: 'var(--text-primary)' }}>Tech Titans</h1>
          <p className="text-xl text-brand-blue tracking-[0.3em] font-medium uppercase">Create • Code • Conquer</p>
          <p className="text-lg max-w-2xl mx-auto mt-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Tech Titans is the official student association dedicated to fostering a community of passionate learners, developers, and leaders. We organize events, workshops, and manage technical clubs to help students achieve their highest potential.
          </p>
        </motion.div>
      </section>

      {/* PRESIDENT MESSAGE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <GlassCard className="p-8 md:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px]"></div>
           <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center" style={{ background: 'var(--bg-secondary)', border: '2px solid var(--border-color)' }}>
                <Users size={64} style={{ color: 'var(--text-muted)' }} />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>President's Message</h2>
                <div className="h-1 w-16 bg-brand-blue rounded-full mb-6"></div>
                <p className="italic text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  "Welcome to Tech Titans! Our goal is to create an environment where every student has the resources, mentorship, and opportunities to excel in the world of technology. Together, we will push boundaries, innovate, and build solutions that matter. Let's make this academic year our most successful one yet."
                </p>
                <p className="font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>Vishwa</p>
                <p className="text-brand-blue text-sm">President, Tech Titans</p>
              </div>
           </div>
        </GlassCard>
      </section>

      {/* LEADERSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Association Leadership</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The dedicated team behind Tech Titans.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard hoverEffect className="p-6 text-center group">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-brand-blue/30 mb-6 group-hover:border-brand-blue transition-colors overflow-hidden flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                  <Users size={40} style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{leader.name}</h3>
                <p className="text-brand-blue text-sm font-medium mb-4">{leader.role}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{leader.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Clubs</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Join a club to dive deep into specific technology domains.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, i) => (
             <motion.div
              key={club.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard hoverEffect className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    <club.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{club.name}</h3>
                </div>
                <p className="text-sm mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>{club.desc}</p>
                
                <div className="pt-4 flex items-center justify-between mt-auto" style={{ borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <p className="text-xs uppercase" style={{ color: 'var(--text-muted)' }}>Club Lead</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{club.lead}</p>
                  </div>
                  <button className="text-sm text-brand-blue hover:text-blue-400 font-medium">View &rarr;</button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};
