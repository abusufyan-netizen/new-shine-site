import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Tag, TrendingUp, LogOut, Bell } from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const navItems = [
    { id: 'orders', label: 'Live Orders', icon: <Package size={20} /> },
    { id: 'inventory', label: 'Price Manager', icon: <Tag size={20} /> },
    { id: 'analytics', label: 'Business Stats', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-surface transition-colors duration-500">
      
      {/* 1. Permanent Sidebar */}
      <aside className="w-72 border-r border-border p-8 hidden lg:flex flex-col bg-surface z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary p-2.5 rounded-2xl text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="text-2xl font-black text-text tracking-tighter">SHINE <span className="text-primary italic">HUB</span></h2>
        </div>
        
        <nav className="space-y-3 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black transition-all group ${
                activeTab === item.id 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]' 
                : 'text-text-muted hover:bg-surface-soft hover:text-text'
              }`}
            >
              <span className={`${activeTab === item.id ? 'text-white' : 'text-primary'} transition-colors`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Support Card */}
        <div className="bg-surface-soft border border-border p-5 rounded-[2rem] mb-6">
          <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Cloud Connected
          </div>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-4 p-4 rounded-2xl font-black text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-20 border-b border-border bg-surface/50 backdrop-blur-md px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-text-muted uppercase tracking-widest">Lahore</span>
            <span className="text-xs text-border">/</span>
            <span className="text-xs font-black text-primary uppercase tracking-widest">Babu Mehar Town Branch</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="p-2.5 rounded-xl bg-surface-soft border border-border text-text relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
             </button>
             <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary">
                A
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;