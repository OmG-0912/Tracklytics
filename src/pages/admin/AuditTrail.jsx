import { useState, useEffect } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const getRoleColor = (role) => {
  switch (role.toLowerCase()) {
    case 'admin': return 'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20';
    case 'manager': return 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20';
    case 'employee': return 'text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-900/20';
    default: return 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20';
  }
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

export default function AuditTrail() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Admin', 'Manager', 'Employee', 'System'];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/audit-logs')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const logsWithColors = data.data.map(log => ({
            ...log,
            roleColor: getRoleColor(log.role)
          }));
          setLogs(logsWithColors);
          if (logsWithColors.length > 0) {
            setSelectedLog(logsWithColors[0]);
          }
        }
      })
      .catch(err => console.error('Failed to fetch audit logs:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLogs = logs.filter(log => {
    if (activeFilter === 'All') return true;
    return log.role.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px] -z-10"></div>
        <div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">GOVERNANCE</p>
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">
            Audit trail
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
            Every change is logged — user, action, modified field, and timestamp.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl px-6 py-6 border-slate-200/80 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-slate-700 dark:text-slate-200 font-extrabold hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export logs
        </Button>
      </motion.div>

      {/* Toolbar Container */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center border border-white/40 dark:border-slate-700/50 rounded-full p-2 mb-10 shadow-lg shadow-slate-200/20 dark:shadow-none bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl w-full overflow-hidden">
        
        {/* Search */}
        <div className="relative flex-1 w-full flex items-center min-w-[300px]">
          <Search className="absolute left-5 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by user, action, target, field..." 
            className="w-full pl-14 pr-16 py-3 bg-transparent border-0 text-[15px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0"
          />
          <div className="absolute right-5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[11px] font-bold font-mono shadow-sm">
            ⌘ K
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-10 bg-slate-200/80 dark:bg-slate-700 mx-2"></div>

        {/* Filters */}
        <div className="flex items-center w-full lg:w-auto px-4 overflow-x-auto py-2 lg:py-0">
          <Filter className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 mr-4" />
          <div className="flex gap-2">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  // Update selected log when filter changes if not in new filtered list
                  const newFiltered = logs.filter(l => filter === 'All' || l.role.toLowerCase() === filter.toLowerCase());
                  if (newFiltered.length > 0 && (!selectedLog || !newFiltered.find(l => l.id === selectedLog.id))) {
                    setSelectedLog(newFiltered[0]);
                  } else if (newFiltered.length === 0) {
                    setSelectedLog(null);
                  }
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-extrabold whitespace-nowrap transition-all border",
                  activeFilter === filter 
                    ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-md" 
                    : "bg-white/50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid Layout */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 font-bold">Loading audit logs...</div>
      ) : filteredLogs.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-bold">No audit logs found for this filter.</div>
      ) : (
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
          
          {/* Left Panel: Table */}
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/20 dark:shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">USER</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">ACTION</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">MODIFIED FIELD</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                  <AnimatePresence>
                    {filteredLogs.map((log) => (
                      <motion.tr 
                        key={log.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn("cursor-pointer transition-colors group", selectedLog?.id === log.id ? "bg-white/80 dark:bg-slate-800/80 shadow-sm" : "hover:bg-white/50 dark:hover:bg-slate-800/40")}
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border", log.roleColor)}>
                              {log.role}
                            </span>
                            <span className="font-extrabold text-slate-900 dark:text-white text-[15px] truncate max-w-[120px]">
                              {log.user.length > 7 ? log.user.substring(0, 5) + '...' : log.user}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 font-bold text-slate-700 dark:text-slate-300 text-[15px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {log.action}
                        </td>
                        <td className="px-8 py-5">
                          <span className="font-mono text-[13px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors">
                            {log.field.length > 20 ? log.field.substring(0, 16) + '...' : log.field}
                          </span>
                        </td>
                        <td className="px-8 py-5 font-mono text-[13px] font-bold text-slate-500 dark:text-slate-500">
                          {log.timestamp}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Detail View */}
          <AnimatePresence mode="wait">
            {selectedLog && (
              <motion.div 
                key={selectedLog.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-10 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col h-fit relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[40px] -z-10"></div>
                
                <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">ACTIVITY DETAIL</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3 leading-tight">{selectedLog.action}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-[15px] font-semibold leading-relaxed mb-8 pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
                  {selectedLog.target}
                </p>

                <div className="space-y-6">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0">User</span>
                    <span className="text-slate-900 dark:text-white font-black text-sm text-right">{selectedLog.user}</span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0">Role</span>
                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border", selectedLog.roleColor)}>
                      {selectedLog.role}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0">Field</span>
                    <span className="font-mono text-[13px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                      {selectedLog.field}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0">Timestamp</span>
                    <span className="font-mono text-[13px] font-bold text-slate-700 dark:text-slate-300 text-right">{selectedLog.timestamp}</span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold text-sm shrink-0">IP</span>
                    <span className="font-mono text-[13px] font-bold text-slate-700 dark:text-slate-300 text-right">{selectedLog.ip}</span>
                  </div>
                </div>

                <div className="mt-10 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
                  <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 leading-relaxed">
                    Audit entries are immutable. Export compliant format for SOC 2 review.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
