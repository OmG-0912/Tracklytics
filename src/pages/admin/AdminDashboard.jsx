import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, Building2, Users, Unlock, AlertCircle, Activity, Cpu } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

const deptData = [
  { name: 'Design', completion: 82 },
  { name: 'Engineering', completion: 76 },
  { name: 'Product', completion: 88 },
  { name: 'Sales', completion: 71 },
  { name: 'Marketing', completion: 79 },
  { name: 'People Ops', completion: 92 },
  { name: 'Finance', completion: 84 },
];

const statusData = [
  { name: 'Completed', value: 38, color: '#10b981' },
  { name: 'At Risk', value: 6, color: '#ef4444' },
  { name: 'Pending', value: 14, color: '#f59e0b' },
  { name: 'In Progress', value: 42, color: '#4f46e5' },
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
  if (val >= 90) return 'text-emerald-600';
  if (val >= 70) return 'text-indigo-600';
  if (val >= 60) return 'text-amber-500';
  return 'text-red-500';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-4 font-bold text-slate-900 text-sm">
        {label} completion : {payload[0].value}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="mb-8 pb-8 border-b border-slate-100">
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">PEOPLE CLOUD &middot; ADMIN</p>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Organization performance</h2>
        <p className="text-slate-600 text-lg">Govern company-wide goals, audits, escalations, and shared KPIs across departments.</p>
      </div>

      {/* KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        
        {/* Active Employees */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">ACTIVE EMPLOYEES</p>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">1,284</h3>
              <span className="text-emerald-600 font-bold text-sm flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 2.1%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">vs last quarter</p>
          </div>
        </div>

        {/* Goals Approved */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">GOALS APPROVED</p>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">3,742</h3>
              <span className="text-emerald-600 font-bold text-sm flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 5.4%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">org-wide</p>
          </div>
        </div>

        {/* Unlock Requests */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest w-20 leading-snug">UNLOCK REQUESTS</p>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <Unlock className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">2</h3>
            </div>
            <p className="text-slate-500 text-sm font-medium">awaiting decision</p>
          </div>
        </div>

        {/* Open Escalations */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest w-24 leading-snug">OPEN ESCALATIONS</p>
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">3</h3>
              <span className="text-red-500 font-bold text-sm flex items-center"><ArrowDownRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 2%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">vs last week</p>
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-8">
        
        {/* Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">DEPARTMENT PERFORMANCE</p>
              <h3 className="text-2xl font-extrabold text-slate-900">Completion % by department</h3>
            </div>
            <div className="text-sm font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">Q2 FY26</div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dx={-10} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <RechartsTooltip cursor={{fill: '#e2e8f0', opacity: 0.5}} content={<CustomTooltip />} />
                <Bar dataKey="completion" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">ORG-WIDE STATUS</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Goal completion</h3>
          </div>
          <div className="flex-1 min-h-[220px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px -4px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  itemStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Completed
              </div>
              <span className="font-extrabold text-slate-900 text-sm">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-[#4f46e5]"></div> In Progress
              </div>
              <span className="font-extrabold text-slate-900 text-sm">42%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div> Pending
              </div>
              <span className="font-extrabold text-slate-900 text-sm">14%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> At Risk
              </div>
              <span className="font-extrabold text-slate-900 text-sm">6%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Heatmap */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">ACTIVITY HEATMAP</p>
              <h3 className="text-2xl font-extrabold text-slate-900">Check-in cadence &middot; last 12 weeks</h3>
            </div>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr>
                  <th className="pb-4"></th>
                  {[...Array(12)].map((_, i) => (
                    <th key={i} className="pb-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider text-center w-8">
                      W{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/0 space-y-2">
                {heatmapData.map((row, index) => (
                  <tr key={index} className="group">
                    <td className="py-4 font-bold text-slate-600 w-32">{row.dept}</td>
                    {row.weeks.map((val, i) => (
                      <td key={i} className="py-4 text-center">
                        <span className={cn("font-extrabold text-[13px]", getColor(val))}>
                          {val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="space-y-6">
          
          {/* Unlock Requests List */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">UNLOCK REQUESTS</p>
                <h3 className="text-xl font-extrabold text-slate-900">Goal lock overrides</h3>
              </div>
              <Cpu className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-extrabold text-slate-900">Sasha Romanov</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Q1 FY26</span>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                  Edit final achievement metric after late data validation
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">1 day ago</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-slate-500 hover:text-slate-900">Deny</Button>
                    <Button variant="outline" className="h-8 px-4 text-xs font-bold border-slate-200 text-slate-700 shadow-sm">Unlock</Button>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-extrabold text-slate-900">Liam O'Connor</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Q4 FY25</span>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-4">
                  Add 2 retroactive research milestones for audit trail
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">3 days ago</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="h-8 px-3 text-xs font-bold text-slate-500 hover:text-slate-900">Deny</Button>
                    <Button variant="outline" className="h-8 px-4 text-xs font-bold border-slate-200 text-slate-700 shadow-sm">Unlock</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Escalations */}
          <div className="bg-red-50/30 border border-red-100 rounded-3xl p-6 shadow-sm">
            <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-4">ACTIVE ESCALATIONS</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-sm">Marcus Chen &middot; Q...</span>
                <span className="border border-red-200 text-red-600 bg-white text-[11px] font-bold px-3 py-1 rounded-full">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-sm">Tomás Vega ...</span>
                <span className="border border-amber-200 text-amber-600 bg-white text-[11px] font-bold px-3 py-1 rounded-full">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-sm">Riya Kapoor &middot; Wel...</span>
                <span className="border border-slate-200 text-slate-600 bg-white text-[11px] font-bold px-3 py-1 rounded-full">Low</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
