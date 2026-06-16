import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../services/api.js';
import toast from 'react-hot-toast';
import { ProfileSkeleton } from '../components/LoadingSkeleton.jsx';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiImage,
  FiCalendar,
  FiDatabase,
  FiRefreshCw,
  FiCheckCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  
  const [profileStats, setProfileStats] = useState({
    totalEncryptions: 0,
    totalDecryptions: 0
  });
  const [loading, setLoading] = useState(true);

  // Profile forms
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  
  // Password change forms
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // GET /auth/profile returns refreshed user profile with total counts
        const res = await api.get('/auth/profile');
        if (res.data.success) {
          setProfileStats({
            totalEncryptions: res.data.user.totalEncryptions || 0,
            totalDecryptions: res.data.user.totalDecryptions || 0
          });
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setAvatar(res.data.user.avatar);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error('Name and Email cannot be empty.');
      return;
    }

    try {
      setIsUpdatingProfile(true);
      await updateProfile({ name, email, avatar });
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setIsUpdatingPassword(true);
      await updateProfile({ name, email, avatar, password });
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Profile summary card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-1 glass-card p-6 lg:p-8 rounded-3xl text-center flex flex-col justify-between shadow-sm relative overflow-hidden h-fit"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col items-center space-y-4">
          <img
            src={avatar || 'https://ui-avatars.com/api/?name=User'}
            alt="Avatar"
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/20 shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 my-6 border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Encryptions</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{profileStats.totalEncryptions}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Decryptions</span>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{profileStats.totalDecryptions}</p>
          </div>
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <FiCalendar className="text-slate-400" />
            <span>Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' }) : 'Recently'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <FiDatabase className="text-slate-400" />
            <span>Sync: Connected to Mongo Atlas</span>
          </div>
        </div>

      </motion.div>

      {/* Profile Form / Password reset */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Profile edit card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 lg:p-8 rounded-3xl shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Profile Settings</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Avatar URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                Avatar Image URL
              </label>
              <div className="relative">
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isUpdatingProfile ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin"/>
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-4 h-4"/>
                  <span>Save Profile Changes</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Change password card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 lg:p-8 rounded-3xl shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Security & Password</h3>
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                  >
                    {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  Confirm New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  <input
                    type={showConfPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-primary dark:focus:border-primary-light text-sm text-slate-700 dark:text-slate-200 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfPass(!showConfPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
                  >
                    {showConfPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isUpdatingPassword ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin"/>
                  <span>Resetting Password...</span>
                </>
              ) : (
                <>
                  <FiLock className="w-4 h-4"/>
                  <span>Reset Password</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

      </div>

    </div>
  );
};

export default ProfilePage;
