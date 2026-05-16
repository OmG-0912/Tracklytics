import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle, Clock, Trophy, Calendar, Plus, Sparkles, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const performanceData = [
  { name: 'Q1 FY25', score: 68 },
  { name: 'Q2 FY25', score: 72 },
  { name: 'Q3 FY25', score: 76 },
  { name: 'Q4 FY25', score: 81 },
  { name: 'Q1 FY26', score: 88 },
  { name: 'Q2 FY26', score: 92 },
];

const statusData = [
  { name: 'At Risk', value: 10, color: '#ef4444' },
  { name: 'Completed', value: 20, color: '#10b981' },
  { name: 'In Progress', value: 50, color: '#3b82f6' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
];

const goalsList = [
  { 
    title: 'Ship Design System v3.0', 
    desc: 'Roll out tokens, motion primitives, and accessibility audit across 6...', 
    status: 'In Progress', 
    statusColor: 'bg-blue-50 text-blue-600 border-blue-200',
    progress: '62%', 
    weight: '30%' 
  },
  { 
    title: 'Improve NPS by 12 points', 
    desc: 'Run quarterly research, ship 3 onboarding experiments, track CSA...', 
    status: 'Approved', 
    statusColor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    progress: '71%', 
    weight: '25%' 
  },
  { 
    title: 'Reduce design review cycle time', 
    desc: 'Move from 7.2 days to under 3.5 days via async critique workflow.', 
    status: 'Pending Approval', 
    statusColor: 'bg-amber-50 text-amber-600 border-amber-200',
    progress: '68%', 
    weight: '20%' 
  },
  { 
    title: 'Zero critical accessibility defects', 
    desc: 'Maintain zero P0/P1 a11y issues across shipped surfaces this quar...', 
    status: 'Completed', 
    statusColor: 'bg-green-50 text-green-600 border-green-200',
    progress: '100%', 
    weight: '15%' 
  },
  { 
    title: 'Mentor two junior designers to L3', 
    desc: 'Weekly 1:1s, portfolio reviews, mid-quarter calibration with manag...', 
    status: 'In Progress', 
    statusColor: 'bg-blue-50 text-blue-600 border-blue-200',
    progress: '50%', 
    weight: '10%' 
  }
];

const activityTimeline = [
  { user: 'Devon Park', action: 'approved goal', target: 'Improve NPS by 12 points', time: '2h ago' },
  { user: 'Aanya Mehta', action: 'updated weightage on', target: 'Ship Design System v3.0', time: '5h ago' },
  { user: 'Priya Raman', action: 'pushed shared KPI', target: 'Zero critical a11y defects', time: 'Yesterday' },
  { user: 'Marcus Chen', action: 'submitted goals for', target: 'Q2 FY26', time: 'Yesterday' },
  { user: 'Devon Park', action: 'returned for rework', target: 'Reduce design review cycle time', time: '2 days ago' },
];

export default function EmployeeDashboard() {
  const role = localStorage.getItem('role') || 'employee';
  const firstName = role === 'employee' ? 'Aanya' : role === 'manager' ? 'Devon' : 'Priya';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6">
        <div>
          <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">{role} Workspace · Q2 FY26</div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Welcome back, {firstName}</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xl leading-relaxed">
            Here's your goal momentum for this quarter. Stay close to the 100% weightage rule and keep check-ins crisp.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2 rounded-full border-slate-300">
            <Calendar size={16} /> Log check-in
          </Button>
          <Button variant="ghost" className="text-slate-500 flex items-center gap-2">
             New goal
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">AVG PROGRESS</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">70%</span>
                  <span className="text-xs font-bold text-green-600 flex items-center">↗ 6%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">vs last quarter</div>
              </div>
              <div className="p-2 bg-indigo-50 rounded-full border border-indigo-100">
                <Target className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">APPROVED GOALS</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">3</span>
                  <span className="text-xs font-bold text-green-600 flex items-center">↗ 2%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">active this quarter</div>
              </div>
              <div className="p-2 bg-blue-50 rounded-full border border-blue-100">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">PENDING REVIEW</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">1</span>
                  <span className="text-xs font-bold text-red-500 flex items-center">↘ 1%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">awaiting manager</div>
              </div>
              <div className="p-2 bg-amber-50 rounded-full border border-amber-100">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1">COMPLETED</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">1</span>
                  <span className="text-xs font-bold text-green-600 flex items-center">↗ 1%</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">last 30 days</div>
              </div>
              <div className="p-2 bg-green-50 rounded-full border border-green-100">
                <Trophy className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 rounded-2xl border-slate-200 shadow-sm overflow-hidden relative">
          <CardHeader className="pb-0 absolute w-full z-10 flex flex-row justify-between items-start">
            <div>
              <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Quarterly Performance</div>
              <CardTitle className="text-xl">Planned vs actual achievement</CardTitle>
            </div>
            <div className="text-xs font-bold text-primary flex items-center mt-4 mr-6">
              ↗ +6.2% trailing 4Q
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-20 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#cbd5e1" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 rounded-2xl border-slate-200 shadow-sm flex flex-col">
          <CardHeader className="pb-0">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Status Distribution</div>
            <CardTitle className="text-xl">Goal portfolio</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-end pb-6">
            <div className="h-[180px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-6">
              {statusData.map(status => (
                <div key={status.name} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }}></div>
                  {status.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lists Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
            <div>
              <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">My Goals</div>
              <CardTitle className="text-xl">Current quarter portfolio</CardTitle>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:underline">Manage →</a>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {goalsList.map((goal, i) => (
                <div key={i} className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <Target className="text-indigo-500 mt-1 shrink-0" size={20} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">{goal.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${goal.statusColor}`}>
                        {goal.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 truncate max-w-md">{goal.desc}</p>
                    <div className="text-xs font-semibold text-slate-900">
                      {goal.progress} <span className="text-slate-400 font-normal mx-1">·</span> Weight {goal.weight}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 self-center" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 rounded-2xl border-slate-200 shadow-sm">
          <CardHeader className="border-b pb-4">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">Recent Activity</div>
            <CardTitle className="text-xl">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {activityTimeline.map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-start mb-4">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm leading-snug">
                        <span className="font-bold text-slate-900">{item.user}</span> <span className="text-slate-500">{item.action}</span> <span className="font-semibold text-slate-800">{item.target}</span>
                      </p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Coach Tip */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Coach tip: schedule your mid-quarter check-in</h4>
            <p className="text-sm text-slate-500">Employees who log a check-in by week 6 close their quarter 14% stronger on average.</p>
          </div>
        </div>
        <Button variant="ghost" className="mt-4 md:mt-0 text-slate-400 hover:text-slate-900 font-semibold shrink-0">
          Start check-in
        </Button>
      </div>

    </div>
  );
}
