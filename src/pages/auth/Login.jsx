import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Shield, Users, Briefcase } from 'lucide-react';

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
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* Left Panel - Animated Illustration */}
      <div className="hidden lg:flex w-1/2 bg-slate-950 p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated Background Gradients */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl"
        />

        <div className="z-10">
          <div className="flex items-center gap-3 text-white text-2xl font-bold">
            <Target className="text-primary" size={32} />
            Tracklytics OS
          </div>
        </div>

        <div className="z-10 max-w-md">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white leading-tight mb-6"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Goal Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Align individual objectives with company-wide KPIs. The enterprise-grade goal management platform designed for the modern workforce.
          </motion.p>
        </div>

        <div className="z-10 text-slate-500 text-sm">
          &copy; 2026 AtomQuest Hackathon Team
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-slate-500 mt-2">Select your role to access the workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 mt-8">
            <div className="space-y-4">
              {roles.map((role, index) => (
                <motion.div 
                  key={role.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <label
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedRole === role.id 
                        ? 'border-primary bg-primary/5 dark:bg-primary/10' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      checked={selectedRole === role.id}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`p-2 rounded-lg ${selectedRole === role.id ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {role.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{role.label}</div>
                      <div className="text-sm text-slate-500 mt-1">{role.desc}</div>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-primary/20"
            >
              Sign In to Workspace
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
