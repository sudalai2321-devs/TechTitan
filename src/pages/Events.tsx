import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

const events: any[] = [];

export const Events = () => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Tech Titans Events</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Discover and register for upcoming technical events, workshops, and hackathons.</p>
      </div>

      {events.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlassCard className="p-16 text-center max-w-2xl mx-auto">
            <Calendar size={48} className="mx-auto mb-6 text-brand-blue" />
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>No Events Yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Stay tuned! Upcoming events, workshops, and hackathons will be announced here.
            </p>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: any, index: number) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard hoverEffect className="flex flex-col h-full overflow-hidden group">
                <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md text-white" 
                       style={{ backgroundColor: event.status === 'Upcoming' ? 'rgba(0,151,255,0.6)' : 'rgba(107,114,128,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {event.status}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                  <p className="text-brand-blue text-sm mb-4">By {event.organizer}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Calendar size={16} /> <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Clock size={16} /> <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin size={16} /> <span>{event.venue}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-6 flex-grow line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {event.description}
                  </p>
                  
                  <button 
                    disabled={event.status === 'Completed'}
                    className="w-full py-2.5 rounded-lg border border-brand-blue text-brand-blue font-medium hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-50 disabled:border-gray-500 disabled:text-gray-400 disabled:hover:bg-transparent flex justify-center items-center gap-2"
                  >
                    {event.status === 'Completed' ? 'Registration Closed' : 'Register Now'}
                    {event.status === 'Upcoming' && <ExternalLink size={16} />}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
