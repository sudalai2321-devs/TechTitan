import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Share2, Monitor } from 'lucide-react';
import logoImg from '../../assets/logo';

export const Footer = () => {
  return (
    <footer className="relative z-10 pt-16 pb-8 border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_10px_var(--shadow-glow)] bg-white overflow-hidden border border-brand-blue/30">
                <img src={logoImg} alt="Tech Titans Logo" className="w-full h-full object-cover scale-105" />
              </div>
              <h2 className="text-lg font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>TECH TITANS</h2>
            </div>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Empowering students to explore technology, collaborate, innovate, and lead. The official student portal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/10 transition-all" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
                <Monitor size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-brand-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>Home</Link></li>
              <li><Link to="/association" className="text-sm hover:text-brand-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>Association</Link></li>
              <li><Link to="/events" className="text-sm hover:text-brand-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>Events</Link></li>
              <li><Link to="/queries" className="text-sm hover:text-brand-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>Queries</Link></li>
              <li><Link to="/feedback" className="text-sm hover:text-brand-blue transition-colors" style={{ color: 'var(--text-secondary)' }}>Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Association</h3>
            <ul className="space-y-3">
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>President: Vishwa</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>Vice President: Swetha</li>
              <li className="text-sm" style={{ color: 'var(--text-secondary)' }}>Security: Ashika</li>
              <li><Link to="/association" className="text-brand-blue hover:text-blue-400 transition-colors text-sm mt-2 inline-block">View all leadership &rarr;</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={16} className="text-brand-blue shrink-0 mt-0.5" />
                <span>contact@techtitans.edu</span>
              </li>
              <li className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Department of Information Technology<br/>
                Engineering Block, 3rd Floor
              </li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm text-center md:text-left" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} TECH TITANS. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            <span>Create</span> <span className="text-brand-blue">•</span> <span>Code</span> <span className="text-brand-red">•</span> <span>Conquer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
