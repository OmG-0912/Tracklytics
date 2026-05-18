import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle, Clock, Trophy, Calendar, Plus, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const performanceData = [
  { name: 'Q1', score: 68 },
  { name: 'Q2', score: 72 },
  { name: 'Q3', score: 76 },
  { name: 'Q4', score: 81 },
  { name: 'Q1', score: 88 },
  { name: 'Q2', score: 92 },
];

const statusData = [
  { name: 'At Risk', value: 10, color: '#f43f5e' },    // rose-500
  { name: 'Completed', value: 20, color: '#10b981' },  // emerald-500
  { name: 'In Progress', value: 50, color: '#6366f1' },// indigo-500
  { name: 'Pending', value: 20, color: '#f59e0b' },    // amber-500
];

const activityTimeline = [
  { user: 'Devon Park', action: 'approved goal', target: 'Improve NPS by 12 points', time: '2h ago' },
  { user: 'Aanya Mehta', action: 'updated weightage on', target: 'Ship Design System v3.0', time: '5h ago' },
  { user: 'Priya Raman', action: 'pushed shared KPI', target: 'Zero critical a11y defects', time: 'Yesterday' },
  { user: 'Marcus Chen', action: 'submitted goals for', target: 'Q2 FY26', time: 'Yesterday' },
  { user: 'Devon Park', action: 'returned for rework', target: 'Reduce design review cycle time', time: '2 days ago' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'employee';
  const firstName = role === 'employee' ? 'Aanya' : role === 'manager' ? 'Devon' : 'Priya';
  const [goalsList, setGoalsList] = useState([]);
  const [stats, setStats] = useState({ approved: 0, pending: 0, completed: 0 });
  const [loadingGoals, setLoadingGoals] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/goals/user/U301');
        const data = await response.json();
        if (data.status === 'success') {
          const mapped = data.data.map(g => {
             let statusColor = 'bg-indigo-50 text-indigo-600 border-indigo-200/50';
             if (g.status === 'Approved') statusColor = 'bg-emerald-50 text-emerald-600 border-emerald-200/50';
             if (g.status === 'Pending Approval') statusColor = 'bg-amber-50 text-amber-600 border-amber-200/50';
             return {
               title: g.title,
               desc: g.description || 'No description provided.',
               status: g.status,
               statusColor,
               progress: '0%', 
               weight: `${g.weightage}%`
             };
          });
          setGoalsList(mapped);
          
          setStats({
            approved: data.data.filter(g => g.status === 'Approved').length,
            pending: data.data.filter(g => g.status === 'Pending Approval').length,
            completed: data.data.filter(g => g.status === 'Completed').length,
          });
        }
      } catch (err) {
        console.error("Failed to fetch goals:", err);
      } finally {
        setLoadingGoals(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <motion.div 
      className="space-y-8 max-w-[1400px] mx-auto pb-16 pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-rose-400/10 blur-[120px]" />
      </div>
      
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b border-slate-200/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">{role} Workspace · Q2 FY26</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900">
            Welcome back, {firstName}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-medium">
            Your momentum is building. Stay close to the 100% weightage rule and keep check-ins crisp to drive impact.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-6 md:mt-0">
          <Button 
            variant="outline" 
            className="rounded-2xl px-6 py-6 border-slate-200/80 bg-white/50 backdrop-blur-md text-slate-700 font-bold hover:bg-white hover:shadow-md transition-all duration-300" 
            onClick={() => navigate('/employee/checkin')}
          >
            <Calendar className="w-4 h-4 mr-2 text-indigo-500" /> Log check-in
          </Button>
          <Button 
            className="rounded-2xl px-6 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold hover:from-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 border-0" 
            onClick={() => navigate('/employee/goals/new')}
          >
             <Plus className="w-4 h-4 mr-2" /> New goal
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'AVG PROGRESS', value: '70%', trend: '↗ 6%', subtitle: 'vs last quarter', icon: Target, color: 'indigo' },
          { title: 'APPROVED GOALS', value: stats.approved, trend: '↗', subtitle: 'active this quarter', icon: CheckCircle, color: 'emerald' },
          { title: 'PENDING REVIEW', value: stats.pending, trend: '—', subtitle: 'awaiting manager', icon: Clock, color: 'amber' },
          { title: 'COMPLETED', value: stats.completed, trend: '—', subtitle: 'last 30 days', icon: Trophy, color: 'rose' }
        ].map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }}>
            <Card className="rounded-[24px] border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${kpi.color}-500/5 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500`} />
              <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">{kpi.title}</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{kpi.value}</span>
                      <span className={`text-sm font-bold flex items-center ${kpi.trend.includes('↗') ? 'text-emerald-500' : 'text-slate-400'}`}>
                        {kpi.trend}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-2">{kpi.subtitle}</div>
                  </div>
                  <div className={`p-3 bg-${kpi.color}-50/80 rounded-2xl border border-${kpi.color}-100 shadow-sm text-${kpi.color}-600`}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div variants={itemVariants} className="col-span-2">
          <Card className="h-full rounded-[32px] border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all overflow-hidden relative">
            <CardHeader className="pb-0 absolute w-full z-10 flex flex-row justify-between items-start p-8">
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-indigo-500 uppercase mb-2">Quarterly Performance</div>
                <CardTitle className="text-2xl font-extrabold text-slate-900">Planned vs actual achievement</CardTitle>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700">
                <Activity size={14} /> +6.2% trailing
              </div>
            </CardHeader>
            <CardContent className="p-0 pt-28 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontWeight={600} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fill="url(#colorScore)" activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="h-full rounded-[32px] border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col p-8">
            <div className="mb-6">
              <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">Distribution</div>
              <CardTitle className="text-2xl font-extrabold text-slate-900">Goal portfolio</CardTitle>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={6}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px -4px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text in donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-extrabold text-slate-900">14</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mt-8 w-full">
                {statusData.map(status => (
                  <div key={status.name} className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: status.color }}></div>
                    {status.name}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Lists Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div variants={itemVariants} className="col-span-2">
          <Card className="h-full rounded-[32px] border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <CardHeader className="flex flex-row justify-between items-center border-b border-slate-100/50 p-8 pb-6">
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">My Goals</div>
                <CardTitle className="text-2xl font-extrabold text-slate-900">Current quarter portfolio</CardTitle>
              </div>
              <Button onClick={() => navigate('/employee/goals/new')} variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50 hover:text-indigo-700 rounded-xl px-4">
                Manage →
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100/50">
                {loadingGoals ? (
                  <div className="p-8 text-center text-slate-400 font-medium">Loading your portfolio...</div>
                ) : (
                  goalsList.map((goal, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      className="p-6 px-8 flex items-start gap-5 transition-colors group cursor-pointer"
                    >
                      <div className="p-3 bg-indigo-50 text-indigo-500 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all duration-300">
                        <Target size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h4 className="font-extrabold text-slate-900 text-base">{goal.title}</h4>
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${goal.statusColor}`}>
                            {goal.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-3 truncate max-w-[80%] font-medium">{goal.desc}</p>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-4">
                          <span className="text-slate-700">{goal.progress} progress</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-slate-700">{goal.weight} weight</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all self-center ml-2">
                        <ChevronRight size={18} strokeWidth={3} />
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="h-full rounded-[32px] border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <CardHeader className="border-b border-slate-100/50 p-8 pb-6">
              <div className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">Recent Activity</div>
              <CardTitle className="text-2xl font-extrabold text-slate-900">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[5px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
                {activityTimeline.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="relative flex items-start group"
                  >
                    <div className="absolute left-0 w-3 h-3 bg-white border-2 border-indigo-400 rounded-full mt-1.5 group-hover:border-indigo-600 group-hover:scale-125 transition-all shadow-[0_0_0_4px_rgba(255,255,255,0.8)]" />
                    <div className="ml-8 space-y-1">
                      <p className="text-[13px] leading-relaxed font-medium text-slate-500">
                        <span className="font-extrabold text-slate-900">{item.user}</span> {item.action} <span className="font-extrabold text-indigo-900">{item.target}</span>
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Coach Tip */}
      <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
        <div className="relative w-full overflow-hidden border-0 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between shadow-xl shadow-indigo-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-[0.95] z-0" />
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-inner">
              <Sparkles size={28} />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xl mb-1.5 tracking-tight">Coach tip: schedule your mid-quarter check-in</h4>
              <p className="text-sm font-medium text-indigo-100 max-w-xl">Employees who log a check-in by week 6 close their quarter 14% stronger on average. Build the habit.</p>
            </div>
          </div>
          <Button 
            className="mt-6 md:mt-0 w-full md:w-auto bg-white text-indigo-700 hover:bg-indigo-50 font-extrabold rounded-2xl px-8 py-6 shadow-lg shadow-black/10 transition-all z-10" 
            onClick={() => navigate('/employee/checkin')}
          >
            Start check-in
          </Button>
        </div>
      </motion.div>

    </motion.div>
  );
}
