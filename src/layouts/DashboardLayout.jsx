import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Target, CheckSquare, LogOut, Activity, MessageSquare, Share2, BarChart3, ClipboardList, Calendar, Search, Bell, Users, User, Moon, Sun, Lock, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = {
  employee: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/employee' },
    { label: 'My Goals', icon: <Target size={20} />, path: '/employee/goals/new' },
    { label: 'Quarterly Check-in', icon: <Calendar size={20} />, path: '/employee/checkin' },
    { label: 'Shared KPIs', icon: <Share2 size={20} />, path: '/employee/shared-goals' },
    { label: 'My Reports', icon: <BarChart3 size={20} />, path: '/employee/reports' },
  ],
  manager: [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/manager/overview' },
    { label: 'Approvals', icon: <CheckSquare size={20} />, path: '/manager/approvals' },
    { label: 'Team Check-ins', icon: <Calendar size={20} />, path: '/manager/check-ins' },
    { label: 'Shared KPIs', icon: <Share2 size={20} />, path: '/manager/shared-goals' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/manager/analytics' },
  ],
  admin: [
    { label: 'Org Dashboard', icon: <Activity size={20} />, path: '/admin' },
    { label: 'Approvals', icon: <CheckSquare size={20} />, path: '/admin/approvals' },
    { label: 'Shared KPIs', icon: <Share2 size={20} />, path: '/admin/shared-goals' },
    { label: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
    { label: 'Audit Trail', icon: <ClipboardList size={20} />, path: '/admin/audit' },
  ]
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  // Hardcoding a role for demonstration. In a real app, this comes from context/auth state.
  const role = localStorage.getItem('role') || 'employee';
  const items = navItems[role] || navItems.employee;

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [allGoals, setAllGoals] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [avatarImage, setAvatarImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch all goals and users for global search
    const fetchData = async () => {
      try {
        const [goalsRes, usersRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/goals'),
          fetch('http://127.0.0.1:8000/api/users')
        ]);
        const goalsData = await goalsRes.json();
        const usersData = await usersRes.json();
        if (goalsData.status === 'success') setAllGoals(goalsData.data);
        if (usersData.status === 'success') setAllUsers(usersData.data);
      } catch (err) {
        console.error('Failed to fetch data for search', err);
      }
    };
    fetchData();

    // Fetch notifications (Mock logic for recent comments)
    const fetchComments = async () => {
      try {
        const userId = role === 'employee' ? 'U301' : 'U301'; // Mocking checking U301's thread
        const res = await fetch(`http://127.0.0.1:8000/api/comments/user/${userId}`);
        const data = await res.json();
        if (data.status === 'success') {
          const recent = data.data.filter(c => role === 'employee' ? c.role === 'MANAGER' : c.role === 'EMPLOYEE');
          if (recent.length > 0) {
            setNotifications(recent.reverse().slice(0, 3)); // Top 3 recent comments from the other party
          }
        }
      } catch(err) {
        console.error('Failed to fetch comments', err);
      }
    };
    fetchComments();
  }, [role]);

  const searchResults = searchQuery.trim().length > 1 ? (() => {
    const q = searchQuery.toLowerCase();
    const matchedGoals = allGoals.filter(g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)).slice(0, 3);
    const matchedUsers = allUsers.filter(u => u.name.toLowerCase().includes(q) || u.title.toLowerCase().includes(q)).slice(0, 2);
    return [...matchedGoals.map(g => ({...g, type: 'goal'})), ...matchedUsers.map(u => ({...u, type: 'user'}))];
  })() : [];

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-slate-950 overflow-hidden font-sans transition-colors duration-200">
      
      {/* Decorative Global Background */}
      <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-cyan-50 dark:bg-cyan-900/10 blur-[100px]" />
      </div>

      {/* Sidebar */}
      <aside className="w-[280px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col border-r border-slate-200/50 dark:border-slate-800/50 z-20 shadow-xl shadow-slate-200/20 relative transition-colors duration-200">
        <div className="p-8 pb-6 border-b border-slate-100/50 dark:border-slate-800/50 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Target className="text-white w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
              Tracklytics
            </h1>
            <p className="text-[9px] font-extrabold text-indigo-500 dark:text-indigo-400 tracking-[0.15em] mt-1.5 uppercase">
              PERFORMANCE OS
            </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-8">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-4">
            {role} WORKSPACE
          </p>
          <nav className="space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-[14px] ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-900/40 dark:to-slate-800/40 text-indigo-700 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-800' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={cn("transition-colors duration-300", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")}>
                      {item.icon}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-6 border-t border-slate-100/50 dark:border-slate-800/50 flex items-center justify-between mt-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center ring-2 ring-white dark:ring-slate-700 shadow-sm flex items-center justify-center text-slate-400"
              style={{ backgroundImage: avatarImage ? `url(${avatarImage})` : 'none' }}
            >
              {!avatarImage && <User size={20} />}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">{role === 'employee' ? 'Aanya Mehta' : role === 'manager' ? 'Devon Park' : 'Priya Raman'}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{role === 'employee' ? 'Senior Product Desi...' : role === 'manager' ? 'Director of Design' : 'VP of People Ops'}</span>
            </div>
          </div>
          <button 
            className="text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
            onClick={() => {
              localStorage.removeItem('role');
              navigate('/login');
            }}
          >
            <LogOut size={18} strokeWidth={2.5} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 transition-colors duration-200">
        {/* Top Header */}
        <header className="h-[88px] border-b border-slate-200/50 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl px-10 flex items-center justify-between shrink-0 transition-colors duration-200 z-30 relative">
          <div className="flex-1 max-w-xl relative">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search goals, people, KPIs..." 
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 dark:focus:border-indigo-400 transition-all shadow-sm"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-bold text-slate-400 dark:text-slate-400 shadow-sm">⌘</kbd>
                <kbd className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-[10px] font-bold text-slate-400 dark:text-slate-400 shadow-sm">K</kbd>
              </div>
            </div>

            {/* Search Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl z-50 overflow-hidden"
                >
                  {searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((res, i) => (
                        <div key={i} className="px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-0 flex items-center gap-4 transition-colors duration-200">
                          {res.type === 'goal' ? (
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0"><Target size={18} /></div>
                          ) : (
                            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"><Users size={18} /></div>
                          )}
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white text-sm truncate">{res.type === 'goal' ? res.title : res.name}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs truncate font-medium mt-0.5">{res.type === 'goal' ? res.description : res.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">No results found for "{searchQuery}"</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-6 ml-8">
            <div className="flex items-center gap-3 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 px-4 py-2 rounded-xl shadow-sm transition-colors duration-200">
              <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">Demo role</span>
              <span className="text-sm font-extrabold text-slate-900 dark:text-white capitalize">{role}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm relative"
              >
                <Bell size={18} strokeWidth={2.5} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                      <h4 className="font-extrabold text-slate-900 dark:text-white">Notifications</h4>
                      {notifications.length > 0 && <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-full">{notifications.length} new</span>}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notif, i) => (
                          <div key={i} className="px-5 py-5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-0 transition-colors duration-200" onClick={() => { setShowNotifications(false); navigate(role === 'employee' ? '/employee/checkin' : '/manager/approvals'); }}>
                            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold mb-1.5 flex items-center gap-1.5"><MessageSquare size={12} /> {notif.author_name}</p>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">{notif.text}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-bold uppercase tracking-wider">{new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        ))
                      ) : (
                        <div className="px-5 py-10 text-center text-slate-500 dark:text-slate-400 text-sm font-medium">You're all caught up!</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 p-1.5 pr-5 rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer"
              >
                <div 
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center flex items-center justify-center text-slate-400 shadow-inner"
                  style={{ backgroundImage: avatarImage ? `url(${avatarImage})` : 'none' }}
                >
                  {!avatarImage && <User size={16} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">{role === 'employee' ? 'Aanya' : role === 'manager' ? 'Devon' : 'Priya'}</span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest leading-none">{role}</span>
                </div>
              </div>

              <AnimatePresence>
                {showProfile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-lg mb-6">My Profile</h4>
                      
                      <div className="flex items-center gap-5 mb-6">
                        <div 
                          className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 bg-cover bg-center flex items-center justify-center text-slate-400 shrink-0 relative overflow-hidden group shadow-inner"
                          style={{ backgroundImage: avatarImage ? `url(${avatarImage})` : 'none' }}
                        >
                          {!avatarImage && <User size={28} />}
                          <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <Camera size={16} className="mb-1" />
                            <span className="text-[9px] font-bold">UPLOAD</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                          </label>
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white text-sm">Profile Photo</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Upload a new picture</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Lock size={12} /> NAME</label>
                          <input type="text" readOnly value={role === 'employee' ? 'Aanya Mehta' : role === 'manager' ? 'Devon Park' : 'Priya Raman'} className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Lock size={12} /> TITLE</label>
                          <input type="text" readOnly value={role === 'employee' ? 'Sr. Product Designer' : role === 'manager' ? 'Design Director' : 'VP of People Ops'} className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none" />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Lock size={12} /> DEPARTMENT</label>
                          <input type="text" readOnly value={role === 'admin' ? 'People Ops' : 'Design'} className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none" />
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-5 font-bold text-center uppercase tracking-widest">Details managed by HR</p>
                    </div>
                    
                    <div className="p-2">
                      <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-sm">
                          {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                          Appearance
                        </div>
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {isDarkMode ? 'Dark' : 'Light'}
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>
        
        {/* Added center alignment wrapper with w-full to prevent strange shifting */}
        <div className="flex-1 overflow-auto p-10 pb-24 w-full flex flex-col items-center relative z-10">
          <div className="w-full max-w-[1400px]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
