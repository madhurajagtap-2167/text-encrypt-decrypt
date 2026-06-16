import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import {
  FiGrid,
  FiShield,
  FiBarChart2,
  FiClock,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronRight
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Encrypt/Decrypt', path: '/cipher', icon: FiShield },
    { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
    { name: 'History', path: '/history', icon: FiClock },
    { name: 'Profile', path: '/profile', icon: FiUser },
    { name: 'Settings', path: '/settings', icon: FiSettings }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    return currentItem ? currentItem.name : 'CipherVault';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-200">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-72 bg-white/70 dark:bg-slate-900/70 border-r border-slate-200 dark:border-slate-800 backdrop-blur-md sticky top-0 h-screen z-20">
        
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
            <FiShield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              CipherVault
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Security Suite
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border-l-4 border-primary shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-primary dark:text-primary-light' : 'text-slate-400 dark:text-slate-500'
                  }`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <FiChevronRight className="w-4 h-4 text-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 mb-3 bg-slate-100/50 dark:bg-slate-800/40 rounded-xl border border-slate-200/40 dark:border-slate-800/40">
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
              alt="Avatar"
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-primary/20"
            />
            <div className="truncate">
              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER (ANIMATED) --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            />

            {/* Sidebar drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                      <FiShield className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      CipherVault
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary dark:text-primary-light border-l-4 border-primary'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div>
                <div className="flex items-center gap-3 p-2 mb-3 bg-slate-100 dark:bg-slate-800/40 rounded-xl">
                  <img
                    src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                    alt="Avatar"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="sticky top-0 bg-white/40 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md h-20 flex items-center justify-between px-6 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 lg:hidden focus:outline-none"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {/* Quick profile info */}
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                alt="Profile"
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/10"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {user?.name?.split(' ')[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;
