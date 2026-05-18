import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowUpRight, ArrowDownRight, Crown, Download, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const trendData = [
  { name: 'Q1 FY25', planned: 68, actual: 64 },
  { name: 'Q2 FY25', planned: 72, actual: 69 },
  { name: 'Q3 FY25', planned: 76, actual: 74 },
  { name: 'Q4 FY25', planned: 82, actual: 80 },
  { name: 'Q1 FY26', planned: 84, actual: 88 },
  { name: 'Q2 FY26', planned: 88, actual: 76 },
];

import { managerLeaderboard as managers } from '@/data/mockData';

const departments = [
  { name: 'People Ops', score: 92 },
  { name: 'Product', score: 88 },
  { name: 'Finance', score: 84 },
  { name: 'Design', score: 82 },
  { name: 'Marketing', score: 79 },
  { name: 'Engineering', score: 76 },
];

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

export default function Reporting() {
  const [goals, setGoals] = useState([]);
  const role = localStorage.getItem('role') || 'manager';
  const [statusData, setStatusData] = useState([
    { name: 'Approved', value: 0, color: '#10b981' }, // emerald
    { name: 'Pending Approval', value: 0, color: '#f59e0b' }, // amber
    { name: 'Rework Required', value: 0, color: '#f43f5e' }, // rose
  ]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const url = role === 'admin' ? 'http://127.0.0.1:8000/api/goals' : 'http://127.0.0.1:8000/api/goals/team/U201';
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'success') {
          setGoals(data.data);
          
          let approved = 0, pending = 0, rework = 0;
          data.data.forEach(g => {
            if (g.status === 'Approved') approved++;
            else if (g.status === 'Pending Approval') pending++;
            else if (g.status === 'Rework Required') rework++;
          });
          
          setStatusData([
            { name: 'Approved', value: approved, color: '#10b981' },
            { name: 'Pending Approval', value: pending, color: '#f59e0b' },
            { name: 'Rework Required', value: rework, color: '#f43f5e' },
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch goals", err);
      }
    };
    fetchGoals();
  }, [role]);

  const downloadCSV = () => {
    if (goals.length === 0) {
      alert("No data available to download.");
      return;
    }
    const headers = ['Goal ID', 'Title', 'Description', 'Category', 'Target', 'UOM', 'Weightage', 'Cycle', 'Status', 'User ID'];
    const csvRows = [headers.join(',')];
    
    for (const row of goals) {
      const values = [
        row.id,
        `"${row.title.replace(/"/g, '""')}"`,
        `"${row.description.replace(/"/g, '""')}"`,
        row.category,
        row.target,
        row.uom,
        row.weightage,
        row.cycle,
        row.status,
        row.user_id
      ];
      csvRows.push(values.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atomquest_goals_report_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    window.print();
  };

  const downloadAll = () => {
    downloadCSV();
    setTimeout(downloadPDF, 500);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-start mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute top-10 right-10 w-64 h-64 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-[80px] -z-10"></div>
        <div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">REPORTING & ANALYTICS</p>
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">{role === 'manager' ? 'Team insights' : 'Quarterly insights'}</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">Track trends, benchmark performance, and export ready-made reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={downloadCSV} variant="outline" className="rounded-xl px-5 py-6 border-slate-200/80 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-700 dark:text-slate-200 font-extrabold hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all">
            <FileText className="w-4 h-4 mr-2 text-indigo-500" /> CSV
          </Button>
          <Button onClick={downloadPDF} variant="outline" className="rounded-xl px-5 py-6 border-slate-200/80 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-700 dark:text-slate-200 font-extrabold hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all">
            <FileText className="w-4 h-4 mr-2 text-rose-500" /> PDF
          </Button>
          <Button onClick={downloadAll} variant="ghost" className="text-slate-500 dark:text-slate-400 font-extrabold hover:text-indigo-600 dark:hover:text-indigo-400 ml-2 transition-all">
            Download all <Download className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">ORG COMPLETION</p>
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">82%</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg"><ArrowUpRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 4%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs trailing quarter</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">ON-TRACK GOALS</p>
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">76%</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg"><ArrowUpRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 2%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs trailing quarter</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">AVG CYCLE TIME</p>
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">3.4d</h3>
              <span className="text-rose-500 font-extrabold text-sm flex items-center bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-lg"><ArrowDownRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 8%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs trailing quarter</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">MANAGER NPS</p>
          <div>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">+62</h3>
              <span className="text-emerald-500 font-extrabold text-sm flex items-center bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-lg"><ArrowUpRight className="w-4 h-4 mr-0.5" strokeWidth={3} /> 5%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">vs trailing quarter</p>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-10">
        
        {/* Line Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-50/50 dark:from-indigo-900/10 to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><TrendingUp size={14} /> QUARTER OVER QUARTER</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">Planned vs actual achievement</h3>
            </div>
          </div>
          <div className="h-[300px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 700}} dx={-10} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: '800' }} 
                  itemStyle={{ fontWeight: '800', color: '#0f172a' }}
                />
                <Line type="monotone" dataKey="planned" stroke="#a5b4fc" strokeWidth={4} dot={{r: 5, fill: '#fff', strokeWidth: 3}} activeDot={{r: 8, fill: '#818cf8', strokeWidth: 0}} />
                <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={4} dot={{r: 5, fill: '#fff', strokeWidth: 3}} activeDot={{r: 8, fill: '#4f46e5', strokeWidth: 0}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-[40px] -z-10"></div>
          <div>
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">DISTRIBUTION</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Status mix</h3>
          </div>
          <div className="flex-1 min-h-[220px]">
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
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: '800' }} 
                  itemStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-4">
            {statusData.map(status => (
              <div key={status.name} className="flex items-center gap-2 text-xs font-black text-slate-600 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: status.color, boxShadow: `0 0 8px ${status.color}80` }}></div>
                {status.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Leaderboard Table */}
        <motion.div variants={itemVariants} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none">
          <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">MANAGER EFFECTIVENESS</p>
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Leaderboard &middot; Q2 FY26</h3>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-200 dark:border-amber-800 shadow-inner">
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          <div className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
            {managers.map((m, i) => (
              <div key={i} className="flex items-center gap-5 py-5 transition-all hover:bg-white/80 dark:hover:bg-slate-800/80 -mx-4 px-4 rounded-2xl hover:shadow-sm">
                <span className="font-black text-slate-400 dark:text-slate-500 w-8 text-xl">#{i+1}</span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 border border-indigo-200/50 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-400 font-black flex items-center justify-center text-lg shadow-inner">
                  {m.initials}
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xl mb-1">{m.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{m.dept}</p>
                </div>
                <span className="font-black text-slate-900 dark:text-white text-2xl">{m.score}</span>
                <span className={cn("font-black text-lg w-10 text-right bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg ml-2", m.trend >= 0 ? "text-emerald-500" : "text-slate-400")}>
                  {m.trend > 0 ? `+${m.trend}` : m.trend}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers Table */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-50/50 to-white/50 dark:from-indigo-950/20 dark:to-slate-900/50 backdrop-blur-xl border border-indigo-100/50 dark:border-indigo-800/30 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none">
          <p className="text-[11px] font-extrabold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-2">DEPARTMENT COMPLETION</p>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Top performers</h3>

          <div className="space-y-4">
            {departments.map((d, i) => (
              <div key={i} className="flex justify-between items-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm transition-transform hover:scale-[1.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center font-black text-xs border border-slate-200 dark:border-slate-700">
                    {i+1}
                  </div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 text-md">{d.name}</span>
                </div>
                <span className="font-black text-slate-900 dark:text-white text-xl bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-xl shadow-inner border border-slate-100 dark:border-slate-800">{d.score}%</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
