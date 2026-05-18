import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Shield, Users, Briefcase, ArrowRight, Sparkles, Zap, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
  { id: 'employee', label: 'Employee', icon: <Users size={24} />, desc: 'Manage your personal goals and track performance.' },
  { id: 'manager', label: 'Manager', icon: <Briefcase size={24} />, desc: 'Review team goals and provide coaching feedback.' },
  { id: 'admin', label: 'Admin', icon: <Shield size={24} />, desc: 'Oversee organizational metrics and system settings.' },
];

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('employee');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('role', selectedRole);
    if (selectedRole === 'admin') navigate('/admin');
    else if (selectedRole === 'manager') navigate('/manager');
    else navigate('/employee');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-x-hidden text-slate-200">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-white text-2xl font-black tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center backdrop-blur-md">
            <Target className="text-indigo-400" size={24} strokeWidth={3} />
          </div>
          Tracklytics OS
        </div>
        <div className="text-sm font-bold tracking-widest uppercase text-slate-500">
          AtomQuest 2026 Hackathon
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-10 pb-24">
        
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col lg:flex-row items-center gap-16 py-10">
          
          {/* Left: Value Prop */}
          <div className="flex-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-bold tracking-wide uppercase"
            >
              <Sparkles size={16} /> Next-Gen Performance Management
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-6xl lg:text-7xl font-black text-white leading-[1.1]"
            >
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Goal Intelligence</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-slate-400 text-xl font-medium leading-relaxed max-w-xl"
            >
              Align individual objectives with company-wide KPIs. The enterprise-grade goal management platform designed for the modern, AI-driven workforce.
            </motion.p>
          </div>

          {/* Right: Login Gateway */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="w-full max-w-md"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 shadow-2xl shadow-indigo-900/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white">Enter Workspace</h2>
                <p className="text-slate-400 mt-2 font-medium">Select your role to access the platform</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 group",
                        selectedRole === role.id 
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 scale-[1.02]' 
                          : 'border-white/5 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10'
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={selectedRole === role.id}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="sr-only"
                      />
                      <div className={cn(
                        "p-3 rounded-xl shrink-0 transition-colors",
                        selectedRole === role.id ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-indigo-400'
                      )}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <div className={cn("font-black text-lg", selectedRole === role.id ? 'text-indigo-100' : 'text-slate-200')}>{role.label}</div>
                        <div className="text-[13px] font-medium leading-relaxed mt-1 text-slate-400">{role.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black py-5 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 text-lg group"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
              </form>
            </div>
          </motion.div>
        </section>

        {/* UNIQUE SELLING POINTS */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-3">Why Tracklytics OS?</h3>
            <h2 className="text-4xl md:text-5xl font-black text-white">Built for the future of work.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 text-indigo-400">
                <Sparkles size={28} strokeWidth={2.5} />
              </div>
              <h4 className="text-2xl font-black text-white mb-3">AI-Powered Workflows</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                Integrated generative AI assists employees in drafting perfect SMART goals and provides managers with real-time, actionable coaching feedback.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                <Layers size={28} strokeWidth={2.5} />
              </div>
              <h4 className="text-2xl font-black text-white mb-3">Glassmorphic UI</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                A stunning, high-fidelity enterprise interface built with TailwindCSS and Framer Motion, ensuring users enjoy interacting with their goals.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-md">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-400">
                <Zap size={28} strokeWidth={2.5} />
              </div>
              <h4 className="text-2xl font-black text-white mb-3">Frictionless RBAC</h4>
              <p className="text-slate-400 font-medium leading-relaxed">
                Seamless role-based access control instantly routes Employees, Managers, and Admins to customized, data-rich analytical workspaces.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SYSTEM ARCHITECTURE */}
        <section className="py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">Under the Hood</h3>
            <h2 className="text-4xl md:text-5xl font-black text-white">System Architecture</h2>
            <p className="text-slate-400 mt-4 font-medium max-w-2xl mx-auto">
              A decoupled, high-performance tech stack designed for scalability and lightning-fast interactions.
            </p>
          </div>

          <div className="bg-white border border-white/10 rounded-[40px] p-2 md:p-4 relative overflow-hidden shadow-2xl shadow-indigo-500/20 max-w-5xl mx-auto flex items-center justify-center">
            <img 
              src="/Arch.jfif" 
              alt="Tracklytics OS System Architecture Diagram" 
              className="w-full object-contain rounded-[32px]"
            />
          </div>
        </section>

      </main>
    </div>
  );
}
