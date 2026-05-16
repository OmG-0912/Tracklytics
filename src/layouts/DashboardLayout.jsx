import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, CheckSquare, LogOut, Activity, MessageSquare, Share2, BarChart3, ClipboardList, Calendar, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white flex flex-col border-r border-slate-200 z-20 shadow-sm relative">
        <div className="p-8 pb-6 border-b border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
            <Target className="text-white w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
              Tracklytics
            </h1>
            <p className="text-[9px] font-extrabold text-slate-500 tracking-[0.15em] mt-1.5 uppercase">
              PERFORMANCE OS
            </p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
            {role} WORKSPACE
          </p>
          <nav className="space-y-1.5">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold text-[15px] ${
                    isActive 
                      ? 'bg-slate-50 text-slate-900 shadow-sm border border-slate-100' 
                      : 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-900 border border-transparent'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-6 border-t border-slate-100 flex items-center justify-between mt-auto bg-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-cover bg-center ring-2 ring-slate-100" style={{ backgroundImage: role === 'employee' ? "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" : role === 'manager' ? "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" : "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" }}></div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900">{role === 'employee' ? 'Aanya Mehta' : role === 'manager' ? 'Devon Park' : 'Priya Raman'}</span>
              <span className="text-xs text-slate-500 font-medium">{role === 'employee' ? 'Senior Product Desi...' : role === 'manager' ? 'Director of Design' : 'VP of People Ops'}</span>
            </div>
          </div>
          <button 
            className="text-slate-400 hover:text-indigo-600 p-2.5 rounded-xl hover:bg-indigo-50 transition-colors"
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
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Header */}
        <header className="h-[88px] border-b border-slate-100 bg-white px-8 flex items-center justify-between shrink-0">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search goals, people, KPIs..." 
                className="w-full pl-12 pr-12 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 shadow-sm">⌘</kbd>
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 shadow-sm">K</kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-5 ml-8">
            <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demo role</span>
              <span className="text-sm font-extrabold text-slate-900 capitalize">{role}</span>
            </div>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
              <Bell size={18} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: role === 'employee' ? "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" : role === 'manager' ? "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" : "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" }}></div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-900 leading-none">{role === 'employee' ? 'Aanya' : role === 'manager' ? 'Devon' : 'Priya'}</span>
                <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider leading-none">{role}</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-10 pb-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
