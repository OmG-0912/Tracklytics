import { useState, useEffect } from 'react';
import { Lock, RefreshCw, Plus } from 'lucide-react';
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

export default function SharedGoals() {
  const role = localStorage.getItem('role') || 'employee';

  const [sharedKPIs, setSharedKPIs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [newKPI, setNewKPI] = useState({
    title: '',
    audience: 'All Employees',
    uom: 'Numeric',
    target: '',
    weight: 10
  });

  const handlePushKPI = async () => {
    setIsPushing(true);
    try {
      const response = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/shared-kpis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newKPI,
          pushedBy: 'Priya Raman' // Default admin name for demo
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        const kpi = data.data;
        const mapped = {
          id: kpi.id,
          title: kpi.title,
          audience: kpi.audience,
          syncStatus: kpi.syncStatus,
          uom: kpi.uom,
          target: kpi.target,
          weight: kpi.weight,
          pushedBy: kpi.pushedBy,
          employeesSynced: '1,284'
        };
        setSharedKPIs([mapped, ...sharedKPIs]);
        setIsModalOpen(false);
        setNewKPI({ title: '', audience: 'All Employees', uom: 'Numeric', target: '', weight: 10 });
      }
    } catch (err) {
      console.error("Failed to push KPI", err);
    }
    setIsPushing(false);
  };

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/shared-kpis');
        const data = await response.json();
        if (data.status === 'success') {
          // Map to match the frontend expected structure
          const mapped = data.data.map(kpi => ({
            id: kpi.id,
            title: kpi.title,
            audience: kpi.audience,
            syncStatus: kpi.syncStatus,
            uom: kpi.uom,
            target: kpi.target,
            weight: kpi.weight,
            pushedBy: kpi.pushedBy,
            employeesSynced: '1,284' // Mock value for display
          }));
          setSharedKPIs(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch KPIs", err);
      }
    };
    fetchKPIs();
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-end mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="absolute top-0 right-10 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[80px] -z-10"></div>
        <div>
          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">SHARED KPIS</p>
          <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">Departmental & org-wide goals</h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-3xl">
            Push KPIs to teams. Lock fields so employees can only adjust weightage.
          </p>
        </div>
        {role !== 'employee' && (
          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-2xl px-8 py-7 shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-105">
            <Plus className="w-5 h-5 mr-2" strokeWidth={3} />
            Push new KPI
          </Button>
        )}
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence>
          {sharedKPIs.map((goal) => (
            <motion.div 
              key={goal.id} 
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-8 shadow-lg shadow-slate-200/20 dark:shadow-none flex flex-col group"
            >
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8">
                <div className="max-w-[70%]">
                  <h4 className="font-black text-slate-900 dark:text-white text-3xl mb-2 leading-tight">{goal.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold leading-snug flex items-center gap-2">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Pushed by {goal.pushedBy || 'Admin'}</span> &middot; {goal.audience}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5 animate-[spin_4s_linear_infinite]" strokeWidth={3} />
                  <span className="text-[11px] font-black uppercase tracking-wider">{goal.syncStatus}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-5 mb-8">
                {/* UOM Block */}
                <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                  <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">UOM</p>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-2xl">
                    <span className="truncate">{goal.uom}</span>
                    {role !== 'admin' && <Lock className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" strokeWidth={3} />}
                  </div>
                </div>

                {/* TARGET Block */}
                <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-[24px] p-6 bg-white/50 dark:bg-slate-800/50 shadow-sm">
                  <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">TARGET</p>
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-2xl">
                    {goal.target}
                    {role !== 'admin' && <Lock className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" strokeWidth={3} />}
                  </div>
                </div>

                {/* WEIGHT Block */}
                <div className={cn("border rounded-[24px] p-6 transition-colors shadow-sm", role !== 'employee' ? "border-indigo-200/80 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-900/20" : "border-slate-200/50 bg-white/50 dark:border-slate-700/50 dark:bg-slate-800/50")}>
                  <p className={cn("text-[10px] font-extrabold uppercase tracking-widest mb-2", role !== 'employee' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400")}>
                    {role !== 'employee' ? 'WEIGHT (EDITABLE)' : 'WEIGHT'}
                  </p>
                  <div className="flex items-center gap-2">
                    {role !== 'employee' ? (
                      <input 
                        type="number" 
                        defaultValue={goal.weight} 
                        className="w-[80px] px-3 py-2 border border-indigo-300 dark:border-indigo-500/50 rounded-xl text-indigo-900 dark:text-indigo-300 font-black text-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 bg-white dark:bg-slate-800 shadow-inner" 
                      />
                    ) : (
                      <span className="text-slate-900 dark:text-white font-black text-2xl flex items-center gap-2">
                        {goal.weight}
                        <Lock className="w-4 h-4 text-slate-300 dark:text-slate-600" strokeWidth={3} />
                      </span>
                    )}
                    <span className={cn("font-black text-2xl", role !== 'employee' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-900 dark:text-white")}>%</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mt-auto flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></span>
                Synced across {goal.employeesSynced} employees &middot; auto-locked
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-lg overflow-hidden"
            >
              <div className="p-10 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Push new KPI</h3>
                <p className="text-slate-500 dark:text-slate-400 text-[15px] font-semibold mt-2">Deploy a mandatory goal across the organization.</p>
              </div>
              <div className="p-10 space-y-8">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">KPI Title</label>
                  <input type="text" value={newKPI.title} onChange={e => setNewKPI({...newKPI, title: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm" placeholder="e.g. Org-wide eNPS >= 60" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Target</label>
                    <input type="text" value={newKPI.target} onChange={e => setNewKPI({...newKPI, target: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm" placeholder="e.g. 60" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">UOM</label>
                    <select value={newKPI.uom} onChange={e => setNewKPI({...newKPI, uom: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm appearance-none">
                      <option>Numeric</option>
                      <option>Percentage</option>
                      <option>Zero-based</option>
                      <option>Currency</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Audience</label>
                    <select value={newKPI.audience} onChange={e => setNewKPI({...newKPI, audience: e.target.value})} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm appearance-none">
                      <option>All Employees</option>
                      <option>Engineering</option>
                      <option>Sales</option>
                      <option>Design</option>
                      <option>Product</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Default Weight (%)</label>
                    <input type="number" value={newKPI.weight} onChange={e => setNewKPI({...newKPI, weight: parseInt(e.target.value) || 0})} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 shadow-sm" />
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50/80 dark:bg-slate-800/80 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-end gap-4">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="font-extrabold text-slate-500 hover:text-slate-900 dark:hover:text-white px-6 py-5 rounded-xl">Cancel</Button>
                <Button onClick={handlePushKPI} disabled={isPushing || !newKPI.title || !newKPI.target} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-xl px-10 py-6 shadow-lg shadow-indigo-500/30 transition-all">
                  {isPushing ? "Pushing..." : "Push KPI to org"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
