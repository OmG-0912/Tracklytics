import { useState } from 'react';
import { Users, Clock, CheckCircle, AlertTriangle, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ManagerApproval() {
  const [expandedId, setExpandedId] = useState(1);

  // Mock data representing the team
  const team = [
    {
      id: 1,
      name: 'Aanya Mehta',
      title: 'Sr. Product Designer',
      status: 'On Track',
      statusColor: 'text-indigo-600 border-indigo-200 bg-white',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
      stats: { pending: 1, approved: 3, done: 1, completion: 74 },
      goals: [
        { title: 'Ship Design System v3.0', status: 'In Progress', statusColor: 'text-indigo-600 border-indigo-200 bg-white', weight: '30%', uom: 'Milestone', target: 'Oct 15', progress: '62%', desc: 'Roll out tokens, motion primitives, and accessibility audit across 6 product surfaces.' },
        { title: 'Improve NPS by 12 points', status: 'Approved', statusColor: 'text-blue-600 border-blue-200 bg-white', weight: '25%', uom: 'Numeric', target: '68', progress: '71%', desc: 'Run quarterly research, ship 3 onboarding experiments, track CSAT lift.' },
        { title: 'Reduce design review cycle time', status: 'Pending Approval', statusColor: 'text-amber-600 border-amber-200 bg-white', weight: '20%', uom: 'Percentage', target: '50', progress: '68%', desc: 'Move from 7.2 days to under 3.5 days via async critique workflow.' },
        { title: 'Zero critical accessibility defects', status: 'Completed', statusColor: 'text-emerald-600 border-emerald-200 bg-white', weight: '15%', uom: 'Zero-based', target: '0', progress: '100%', desc: 'Maintain zero P0/P1 a11y issues across shipped surfaces this quarter.' },
      ],
      feedback: {
        author: 'Devon Park',
        text: 'Strong Q2 plan. Consider tightening NPS metric — target should be closer to 70 based on recent positive churn trends.',
        time: '2 days ago'
      }
    },
    {
      id: 2,
      name: 'Marcus Chen',
      title: 'Product Designer',
      status: 'At Risk',
      statusColor: 'text-red-600 border-red-200 bg-white',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
      stats: { pending: 2, approved: 2, done: 0, completion: 48 },
      goals: []
    },
    {
      id: 3,
      name: 'Sasha Romanov',
      title: 'Design Engineer',
      status: 'Exceeding',
      statusColor: 'text-emerald-600 border-emerald-200 bg-white',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
      stats: { pending: 0, approved: 4, done: 3, completion: 91 },
      goals: []
    },
    {
      id: 4,
      name: 'Liam O\'Connor',
      title: 'Researcher',
      status: 'On Track',
      statusColor: 'text-indigo-600 border-indigo-200 bg-white',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
      stats: { pending: 1, approved: 3, done: 1, completion: 62 },
      goals: []
    },
    {
      id: 5,
      name: 'Noor Hassan',
      title: 'Content Designer',
      status: 'On Track',
      statusColor: 'text-indigo-600 border-indigo-200 bg-white',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
      stats: { pending: 0, approved: 3, done: 2, completion: 80 },
      goals: []
    }
  ];

  const role = localStorage.getItem('role') || 'manager';

  return (
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-slate-100">
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
          {role === 'admin' ? 'ADMIN WORKSPACE' : 'MANAGER WORKSPACE'}
        </p>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Team goal approvals</h2>
        <p className="text-slate-600 text-lg">Review submitted goals, leave coaching feedback, and approve or return for rework.</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-[80px] leading-tight">DIRECT REPORTS</p>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shrink-0">
              <Users size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-4xl font-extrabold text-slate-900">5</h3>
            <span className="text-emerald-600 font-bold text-sm">↗ 0%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">active in cycle</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-[80px] leading-tight">AWAITING REVIEW</p>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shrink-0">
              <Clock size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-4xl font-extrabold text-slate-900">4</h3>
            <span className="text-red-500 font-bold text-sm">↘ 2%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">SLA: 5 days</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-[80px] leading-tight">APPROVED THIS WEEK</p>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shrink-0">
              <CheckCircle size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-4xl font-extrabold text-slate-900">9</h3>
            <span className="text-emerald-600 font-bold text-sm">↗ 3%</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-[80px] leading-tight">RETURNED FOR REWORK</p>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shrink-0">
              <AlertTriangle size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-4xl font-extrabold text-slate-900">2</h3>
            <span className="text-red-500 font-bold text-sm">↘ 1%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">last 7 days</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-8">
        <Filter className="w-5 h-5 text-slate-400 mr-2" strokeWidth={2.5} />
        <button className="px-5 py-2 rounded-full border border-slate-800 text-slate-800 font-bold text-sm bg-white shadow-sm hover:bg-slate-50">All</button>
        <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-500 font-bold text-sm bg-white shadow-sm hover:border-slate-300 hover:text-slate-700">Pending</button>
        <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-500 font-bold text-sm bg-white shadow-sm hover:border-slate-300 hover:text-slate-700">Approved</button>
        <button className="px-5 py-2 rounded-full border border-slate-200 text-slate-500 font-bold text-sm bg-white shadow-sm hover:border-slate-300 hover:text-slate-700">Returned</button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {team.map((member) => {
          const isExpanded = expandedId === member.id;
          return (
            <div key={member.id} className={cn("bg-white border rounded-[24px] shadow-sm transition-all overflow-hidden", isExpanded ? "border-slate-300 shadow-md" : "border-slate-200 hover:border-slate-300 hover:shadow-md")}>
              
              {/* Accordion Header */}
              <div 
                className={cn("p-6 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors gap-6 md:gap-0", isExpanded ? "bg-slate-50/50" : "hover:bg-slate-50")}
                onClick={() => setExpandedId(isExpanded ? null : member.id)}
              >
                <div className="flex items-center gap-4">
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full border border-slate-100 shadow-sm" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-extrabold text-slate-900 text-lg">{member.name}</h4>
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border", member.statusColor)}>
                        {member.status}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm mt-0.5">{member.title}</p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10 pl-14 md:pl-0">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">PENDING</p>
                      <p className="font-extrabold text-amber-500 text-xl">{member.stats.pending}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">APPROVED</p>
                      <p className="font-extrabold text-indigo-600 text-xl">{member.stats.approved}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">DONE</p>
                      <p className="font-extrabold text-emerald-600 text-xl">{member.stats.done}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 md:border-l border-slate-200 md:pl-8">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-900">Completion</span>
                      <span className="font-extrabold text-slate-900 text-lg">{member.stats.completion}%</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && member.goals && member.goals.length > 0 && (
                <div className="border-t border-slate-100 p-6 md:p-8 flex flex-col xl:flex-row gap-10 bg-white">
                  
                  {/* Left: Goals */}
                  <div className="flex-[2]">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-6">SUBMITTED GOALS &middot; Q2 FY26</p>
                    <div className="space-y-4">
                      {member.goals.map((goal, i) => (
                        <div key={i} className="border border-slate-200 rounded-[20px] p-6 hover:shadow-sm transition-all bg-white relative">
                          <div className="absolute right-6 top-6">
                            <span className="font-extrabold text-indigo-700 text-lg">{goal.weight}</span>
                          </div>
                          
                          <div className="flex items-start gap-3 mb-4 pr-12">
                            <h5 className="font-extrabold text-slate-900 text-lg leading-tight">{goal.title}</h5>
                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border whitespace-nowrap mt-0.5", goal.statusColor)}>
                              {goal.status}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[13px] font-medium mb-6 max-w-xl">{goal.desc}</p>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">UOM</p>
                              <p className="font-extrabold text-slate-900 text-sm">{goal.uom}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">TARGET</p>
                              <p className="font-extrabold text-slate-900 text-sm">{goal.target}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">PROGRESS</p>
                              <p className="font-extrabold text-slate-900 text-sm">{goal.progress}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Feedback */}
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-6">COACHING FEEDBACK</p>
                    
                    <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 mb-4">
                      <div className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm mb-1">{member.feedback.author}</p>
                          <p className="text-slate-600 text-sm leading-relaxed font-medium mb-3">{member.feedback.text}</p>
                          <p className="text-[10px] font-bold text-slate-400">{member.feedback.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-5">
                      <textarea 
                        className="w-full border border-slate-200 rounded-2xl p-5 text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none min-h-[140px] shadow-sm"
                        placeholder="Leave coaching feedback..."
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-5">
                      <button className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors">Approve</button>
                      <button className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors">Rework</button>
                      <button className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors">Reject</button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
