import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, Building2, Users, Unlock, AlertCircle, Activity, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const deptData = [
  { name: 'Design', completion: 82 },
  { name: 'Engineering', completion: 76 },
  { name: 'Product', completion: 88 },
  { name: 'Sales', completion: 71 },
  { name: 'Marketing', completion: 79 },
  { name: 'People Ops', completion: 92 },
  { name: 'Finance', completion: 84 },
];

const heatmapData = [
  { dept: 'Design', weeks: [64, 72, 51, 84, 82, 49, 66, 49, 89, 80, 83, 74] },
  { dept: 'Eng', weeks: [56, 62, 48, 54, 54, 91, 61, 54, 83, 100, 97, 82] },
  { dept: 'Product', weeks: [88, 72, 83, 51, 81, 99, 65, 47, 69, 87, 60, 68] },
  { dept: 'Sales', weeks: [94, 66, 82, 49, 67, 85, 85, 89, 87, 62, 64, 73] },
  { dept: 'Marketing', weeks: [89, 67, 46, 44, 70, 57, 48, 90, 65, 66, 57, 70] },
  { dept: 'Ops', weeks: [66, 81, 73, 58, 72, 75, 47, 84, 47, 60, 100, 79] },
];

const getColor = (val) => {
  if (val >= 90) return 'text-emerald-500';
  if (val >= 70) return 'text-indigo-500';
  if (val >= 60) return 'text-amber-500';
  return 'text-rose-500';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl rounded-2xl p-4 font-bold text-slate-900 dark:text-white text-sm">
        {label} completion : <span className="text-indigo-600 dark:text-indigo-400">{payload[0].value}%</span>
      </div>
    );
  }
  return null;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  const [activeEmployees, setActiveEmployees] = useState(1284);
  const [goalsApproved, setGoalsApproved] = useState(3742);
  const [statusData, setStatusData] = useState([
    { name: 'Approved', value: 38, color: '#10b981' },
    { name: 'Rework Required', value: 6, color: '#f43f5e' },
    { name: 'Pending Approval', value: 14, color: '#f59e0b' }
  ]);
  const [statusPercentages, setStatusPercentages] = useState({
    'Approved': 38, 'Pending Approval': 14, 'Rework Required': 6
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, goalsRes] = await Promise.all([
          fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/users'),
          fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/goals')
        ]);
        
        const usersData = await usersRes.json();
        const goalsData = await goalsRes.json();

        if (usersData.status === 'success') {
          setActiveEmployees(usersData.data.length);
        }

        if (goalsData.status === 'success') {
          const goals = goalsData.data;
          let approved = 0, pending = 0, rework = 0;
          
          goals.forEach(g => {
            if (g.status === 'Approved') approved++;
            else if (g.status === 'Pending Approval') pending++;
            else if (g.status === 'Rework Required') rework++;
          });

          setGoalsApproved(approved);

          const total = goals.length || 1;
          setStatusPercentages({
            'Approved': Math.round((approved / total) * 100),
            'Pending Approval': Math.round((pending / total) * 100),
            'Rework Required': Math.round((rework / total) * 100)
          });

          setStatusData([
            { name: 'Approved', value: approved, color: '#10b981' },
            { name: 'Pending Approval', value: pending, color: '#f59e0b' },
            { name: 'Rework Required', value: rework, color: '#f43f5e' }
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
      }
    };
    
    fetchData();
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -z-10"></div>
        <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">PEOPLE CLOUD &middot; ADMIN</p>
        <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">
          Organization performance
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-3xl">Govern company-wide goals, audits, escalations, and shared KPIs across departments.</p>
      </motion.div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        
        {/* Active Employees */}
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">ACTIVE EMPLOYEES</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 border border-indigo-200/50 dark:border-indigo-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{activeEmployees}</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg"><ArrowUpRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 2.1%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs last quarter</p>
          </div>
        </motion.div>

        {/* Goals Approved */}
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">GOALS APPROVED</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200/50 dark:border-blue-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{goalsApproved}</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg"><ArrowUpRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 5.4%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">org-wide total</p>
          </div>
        </motion.div>

        {/* Unlock Requests */}
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest w-24 leading-snug">UNLOCK REQUESTS</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40 border border-amber-200/50 dark:border-amber-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Unlock className="w-6 h-6 text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">2</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">awaiting decision</p>
          </div>
        </motion.div>

        {/* Open Escalations */}
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest w-24 leading-snug">OPEN ESCALATIONS</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/40 border border-rose-200/50 dark:border-rose-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <AlertCircle className="w-6 h-6 text-rose-500 dark:text-rose-400" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">3</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg"><ArrowDownRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 2%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs last week</p>
          </div>
        </motion.div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-10">
        
        {/* Bar Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">DEPARTMENT PERFORMANCE</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Completion % by department</h3>
            </div>
            <div className="text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md">Q2 FY26</div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} barSize={40}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 700}} dx={-10} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <RechartsTooltip cursor={{fill: '#e2e8f0', opacity: 0.4}} content={<CustomTooltip />} />
                <Bar dataKey="completion" fill="url(#colorUv)" radius={[10, 10, 0, 0]} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-[40px] -z-10"></div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">ORG-WIDE STATUS</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Goal completion</h3>
          </div>
          <div className="flex-1 min-h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius="65%"
                  outerRadius="90%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={8}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: '800' }} 
                  itemStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6">
            <div className="flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> Approved
              </div>
              <span className="font-black text-slate-900 dark:text-white text-sm">{statusPercentages['Approved']}%</span>
            </div>
            <div className="flex items-center justify-between bg-amber-50/50 dark:bg-amber-900/20 px-3 py-2 rounded-xl border border-amber-100 dark:border-amber-800/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div> Pending
              </div>
              <span className="font-black text-slate-900 dark:text-white text-sm">{statusPercentages['Pending Approval']}%</span>
            </div>
            <div className="flex items-center justify-between col-span-2 bg-rose-50/50 dark:bg-rose-900/20 px-4 py-2.5 rounded-xl border border-rose-100 dark:border-rose-800/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div> Rework
              </div>
              <span className="font-black text-slate-900 dark:text-white text-sm">{statusPercentages['Rework Required']}%</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Heatmap */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">ACTIVITY HEATMAP</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Check-in cadence &middot; last 12 weeks</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md">
              <Activity className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-6"></th>
                  {[...Array(12)].map((_, i) => (
                    <th key={i} className="pb-6 font-extrabold text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest text-center w-10">
                      W{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/0 space-y-3">
                {heatmapData.map((row, index) => (
                  <tr key={index} className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30 rounded-xl">
                    <td className="py-5 font-black text-slate-700 dark:text-slate-300 w-36 pl-3 rounded-l-xl">{row.dept}</td>
                    {row.weeks.map((val, i) => (
                      <td key={i} className="py-5 text-center">
                        <span className={cn(
                          "font-black text-[13px] px-2 py-1 rounded-lg transition-all", 
                          getColor(val),
                          "bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
                        )}>
                          {val}
                        </span>
                      </td>
                    ))}
                    <td className="rounded-r-xl"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Column Stack */}
        <div className="space-y-6">
          
          {/* Unlock Requests List */}
          <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 lg:p-8 shadow-lg shadow-slate-200/20 dark:shadow-none">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">UNLOCK REQUESTS</p>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Goal lock overrides</h3>
              </div>
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-4">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-extrabold text-slate-900 dark:text-white">Sasha Romanov</span>
                  <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Q1 FY26</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold leading-relaxed mb-5">
                  Edit final achievement metric after late data validation
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">1d ago</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-9 px-4 text-xs font-black text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 rounded-xl">Deny</Button>
                    <Button variant="outline" className="h-9 px-5 text-xs font-black border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-600 hover:text-white dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white rounded-xl shadow-sm transition-all">Unlock</Button>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 rounded-2xl p-5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-extrabold text-slate-900 dark:text-white">Liam O'Connor</span>
                  <span className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Q4 FY25</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-semibold leading-relaxed mb-5">
                  Add 2 retroactive research milestones for audit trail
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">3d ago</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-9 px-4 text-xs font-black text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-700 rounded-xl">Deny</Button>
                    <Button variant="outline" className="h-9 px-5 text-xs font-black border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-600 hover:text-white dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white rounded-xl shadow-sm transition-all">Unlock</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Escalations */}
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-rose-50/80 to-rose-100/50 dark:from-rose-950/40 dark:to-rose-900/20 backdrop-blur-xl border border-rose-200/60 dark:border-rose-800/50 rounded-[32px] p-7 lg:p-8 shadow-lg shadow-rose-200/20 dark:shadow-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/20 rounded-full blur-[50px] -z-10"></div>
            <p className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <AlertCircle size={14} /> ACTIVE ESCALATIONS
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Marcus Chen &middot; Q...</span>
                <span className="border border-rose-200 dark:border-rose-800/80 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">High</span>
              </div>
              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Tomás Vega ...</span>
                <span className="border border-amber-200 dark:border-amber-800/80 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Medium</span>
              </div>
              <div className="flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">Riya Kapoor &middot; Wel...</span>
                <span className="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Low</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
