import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Target, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function QuarterlyCheckin() {
  const [goals, setGoals] = useState([]);
  const [checkInText, setCheckInText] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState("Q2 FY26");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/goals/user/U301');
        const data = await response.json();
        if (data.status === 'success') {
          const mapped = data.data.map(g => ({
             id: g.id,
             title: g.title,
             description: g.description,
             status: g.status,
             planned: g.target,
             actual: 'On track', // Mock logic for actual 
             weight: `${g.weightage}%`,
             uom: g.uom,
             progress: '0%', // Mock
             sparkline: 'M0,15 L20,13 L40,14 L60,10 L80,11 L100,8',
             cycle: g.cycle || 'Q2 FY26'
          }));
          setGoals(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch goals", err);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/comments/user/U301');
        const data = await response.json();
        if (data.status === 'success') {
          setComments(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };
    fetchGoals();
    fetchComments();
  }, []);

  const saveCheckin = async () => {
    setIsSaving(true);
    try {
      for (const goal of goals) {
        if (checkInText[goal.id]) {
          await fetch('http://127.0.0.1:8000/api/check-ins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              goal_id: goal.id,
              user_id: 'U301',
              actual_value: 'On track', // Mock
              status: 'Completed', // Mock
              comments: checkInText[goal.id]
            })
          });
        }
      }
      alert('Check-ins saved successfully!');
      setCheckInText({});
    } catch (err) {
      console.error(err);
      alert('Failed to save check-ins.');
    } finally {
      setIsSaving(false);
    }
  };

  const postComment = async () => {
    if (!newComment.trim()) return;
    setIsPosting(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'U301',
          author_id: 'U301', // Employee is logged in
          text: newComment
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setComments([...comments, data.data]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
      alert('Failed to post comment.');
    } finally {
      setIsPosting(false);
    }
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-[1400px] mx-auto pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-start mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute top-0 right-40 w-64 h-64 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[80px] -z-10"></div>
        <div className="max-w-2xl">
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Q2 FY26 &middot; WEEK 6</p>
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">Quarterly check-in</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">Reflect on planned vs actual. Update KPIs, log learnings, share blockers with your manager.</p>
        </div>
        <Button 
          onClick={saveCheckin}
          disabled={isSaving}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/20 dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-700 font-black rounded-2xl px-10 py-7 text-md transition-all transform hover:scale-105"
        >
          {isSaving ? "Saving..." : "Save check-in"}
        </Button>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        
        {/* Goals List Area */}
        <div className="flex flex-col gap-6">
          {/* Cycle Dropdown */}
          <motion.div variants={itemVariants} className="flex justify-between items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-6 shadow-lg shadow-slate-200/20 dark:shadow-none">
             <h3 className="font-black text-slate-900 dark:text-white text-2xl pl-2">Goals for {selectedCycle}</h3>
             <div className="relative">
               <select 
                  value={selectedCycle} 
                  onChange={e => setSelectedCycle(e.target.value)}
                  className="px-6 py-3 pr-12 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-[15px] font-black bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all cursor-pointer appearance-none shadow-sm"
               >
                  {[...new Set(goals.map(g => g.cycle || 'Uncategorized'))].map(c => (
                     <option key={c} value={c}>{c}</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" strokeWidth={3} />
             </div>
          </motion.div>

          {/* Goals List */}
          <div className="space-y-6">
            <AnimatePresence>
              {goals.filter(g => (g.cycle || 'Uncategorized') === selectedCycle).map((goal) => (
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  key={goal.id} 
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 lg:p-10 shadow-lg shadow-slate-200/20 dark:shadow-none transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/5 rounded-full blur-[40px] -z-10 group-hover:bg-indigo-400/10 transition-colors"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-800/50 shadow-inner group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-2xl mb-2">{goal.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-[15px] font-semibold max-w-xl">{goal.description}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-sm whitespace-nowrap", 
                      goal.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800/50' : 
                      goal.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 
                      'bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                    )}>
                      {goal.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                    <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">PLANNED</p>
                      <p className="font-black text-slate-900 dark:text-white text-2xl">{goal.planned}</p>
                    </div>
                    <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">ACTUAL</p>
                      <p className="font-black text-slate-900 dark:text-white text-2xl">{goal.actual}</p>
                    </div>
                    <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">WEIGHT</p>
                      <p className="font-black text-slate-900 dark:text-white text-2xl">{goal.weight}</p>
                    </div>
                    <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">UOM</p>
                      <p className="font-black text-slate-900 dark:text-white text-2xl">{goal.uom}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 mb-6 pr-4">
                    <span className="font-black text-slate-900 dark:text-white text-lg">{goal.progress}</span>
                    <svg width="80" height="24" viewBox="0 0 100 20" className="stroke-indigo-600 dark:stroke-indigo-400 fill-none stroke-[4px] stroke-linecap-round stroke-linejoin-round drop-shadow-[0_2px_4px_rgba(79,70,229,0.3)]">
                      <path d={goal.sparkline} />
                    </svg>
                  </div>

                  <textarea 
                    value={checkInText[goal.id] || ''}
                    onChange={(e) => setCheckInText({...checkInText, [goal.id]: e.target.value})}
                    placeholder="What progressed this period? Any blockers?" 
                    className="w-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-[24px] p-6 text-[15px] font-semibold text-slate-900 dark:text-white resize-none min-h-[140px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-sm backdrop-blur-md"
                  ></textarea>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Comment History Sidebar */}
        <motion.div variants={itemVariants} className="hidden xl:block">
          <div className="sticky top-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col h-[calc(100vh-120px)] max-h-[900px]">
            <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-black text-slate-900 dark:text-white text-2xl">Comment history</h3>
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-slate-500 dark:text-slate-400" strokeWidth={2.5} />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {comments.map((comment, i) => (
                <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-[20px] p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className={cn("w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-sm", comment.role === 'EMPLOYEE' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-indigo-500 shadow-indigo-500/50')}></div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-black text-slate-900 dark:text-white text-sm">{comment.author_name}</span>
                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{comment.role}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[14px] leading-relaxed font-semibold mb-3">{comment.text}</p>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{formatTime(comment.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-4">
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment to the timeline..."
                className="w-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-[24px] p-5 text-[15px] font-semibold text-slate-900 dark:text-white resize-none min-h-[120px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 outline-none placeholder:text-slate-400 transition-all shadow-sm backdrop-blur-md"
              ></textarea>
              <Button 
                onClick={postComment}
                disabled={isPosting || !newComment.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-xl py-6 text-[15px] transition-all shadow-lg shadow-indigo-500/25"
              >
                {isPosting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
