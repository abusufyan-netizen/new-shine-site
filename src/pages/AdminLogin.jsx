import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) navigate('/admin-portal-99');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data?.session) {
        localStorage.setItem('admin_token', data.session.access_token);
        // Add a small delay for a smoother transition feel
        setTimeout(() => navigate('/admin-portal-99'), 500);
      }
    } catch (err) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Access Denied: Incorrect credentials for New Shine Admin.' 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 font-bold transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </Link>

        <div className="bg-card border border-border p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[2rem] text-primary mb-6 shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl font-black text-text tracking-tighter">
              Admin <span className="text-primary italic">Hub</span>
            </h1>
            <p className="text-text-muted mt-2 font-medium italic">Secure entry for New Shine Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-muted ml-2 tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  required
                  className="w-full bg-surface border border-border p-4 pl-14 rounded-2xl text-text font-bold outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-text-muted/30"
                  placeholder="admin@newshine.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-muted ml-2 tracking-widest">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  required
                  className="w-full bg-surface border border-border p-4 pl-14 rounded-2xl text-text font-bold outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-text-muted/30"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs rounded-2xl text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 group active:scale-95"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;