import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Target, CheckSquare, Settings, LogOut, Activity, MessageSquare, Share2, BarChart3, ClipboardList, Calendar } from 'lucide-react';
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
    { label: 'Org Overview', icon: <Activity size={20} />, path: '/admin' },
    { label: 'Shared KPIs', icon: <Share2 size={20} />, path: '/admin/shared-goals' },
    { label: 'Reporting', icon: <BarChart3 size={20} />, path: '/admin/reporting' },
    { label: 'Audit Trail', icon: <ClipboardList size={20} />, path: '/admin/audit' },
  ]
};

export default function DashboardLayout() {
  const navigate = useNavigate();
  // Hardcoding a role for demonstration. In a real app, this comes from context/auth state.
  const role = localStorage.getItem('role') || 'employee';
  const items = navItems[role] || navItems.employee;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <Target className="text-accent" />
            Goalkeeper OS
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-900 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80')" }}></div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Aanya Mehta</span>
              <span className="text-xs text-slate-400 truncate max-w-[120px]">Senior Product Designer</span>
            </div>
          </div>
          <button 
            className="text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
            onClick={() => {
              localStorage.removeItem('role');
              navigate('/login');
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-background">
        <header className="h-16 border-b bg-white dark:bg-card px-8 flex items-center justify-between shadow-sm z-10">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200 capitalize">
            {role} Workspace
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                {role.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium pr-2 capitalize">{role}</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
