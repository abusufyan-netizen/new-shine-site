import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

// 1. Scroll Restoration Fix
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 2. Enhanced Admin Route Guard
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  
  // Optional: You could also verify token expiry here
  if (!token) {
    return <Navigate to="/admin-login" state={{ from: window.location.pathname }} replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Helper to reset scroll on route change */}
        <ScrollToTop />
        
        <div className="flex flex-col min-h-screen bg-surface transition-colors duration-500 selection:bg-primary/30">
          
          {/* Global Navigation */}
          <Navbar />
          
          <main className="flex-grow pt-16 md:pt-20">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* Private Admin Route */}
              <Route 
                path="/admin-portal-99" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />

              {/* Catch-all Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Branding & Contact */}
          <Footer />
          <FloatingWhatsApp />
          
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;