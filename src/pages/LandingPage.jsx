import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiLock,
  FiActivity,
  FiDatabase,
  FiArrowRight,
  FiLayers,
  FiCpu,
  FiCheckCircle,
  FiHardDrive
} from 'react-icons/fi';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 z-50 flex items-center justify-between px-6 lg:px-16">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
            <FiShield className="w-5.5 h-5.5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            CipherVault
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {isAuthenticated ? "Go to Dashboard" : "Sign In"}
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-36 pb-20 px-6 lg:px-16 flex flex-col items-center justify-center text-center min-h-[90vh]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] bg-accent/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-6 z-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary dark:text-primary-light border border-primary/20 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            <FiLock className="w-3.5 h-3.5" /> Enterprise-Grade Text Cryptography
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] font-sans"
          >
            Encrypt • Decrypt • Analyze <br className="hidden md:inline"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              Securely and Instantly
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            A modern SaaS platform designed to manage text encryption, perform character frequency analysis, and safely track secure transaction logs with premium dashboard widgets.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-base hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center"
            >
              Explore Features
            </a>
          </motion.div>
        </motion.div>

        {/* Hero Image Mockup (Glassmorphism layout preview) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 w-full max-w-5xl glass-panel p-3 rounded-2xl border border-white/20 shadow-2xl relative"
        >
          <div className="bg-slate-950 rounded-xl overflow-hidden aspect-[16/9] flex items-center justify-center border border-slate-800 relative shadow-inner">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            {/* Visual SaaS Mockup */}
            <div className="p-8 w-full h-full flex flex-col justify-between text-left">
              <div className="flex justify-between items-center mt-6">
                <div className="space-y-2">
                  <div className="h-6 w-36 bg-slate-800 rounded animate-pulse" />
                  <div className="h-3.5 w-60 bg-slate-800 rounded animate-pulse" />
                </div>
                <div className="h-10 w-24 bg-primary/20 border border-primary/40 rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-6 my-auto">
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"><FiLock className="text-primary"/></div>
                  <div className="h-4 w-20 bg-slate-800 rounded" />
                  <div className="h-3 w-32 bg-slate-800 rounded" />
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center"><FiActivity className="text-secondary"/></div>
                  <div className="h-4 w-20 bg-slate-800 rounded" />
                  <div className="h-3 w-32 bg-slate-800 rounded" />
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center"><FiDatabase className="text-accent"/></div>
                  <div className="h-4 w-20 bg-slate-800 rounded" />
                  <div className="h-3 w-32 bg-slate-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 lg:px-16 border-t border-slate-200 dark:border-slate-900 bg-white/20 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-semibold text-primary dark:text-primary-light uppercase tracking-wider">
              High Performance Cryptography
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Packed with powerful tools for secure text handling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                <FiLock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Cipher Suite</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Encrypt and decrypt using industry-classic algorithms: Caesar Cipher (with custom shifts), ROT13, and Reverse Ciphers.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center border border-secondary/20 mb-6 group-hover:scale-110 transition-transform">
                <FiActivity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Frequency Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Instantly check character distributions. View automated letter tables, chart plots, and find the most repeated characters.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center border border-accent/20 mb-6 group-hover:scale-110 transition-transform">
                <FiDatabase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Secure Vault Log</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Store encryption events securely in a database. Easily search, filter, and delete past actions or export reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24 px-6 lg:px-16 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-sm font-semibold text-secondary dark:text-secondary-light uppercase tracking-wider">
              Safety & Productivity First
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Designed to look, feel, and function like premium software
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1"><FiCheckCircle className="text-emerald-500 w-5.5 h-5.5" /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Zero Data Exposure</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Secure hash algorithms prevent token interception or database tampering.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1"><FiCheckCircle className="text-emerald-500 w-5.5 h-5.5" /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">PDF & Text Exports</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Export all your transaction results or entire logs instantly as a PDF or text file.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1"><FiCheckCircle className="text-emerald-500 w-5.5 h-5.5" /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Interactive Charting</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Rich graphical layouts using Chart.js render character distribution clearly.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-center space-y-2 border-l-4 border-primary shadow-sm">
              <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">100%</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Client Privacy</p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-center space-y-2 border-l-4 border-secondary shadow-sm">
              <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">Instant</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Frequency Plots</p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-center space-y-2 border-l-4 border-accent shadow-sm">
              <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">3 Types</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Cipher Algorithms</p>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-center space-y-2 border-l-4 border-emerald-500 shadow-sm">
              <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white">Cloud</h4>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">MongoDB Atlas Sync</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECHNOLOGIES SECTION --- */}
      <section className="py-24 px-6 lg:px-16 border-t border-slate-200 dark:border-slate-900 bg-white/20 dark:bg-slate-950/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-sm font-semibold text-accent dark:text-accent-light uppercase tracking-wider mb-4">
            Advanced Tech Stack
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mb-12">
            Built using modern, professional libraries
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {['React.js', 'Tailwind CSS', 'Framer Motion', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Auth'].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-2xl glass-card text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:border-primary/40 hover:scale-105 transition-all">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-24 px-6 lg:px-16 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-semibold text-primary dark:text-primary-light uppercase tracking-wider">
              Step-by-Step Security
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Three simple steps to manage your ciphertexts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-xl relative">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Account</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
                Register a user account to sync your credentials and unlock safe, persistent history logs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Perform Cryptography</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
                Input your text, choose a cipher, set a custom shift key, and trigger instant, encrypted outputs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center text-accent font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Analyze & Download</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
                Run letter frequency counts to plot occurrence percentages and download files as TXT or PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-900 bg-slate-100 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 text-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
              <FiShield className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold text-slate-800 dark:text-white text-sm">CipherVault</span>
          </div>
          <p className="text-xs">
            © {new Date().getFullYear()} CipherVault Security Suite. Built for placements, portfolios, and showcases.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
