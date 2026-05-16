import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Target, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuarterlyCheckin() {
  const [goals] = useState([
    { 
      id: 1, 
      title: 'Ship Design System v3.0', 
      description: 'Roll out tokens, motion primitives, and accessibilit...', 
      status: 'In Progress',
      planned: 'Sep 30, 2026',
      actual: 'On track — 62%',
      weight: '30%',
      uom: 'Timeline',
      progress: '62%',
      sparkline: 'M0,15 L20,13 L40,14 L60,10 L80,11 L100,8'
    },
    { 
      id: 2, 
      title: 'Improve NPS by 12 points', 
      description: 'Run quarterly research, ship 3 onboarding experi...', 
      status: 'Approved',
      planned: '68',
      actual: '61',
      weight: '25%',
      uom: 'Numeric',
      progress: '71%',
      sparkline: 'M0,18 L25,15 L50,16 L75,12 L100,10'
    },
    { 
      id: 3, 
      title: 'Reduce design review cycle time', 
      description: 'Move from 7.2 days to under 3.5 days via async...', 
      status: 'Pending Approval',
      planned: '50',
      actual: '34',
      weight: '20%',
      uom: 'Percentage',
      progress: '68%',
      sparkline: 'M0,16 L30,12 L60,14 L100,9'
    },
    { 
      id: 4, 
      title: 'Mentor two junior designers to L3', 
      description: 'Weekly 1:1s, portfolio reviews, mid-quarter calibrati...', 
      status: 'In Progress',
      planned: '2',
      actual: '1',
      weight: '10%',
      uom: 'Numeric',
      progress: '50%',
      sparkline: 'M0,19 L33,15 L66,16 L100,12'
    }
  ]);

  const comments = [
    { author: 'Aanya Mehta', role: 'EMPLOYEE', text: 'Shipped tokens to product surfaces 1 & 2. Migrating surface 3 next sprint.', time: 'Today' },
    { author: 'Devon Park', role: 'MANAGER', text: "Excellent. Let's pull a11y audit one week earlier if possible.", time: 'Yesterday' },
    { author: 'Aanya Mehta', role: 'EMPLOYEE', text: 'Logged research synthesis for NPS goal. Two onboarding exp...', time: '3 days ago' },
    { author: 'Devon Park', role: 'MANAGER', text: 'On-track overall. Tighten the review cycle metric in next check-in.', time: '1 week ago' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-8 border-b border-slate-100">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">Q2 FY26 &middot; WEEK 6</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Quarterly check-in</h2>
          <p className="text-slate-600 text-lg">Reflect on planned vs actual. Update KPIs, log learnings, share blockers with your manager.</p>
        </div>
        <Button className="bg-white text-slate-900 border border-slate-200 shadow-sm hover:bg-slate-50 font-bold rounded-full px-8 py-6 text-md transition-all">
          Save check-in
        </Button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
        
        {/* Goals List */}
        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-indigo-600 mt-1"><Target className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xl mb-1">{goal.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{goal.description}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider", 
                  goal.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 
                  goal.status === 'Approved' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                  'bg-orange-50 text-orange-700 border border-orange-100'
                )}>
                  {goal.status}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">PLANNED</p>
                  <p className="font-bold text-slate-900 text-lg">{goal.planned}</p>
                </div>
                <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">ACTUAL</p>
                  <p className="font-bold text-slate-900 text-lg">{goal.actual}</p>
                </div>
                <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">WEIGHT</p>
                  <p className="font-bold text-slate-900 text-lg">{goal.weight}</p>
                </div>
                <div className="border border-slate-100 rounded-2xl p-5 bg-white">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">UOM</p>
                  <p className="font-bold text-slate-900 text-lg">{goal.uom}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mb-4 pr-2">
                <span className="font-extrabold text-slate-900 text-sm">{goal.progress}</span>
                <svg width="60" height="20" viewBox="0 0 100 20" className="stroke-indigo-600 fill-none stroke-[3px] stroke-linecap-round stroke-linejoin-round">
                  <path d={goal.sparkline} />
                </svg>
              </div>

              <textarea 
                placeholder="What progressed this period? Any blockers?" 
                className="w-full border border-slate-200 rounded-2xl p-5 text-sm font-medium resize-none h-24 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none placeholder:text-slate-400 transition-all"
              ></textarea>
            </div>
          ))}
        </div>

        {/* Comment History Sidebar */}
        <div className="hidden xl:block">
          <div className="sticky top-6 border border-slate-200 rounded-3xl p-6 bg-white shadow-sm flex flex-col h-[calc(100vh-120px)] max-h-[800px]">
            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="font-extrabold text-slate-900 text-xl">Comment history</h3>
              <MessageSquare className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {comments.map((comment, i) => (
                <div key={i} className="space-y-1.5 px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{comment.author}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{comment.role}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{comment.text}</p>
                  <p className="text-slate-400 text-xs font-medium">{comment.time}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <textarea 
                placeholder="Add a comment to the timeline..."
                className="w-full border border-slate-200 rounded-2xl p-4 text-sm font-medium resize-none h-24 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none placeholder:text-slate-400 transition-all"
              ></textarea>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
