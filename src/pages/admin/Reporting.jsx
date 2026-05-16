import { Button } from '@/components/ui/button';
import { FileText, ArrowUpRight, ArrowDownRight, Crown, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

const trendData = [
  { name: 'Q1 FY25', planned: 68, actual: 64 },
  { name: 'Q2 FY25', planned: 72, actual: 69 },
  { name: 'Q3 FY25', planned: 76, actual: 74 },
  { name: 'Q4 FY25', planned: 82, actual: 80 },
  { name: 'Q1 FY26', planned: 84, actual: 88 },
  { name: 'Q2 FY26', planned: 88, actual: 76 },
];

const statusData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 35, color: '#4f46e5' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'At Risk', value: 5, color: '#ef4444' },
];

const managers = [
  { name: 'Priya Raman', initials: 'PR', dept: 'People Ops', score: 96, trend: 4 },
  { name: 'Devon Park', initials: 'DP', dept: 'Design', score: 92, trend: 2 },
  { name: 'Hiro Tanaka', initials: 'HT', dept: 'Engineering', score: 90, trend: -1 },
  { name: 'Imani Okafor', initials: 'IO', dept: 'Product', score: 88, trend: 3 },
  { name: 'Carlos Diaz', initials: 'CD', dept: 'Sales', score: 81, trend: 0 },
];

const departments = [
  { name: 'People Ops', score: 92 },
  { name: 'Product', score: 88 },
  { name: 'Finance', score: 84 },
  { name: 'Design', score: 82 },
  { name: 'Marketing', score: 79 },
  { name: 'Engineering', score: 76 },
];

export default function Reporting() {
  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-8 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">REPORTING & ANALYTICS</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Quarterly insights</h2>
          <p className="text-slate-600 text-lg">Track trends, benchmark managers, and export board-ready reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl px-5 py-5 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
            <FileText className="w-4 h-4 mr-2" /> CSV
          </Button>
          <Button variant="outline" className="rounded-xl px-5 py-5 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all">
            <FileText className="w-4 h-4 mr-2" /> PDF
          </Button>
          <Button variant="ghost" className="text-slate-400 font-bold hover:text-slate-900 ml-2 transition-all">
            Download all <Download className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">ORG COMPLETION</p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-extrabold text-slate-900">82%</h3>
            <span className="text-emerald-600 font-bold text-sm flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 4%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">vs trailing quarter</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">ON-TRACK GOALS</p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-extrabold text-slate-900">76%</h3>
            <span className="text-emerald-600 font-bold text-sm flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">vs trailing quarter</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">AVG CYCLE TIME</p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-extrabold text-slate-900">3.4d</h3>
            <span className="text-red-500 font-bold text-sm flex items-center"><ArrowDownRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 8%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">vs trailing quarter</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">MANAGER NPS</p>
          <div className="flex items-baseline gap-3 mb-2">
            <h3 className="text-4xl font-extrabold text-slate-900">+62</h3>
            <span className="text-emerald-600 font-bold text-sm flex items-center"><ArrowUpRight className="w-3 h-3 mr-0.5" strokeWidth={3} /> 5%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">vs trailing quarter</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-8">
        
        {/* Line Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">QUARTER OVER QUARTER</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Planned vs actual achievement</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dx={-10} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="planned" stroke="#a5b4fc" strokeWidth={3} dot={{r: 4, fill: '#fff', strokeWidth: 2}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#fff', strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">DISTRIBUTION</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Status mix</h3>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="85%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px -4px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
                  itemStyle={{ color: '#0f172a' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
            {statusData.map(status => (
              <div key={status.name} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }}></div>
                {status.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        
        {/* Leaderboard Table */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">MANAGER EFFECTIVENESS</p>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900">Leaderboard &middot; Q2 FY26</h3>
            <Crown className="w-6 h-6 text-amber-500" />
          </div>

          <div className="divide-y divide-slate-100">
            {managers.map((m, i) => (
              <div key={i} className="flex items-center gap-5 py-4 transition-colors hover:bg-slate-50 -mx-4 px-4 rounded-xl">
                <span className="font-extrabold text-slate-900 w-6 text-lg">#{i+1}</span>
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 font-extrabold flex items-center justify-center text-md">
                  {m.initials}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-0.5">{m.name}</h4>
                  <p className="text-slate-500 text-sm font-medium">{m.dept}</p>
                </div>
                <span className="font-extrabold text-slate-900 text-xl">{m.score}</span>
                <span className={cn("font-bold text-md w-8 text-right", m.trend >= 0 ? "text-emerald-600" : "text-slate-400")}>
                  {m.trend > 0 ? `+${m.trend}` : m.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers Table */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">DEPARTMENT COMPLETION</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8">Top performers</h3>

          <div className="space-y-6">
            {departments.map((d, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="font-bold text-slate-700 text-md">{d.name}</span>
                <span className="font-extrabold text-slate-900 text-lg">{d.score}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
