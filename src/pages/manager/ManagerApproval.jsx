import { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, AlertTriangle, Filter, ChevronDown, ChevronUp, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ManagerApproval() {
  const [expandedId, setExpandedId] = useState(1);
  const [team, setTeam] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const role = localStorage.getItem('role') || 'manager';

  useEffect(() => {
    const fetchTeamAndGoals = async () => {
      try {
        // Fetch all users and filter by managerId (e.g. U201) unless admin
        const userRes = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/users');
        const userData = await userRes.json();
        let teamUsers = [];
        if (userData.status === 'success') {
           teamUsers = role === 'admin' ? userData.data : userData.data.filter(u => u.managerId === 'U201');
        }

        // Fetch team goals
        const goalsUrl = role === 'admin' ? (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/goals' : (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/goals/team/U201';
        const goalsRes = await fetch(goalsUrl);
        const goalsData = await goalsRes.json();
        const teamGoals = goalsData.status === 'success' ? goalsData.data : [];

        // Fetch comments for all team members
        const commentsPromises = teamUsers.map(u => fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/comments/user/${u.id}`).then(res => res.json()));
        const commentsResponses = await Promise.all(commentsPromises);
        const teamCommentsMap = {};
        teamUsers.forEach((u, index) => {
          if (commentsResponses[index].status === 'success') {
             teamCommentsMap[u.id] = commentsResponses[index].data;
          } else {
             teamCommentsMap[u.id] = [];
          }
        });

        // Combine
        const mappedTeam = teamUsers.map(user => {
          const userGoals = teamGoals.filter(g => g.user_id === user.id);
          const mappedGoals = userGoals.map(g => {
            let statusColor = 'text-blue-600 border-blue-200 bg-white/50 dark:text-blue-400 dark:border-blue-800 dark:bg-slate-800/50';
            if (g.status === 'Approved') statusColor = 'text-emerald-600 border-emerald-200 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-900/20';
            if (g.status === 'Pending Approval') statusColor = 'text-amber-600 border-amber-200 bg-amber-50/50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-900/20';
            if (g.status === 'Rework Required') statusColor = 'text-rose-600 border-rose-200 bg-rose-50/50 dark:text-rose-400 dark:border-rose-800 dark:bg-rose-900/20';

            return {
              id: g.id,
              title: g.title,
              status: g.status,
              statusColor,
              weight: `${g.weightage}%`,
              uom: g.uom,
              target: g.target,
              progress: '0%', // Mock
              desc: g.description
            };
          });

          return {
            id: user.id,
            name: user.name,
            title: user.title,
            status: 'On Track', // Mock
            statusColor: 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
            stats: { 
              pending: userGoals.filter(g => g.status === 'Pending Approval').length, 
              approved: userGoals.filter(g => g.status === 'Approved').length, 
              done: 0, 
              completion: 50 
            },
            goals: mappedGoals,
            comments: teamCommentsMap[user.id] || []
          };
        });
        
        setTeam(mappedTeam);
        if (mappedTeam.length > 0) setExpandedId(mappedTeam[0].id);
      } catch (err) {
        console.error("Failed to fetch team data", err);
      }
    };
    fetchTeamAndGoals();
  }, [role]);

  const updateGoalStatus = async (goalId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/api/goals/${goalId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Optimistically update the UI
        setTeam(team.map(member => ({
          ...member,
          goals: member.goals.map(g => g.id === goalId ? {
             ...g, 
             status: newStatus,
             statusColor: newStatus === 'Approved' ? 'text-emerald-600 border-emerald-200 bg-emerald-50/50 dark:text-emerald-400 dark:border-emerald-800 dark:bg-emerald-900/20' : 'text-amber-600 border-amber-200 bg-amber-50/50 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-900/20'
          } : g),
          stats: {
             ...member.stats,
             pending: member.goals.filter(g => g.id !== goalId && g.status === 'Pending Approval').length + (newStatus === 'Pending Approval' ? 1 : 0),
             approved: member.goals.filter(g => g.id !== goalId && g.status === 'Approved').length + (newStatus === 'Approved' ? 1 : 0)
          }
        })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const postComment = async (userId) => {
    const text = newComments[userId];
    if (!text || !text.trim()) return;
    setIsPosting(true);
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          author_id: 'U201', // Manager is logged in
          text: text
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setTeam(team.map(member => 
          member.id === userId 
            ? { ...member, comments: [...member.comments, data.data] } 
            : member
        ));
        setNewComments({ ...newComments, [userId]: '' });
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
      className="pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute top-0 right-20 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -z-10"></div>
        <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
          {role === 'admin' ? 'ADMIN WORKSPACE' : 'MANAGER WORKSPACE'}
        </p>
        <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">Team goal approvals</h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-3xl">Review submitted goals, leave coaching feedback, and approve or return for rework.</p>
      </motion.div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-[80px] leading-tight">DIRECT REPORTS</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-700/50 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Users size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">5</h3>
              <span className="text-emerald-500 font-extrabold text-sm bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">↗ 0%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">active in cycle</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-[80px] leading-tight">AWAITING REVIEW</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/40 flex items-center justify-center text-amber-500 dark:text-amber-400 border border-amber-200/50 dark:border-amber-700/50 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Clock size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">4</h3>
              <span className="text-rose-500 font-extrabold text-sm bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg">↘ 2%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">SLA: 5 days</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-[80px] leading-tight">APPROVED THIS WEEK</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-700/50 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <CheckCircle size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">9</h3>
              <span className="text-emerald-500 font-extrabold text-sm bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">↗ 3%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">last 7 days</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ y: -6 }} className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-7 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-[80px] leading-tight">RETURNED FOR REWORK</p>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/40 flex items-center justify-center text-rose-500 dark:text-rose-400 border border-rose-200/50 dark:border-rose-700/50 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle size={20} strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white">2</h3>
              <span className="text-rose-500 font-extrabold text-sm bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-lg">↘ 1%</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">last 7 days</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-2 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-sm w-fit">
        <div className="bg-slate-100/80 dark:bg-slate-800/80 p-2 rounded-xl">
          <Filter className="w-5 h-5 text-slate-500 dark:text-slate-400" strokeWidth={2.5} />
        </div>
        {['All', 'Pending', 'Approved', 'Returned'].map(filterLabel => {
          const filterValueMap = {
            'All': 'All',
            'Pending': 'Pending Approval',
            'Approved': 'Approved',
            'Returned': 'Rework Required'
          };
          const isActive = activeFilter === filterValueMap[filterLabel];
          return (
            <button 
              key={filterLabel}
              onClick={() => setActiveFilter(filterValueMap[filterLabel])}
              className={cn(
                "px-6 py-2.5 rounded-xl font-extrabold text-sm shadow-sm transition-all",
                isActive 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-900 dark:border-white shadow-md" 
                  : "bg-white/50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {filterLabel}
            </button>
          );
        })}
      </motion.div>

      {/* List */}
      <motion.div variants={containerVariants} className="space-y-6">
        {(() => {
          // Filter team and their goals based on activeFilter
          const filteredTeam = team.map(member => {
            if (activeFilter === 'All') return member;
            return {
              ...member,
              goals: member.goals.filter(g => g.status === activeFilter)
            };
          }).filter(member => activeFilter === 'All' || member.goals.length > 0);

          if (filteredTeam.length === 0) {
            return (
              <motion.div variants={itemVariants} className="text-center py-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[32px] border border-white/40 dark:border-slate-700/50 shadow-lg shadow-slate-200/20 dark:shadow-none">
                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No team members match this filter.</p>
              </motion.div>
            );
          }

          return filteredTeam.map((member) => {
          const isExpanded = expandedId === member.id;
          return (
            <motion.div variants={itemVariants} key={member.id} className={cn("bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] shadow-lg shadow-slate-200/20 dark:shadow-none transition-all overflow-hidden", isExpanded ? "border-indigo-200 dark:border-indigo-800 shadow-xl" : "hover:border-indigo-200/50 dark:hover:border-indigo-800/50")}>
              
              {/* Accordion Header */}
              <div 
                className={cn("p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors gap-6 md:gap-0", isExpanded ? "bg-white/80 dark:bg-slate-800/80" : "hover:bg-white/80 dark:hover:bg-slate-800/80")}
                onClick={() => setExpandedId(isExpanded ? null : member.id)}
              >
                <div className="flex items-center gap-5">
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl border border-slate-200/50 dark:border-slate-700 shadow-sm" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-black text-slate-900 dark:text-white text-xl">{member.name}</h4>
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider", member.statusColor)}>
                        {member.status}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm mt-1">{member.title}</p>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10 pl-20 md:pl-0">
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">PENDING</p>
                      <p className="font-black text-amber-500 text-2xl">{member.stats.pending}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">APPROVED</p>
                      <p className="font-black text-indigo-600 dark:text-indigo-400 text-2xl">{member.stats.approved}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">DONE</p>
                      <p className="font-black text-emerald-500 text-2xl">{member.stats.done}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 md:border-l border-slate-200/80 dark:border-slate-700 md:pl-10">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Completion</span>
                      <span className="font-black text-slate-900 dark:text-white text-xl">{member.stats.completion}%</span>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-center">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" strokeWidth={3} /> : <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && member.goals && member.goals.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-200/50 dark:border-slate-700/50 p-6 md:p-10 flex flex-col xl:flex-row gap-12 bg-white/40 dark:bg-slate-900/40"
                  >
                    
                    {/* Left: Goals */}
                    <div className="flex-[2]">
                      <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">SUBMITTED GOALS &middot; Q2 FY26</p>
                      <div className="space-y-5">
                        {member.goals.map((goal, i) => (
                          <div key={i} className="border border-slate-200/80 dark:border-slate-700/80 rounded-[24px] p-7 hover:shadow-lg transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-md relative group">
                            <div className="absolute right-7 top-7">
                              <span className="font-black text-indigo-700 dark:text-indigo-400 text-xl bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-xl">{goal.weight}</span>
                            </div>
                            
                            <div className="flex items-start gap-4 mb-5 pr-16">
                              <h5 className="font-black text-slate-900 dark:text-white text-xl leading-snug">{goal.title}</h5>
                              <span className={cn("px-3 py-1.5 rounded-full text-[10px] font-black border whitespace-nowrap mt-1 tracking-wider uppercase", goal.statusColor)}>
                                {goal.status}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-[14px] font-medium leading-relaxed mb-8 max-w-xl">{goal.desc}</p>
                            
                            <div className="grid grid-cols-3 gap-6">
                              <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">UOM</p>
                                <p className="font-black text-slate-900 dark:text-white text-sm">{goal.uom}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">TARGET</p>
                                <p className="font-black text-slate-900 dark:text-white text-sm">{goal.target}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">PROGRESS</p>
                                <p className="font-black text-slate-900 dark:text-white text-sm">{goal.progress}</p>
                              </div>
                            </div>

                            {/* Quick Approve/Rework for individual goals if pending */}
                            {goal.status === 'Pending Approval' && (
                              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
                                <Button 
                                  onClick={() => updateGoalStatus(goal.id, 'Approved')}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl px-5 transition-all shadow-sm shadow-emerald-500/20"
                                >
                                  Approve Goal
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => updateGoalStatus(goal.id, 'Rework Required')}
                                  className="border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400 font-extrabold rounded-xl px-5 transition-all"
                                >
                                  Request Rework
                                </Button>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Feedback */}
                    <div className="flex-1 flex flex-col">
                      <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <MessageSquare size={14} /> CONVERSATION
                      </p>
                      
                      <div className="flex-1 max-h-[450px] overflow-y-auto pr-2 mb-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        {member.comments.length > 0 ? member.comments.map((comment, i) => (
                          <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-[20px] p-5 shadow-sm">
                            <div className="flex gap-4">
                              <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 shadow-sm", comment.role === 'MANAGER' ? 'bg-indigo-500 shadow-indigo-500/50' : 'bg-emerald-500 shadow-emerald-500/50')}></div>
                              <div>
                                <div className="flex items-center gap-2.5 mb-1.5">
                                  <p className="font-extrabold text-slate-900 dark:text-white text-sm">{comment.author_name}</p>
                                  <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{comment.role}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-semibold mb-3">{comment.text}</p>
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{formatTime(comment.timestamp)}</p>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-700/50 rounded-[20px] p-10 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold italic">No comments yet. Start the conversation to provide guidance!</p>
                          </div>
                        )}
                      </div>

                      <div className="relative mt-auto flex flex-col gap-3">
                        <textarea 
                          value={newComments[member.id] || ''}
                          onChange={(e) => setNewComments({...newComments, [member.id]: e.target.value})}
                          className="w-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-[20px] p-5 pb-12 text-[15px] font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 resize-none min-h-[140px] shadow-sm backdrop-blur-md transition-all"
                          placeholder="Leave coaching feedback or reply..."
                        ></textarea>
                        
                        {/* AI Coaching Assistant Button */}
                        <div className="absolute bottom-20 left-4">
                          <button
                            type="button"
                            onClick={() => {
                              const pendingGoals = member.goals.filter(g => g.status === 'Pending Approval');
                              const text = pendingGoals.length > 0
                                ? `Hi ${member.name}, I reviewed your goals. For "${pendingGoals[0].title}", consider adding a slightly more aggressive timeline to align with the Q2 launch. Let's discuss in our 1:1.`
                                : `Hi ${member.name}, great progress on your goals so far! Keep up the momentum, and let me know if you run into any blockers this week.`;
                                
                              setNewComments({...newComments, [member.id]: "Generating insights..."});
                              setTimeout(() => {
                                setNewComments({...newComments, [member.id]: text});
                              }, 1500);
                            }}
                            className="bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/30 font-extrabold text-[11px] uppercase tracking-wider rounded-xl px-3 py-1.5 flex items-center gap-2 transition-all shadow-sm"
                          >
                            <Sparkles size={14} /> AI Coaching
                          </button>
                        </div>

                        <Button 
                          onClick={() => postComment(member.id)}
                          disabled={isPosting || !newComments[member.id]?.trim() || newComments[member.id] === "Generating insights..."}
                          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-xl py-6 text-[15px] transition-all shadow-lg shadow-indigo-500/25 mt-2"
                        >
                          {isPosting ? "Posting..." : "Post Comment"}
                        </Button>
                      </div>

                      <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-[20px] p-5 mt-6">
                        <p className="text-[11px] font-extrabold text-indigo-500 dark:text-indigo-400 w-full mb-3 uppercase tracking-widest">BULK ACTIONS (PENDING GOALS ONLY)</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button 
                            variant="outline"
                            className="text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-600 hover:text-white dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-600 font-extrabold text-xs rounded-xl h-9 px-4 transition-all"
                            onClick={() => {
                              const pending = member.goals.filter(g => g.status === 'Pending Approval');
                              pending.forEach(g => updateGoalStatus(g.id, 'Approved'));
                            }}
                          >Approve All Pending</Button>
                          <Button 
                            variant="outline"
                            className="text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-500 hover:text-white dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-600 font-extrabold text-xs rounded-xl h-9 px-4 transition-all"
                            onClick={() => {
                              const pending = member.goals.filter(g => g.status === 'Pending Approval');
                              pending.forEach(g => updateGoalStatus(g.id, 'Rework Required'));
                            }}
                          >Rework All Pending</Button>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        });
      })()}
      </motion.div>
    </motion.div>
  );
}
