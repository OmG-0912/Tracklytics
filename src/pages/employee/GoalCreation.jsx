import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronRight, ChevronLeft, Check, Sparkles, Target } from 'lucide-react';
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

export default function GoalCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCycle, setSelectedCycle] = useState('Q2 FY26');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [goals, setGoals] = useState([
    { id: 1, title: '', description: '', uom: 'Timeline', target: '', weight: 0 }
  ]);

  const addGoal = () => {
    if (goals.length < 8) {
      setGoals([...goals, { id: Date.now(), title: '', description: '', uom: 'Timeline', target: '', weight: 0 }]);
    }
  };

  const removeGoal = (id) => {
    if (goals.length > 1) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const updateGoal = (id, field, value) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const totalWeight = goals.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
  const isValid = totalWeight === 100 && goals.every(g => g.title && g.target && g.weight > 0);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitGoals = async () => {
    setIsSubmitting(true);
    try {
      for (const g of goals) {
        if (!g.title || !g.target) continue;
        const res = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/api/goals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'U301',
            title: g.title,
            description: g.description || '',
            target: g.target,
            uom: g.uom,
            weightage: parseInt(g.weight, 10),
            category: 'Quarterly Goal',
            cycle: selectedCycle
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Server returned ${res.status}: ${errText}`);
        }
      }
      alert('Goals successfully submitted!');
      navigate('/employee/checkin');
    } catch (err) {
      console.error(err);
      alert(`Failed to submit goals. Error: ${err.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-10 pb-12"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="relative mb-10 pb-8 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute top-0 right-20 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[80px] -z-10"></div>
        <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">GOAL CREATION</p>
        <h2 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">Set your goals for the quarter</h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-3xl">Add SMART goals, assign weightage that totals 100%, and submit for manager approval.</p>
      </motion.div>

      {/* Stepper */}
      <motion.div variants={itemVariants} className="flex items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-3 shadow-lg shadow-slate-200/20 dark:shadow-none relative">
        {/* Step 1 */}
        <div 
          onClick={() => { if (currentStep > 1) setCurrentStep(1); }}
          className={cn("flex-1 flex items-center p-4 rounded-3xl transition-all relative z-10", currentStep > 1 ? "cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80" : "", currentStep === 1 ? "bg-white dark:bg-slate-800 shadow-xl border border-white/50 dark:border-slate-700 cursor-default" : "")}
        >
          {currentStep > 1 ? (
             <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0"><Check size={20} strokeWidth={3} /></div>
          ) : (
             <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black mr-4 shrink-0 text-lg", currentStep === 1 ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500")}>1</div>
          )}
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white text-lg">Cycle</p>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-semibold">Pick the quarter & cycle</p>
          </div>
        </div>
        <div className="px-3 text-slate-300 dark:text-slate-600 z-10"><ChevronRight size={24} strokeWidth={2.5} /></div>
        
        {/* Step 2 */}
        <div 
          onClick={() => { if (currentStep > 2) setCurrentStep(2); }}
          className={cn("flex-1 flex items-center p-4 rounded-3xl transition-all relative z-10", currentStep > 2 ? "cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800/80" : "", currentStep === 2 ? "bg-white dark:bg-slate-800 shadow-xl border border-white/50 dark:border-slate-700 cursor-default" : "", currentStep < 2 && "opacity-50 cursor-not-allowed")}
        >
          {currentStep > 2 ? (
             <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 shrink-0"><Check size={20} strokeWidth={3} /></div>
          ) : (
             <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black mr-4 shrink-0 text-lg", currentStep === 2 ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500")}>2</div>
          )}
          <div>
            <p className={cn("font-extrabold text-lg", currentStep >= 2 ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-500")}>Define goals</p>
            <p className={cn("text-[13px] font-semibold", currentStep >= 2 ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-600")}>Add KPIs with weightage</p>
          </div>
        </div>
        <div className="px-3 text-slate-300 dark:text-slate-600 z-10"><ChevronRight size={24} strokeWidth={2.5} /></div>

        {/* Step 3 */}
        <div 
          className={cn("flex-1 flex items-center p-4 rounded-3xl transition-all relative z-10", currentStep === 3 ? "bg-white dark:bg-slate-800 shadow-xl border border-white/50 dark:border-slate-700 cursor-default" : "", !isValid && currentStep !== 3 && "opacity-50 cursor-not-allowed")}
        >
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-black mr-4 shrink-0 text-lg", currentStep === 3 ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500")}>3</div>
          <div>
            <p className={cn("font-extrabold text-lg", currentStep === 3 ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-500")}>Review & submit</p>
            <p className={cn("text-[13px] font-semibold", currentStep === 3 ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-600")}>Sanity-check totals</p>
          </div>
        </div>
      </motion.div>

      {/* Step Content */}
      <div className="min-h-[400px] flex flex-col relative z-0">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-10 shadow-lg shadow-slate-200/20 dark:shadow-none"
            >
              <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">STEP 1 OF 3</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Choose your goal cycle</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26'].map((cycle) => (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    key={cycle}
                    onClick={() => setSelectedCycle(cycle)}
                    className={cn(
                      "p-8 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center relative overflow-hidden",
                      selectedCycle === cycle 
                        ? "border-indigo-600 bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20" 
                        : "border-slate-200/50 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md"
                    )}
                  >
                    {selectedCycle === cycle && (
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    )}
                    <p className={cn("text-[11px] font-black uppercase tracking-widest mb-2 relative z-10", selectedCycle === cycle ? "text-indigo-200" : "text-slate-500 dark:text-slate-400")}>CYCLE</p>
                    <p className={cn("text-3xl font-black relative z-10", selectedCycle === cycle ? "text-white" : "text-slate-900 dark:text-white")}>{cycle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
               {/* Weightage Tracker */}
               <div className={cn("flex items-center justify-between p-6 rounded-[24px] border mb-8 transition-colors duration-300 shadow-sm backdrop-blur-md relative overflow-hidden", totalWeight === 100 ? "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/80 dark:bg-emerald-900/20" : "border-white/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60")}>
                  {totalWeight === 100 && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-[40px] -z-10 pointer-events-none"></div>
                  )}
                  <div className="flex items-center gap-5 relative z-10">
                    <div className={cn("p-3 border shadow-sm rounded-2xl flex items-center justify-center", totalWeight === 100 ? "bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-400" : "bg-white border-slate-200 text-indigo-600 dark:bg-slate-800 dark:border-slate-700 dark:text-indigo-400")}>
                      <Sparkles className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 dark:text-white text-xl">Weightage tracker</h4>
                      <p className="text-[14px] font-semibold text-slate-600 dark:text-slate-400">All goals must sum to exactly 100%.</p>
                    </div>
                  </div>
                  <div className={cn("text-5xl font-black tracking-tight relative z-10", totalWeight === 100 ? "text-emerald-600 dark:text-emerald-400" : totalWeight > 100 ? "text-rose-500 dark:text-rose-400" : "text-slate-900 dark:text-white")}>
                    {totalWeight}%
                  </div>
               </div>

               {/* Goals Table */}
               <div className="border border-white/40 dark:border-slate-700/50 rounded-[32px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none overflow-hidden">
                  <div className="grid grid-cols-[2.5fr_2fr_1.5fr_1fr_1fr_60px] gap-4 p-6 border-b border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-2">Goal Title</div>
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Description</div>
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">UOM</div>
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Target</div>
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Weight</div>
                    <div className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">—</div>
                  </div>

                  <div className="p-4 space-y-4">
                    <AnimatePresence>
                      {goals.map((goal) => (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          key={goal.id} 
                          className="grid grid-cols-[2.5fr_2fr_1.5fr_1fr_1fr_60px] gap-4 items-start px-2 relative group"
                        >
                          <div className="relative">
                            <input 
                              type="text" 
                              value={goal.title}
                              onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                              placeholder="e.g. Ship Design System v3.0" 
                              className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-[15px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-400 shadow-sm"
                            />
                            {/* AI Enhance Button */}
                            <button
                              type="button"
                              onClick={() => {
                                updateGoal(goal.id, 'isEnhancing', true);
                                setTimeout(() => {
                                  updateGoal(goal.id, 'title', goal.title ? `Achieve 100% completion of ${goal.title} by End of Quarter` : 'Reduce initial page load time by 30%');
                                  updateGoal(goal.id, 'description', 'Measurable SMART goal optimized for Q2 FY26 deliverables and alignment with company KPIs.');
                                  updateGoal(goal.id, 'isEnhancing', false);
                                }, 1500);
                              }}
                              disabled={goal.isEnhancing}
                              className="absolute right-2 top-2 bottom-2 px-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors border border-indigo-100 dark:border-indigo-500/30 shadow-sm disabled:opacity-50"
                            >
                              <Sparkles size={14} className={cn(goal.isEnhancing && "animate-spin")} />
                              {goal.isEnhancing ? "Enhancing..." : "AI"}
                            </button>
                          </div>
                          <div>
                            <input 
                              type="text" 
                              value={goal.description || ''}
                              onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                              placeholder="e.g. Roll out tokens, motion..." 
                              className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-[15px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-400 shadow-sm"
                            />
                          </div>
                          <div>
                            <select 
                              value={goal.uom}
                              onChange={(e) => updateGoal(goal.id, 'uom', e.target.value)}
                              className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-[15px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:right_16px_center] bg-no-repeat pr-12 shadow-sm"
                            >
                              <option value="Timeline">Timeline</option>
                              <option value="Numeric">Numeric</option>
                              <option value="Percentage">Percentage</option>
                              <option value="Zero-base">Zero-base</option>
                            </select>
                          </div>
                          <div>
                            <input 
                              type="text" 
                              value={goal.target}
                              onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}
                              placeholder="e.g. Sep" 
                              className="w-full px-5 py-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-[15px] font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-400 shadow-sm"
                            />
                          </div>
                          <div className="relative">
                            <input 
                              type="number" 
                              value={goal.weight || ''}
                              onChange={(e) => updateGoal(goal.id, 'weight', e.target.value)}
                              placeholder="0" 
                              className="w-full px-5 py-4 pr-12 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-[15px] font-black text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all placeholder:text-slate-400 shadow-sm"
                            />
                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[15px] font-black">%</span>
                          </div>
                          <div className="flex justify-center mt-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 h-12 w-12 rounded-2xl"
                              onClick={() => removeGoal(goal.id)}
                              disabled={goals.length === 1}
                            >
                              <Trash2 size={20} strokeWidth={2.5} />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/30">
                    <Button variant="outline" className="border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 rounded-2xl px-8 py-6 font-extrabold text-[15px] hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm" onClick={addGoal} disabled={goals.length >= 8}>
                      <Plus size={20} className="mr-2" strokeWidth={3} /> Add another goal
                    </Button>
                  </div>
               </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1"
            >
              <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[32px] p-10 shadow-lg shadow-slate-200/20 dark:shadow-none">
                <div className="mb-10">
                  <p className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">FINAL REVIEW</p>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-3">Submitting {goals.length} goals for {selectedCycle}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-semibold flex items-center gap-2">
                    Total weightage: <span className="text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-md border border-emerald-100 dark:border-emerald-800/50">{totalWeight}%</span> &middot; Manager: Devon Park
                  </p>
                </div>

                <div className="border border-white/50 dark:border-slate-700/50 rounded-[24px] overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm">
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {goals.map((g, i) => (
                      <div key={i} className="flex items-start gap-5 p-7 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-100 dark:border-indigo-800/50 shadow-inner group-hover:scale-110 transition-transform">
                          <Target className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 dark:text-white text-xl mb-1">{g.title || 'Untitled Goal'}</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-[15px] font-semibold">{g.description || 'No description provided.'}</p>
                        </div>
                        <div className="flex items-center gap-8 pl-4 border-l border-slate-100 dark:border-slate-700">
                          <div>
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">UOM</p>
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-black">{g.uom}</span>
                          </div>
                          <div>
                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">WEIGHT</p>
                            <span className="text-indigo-600 dark:text-indigo-400 font-black text-2xl bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-xl">{g.weight}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer Navigation */}
        <motion.div variants={itemVariants} className="mt-10 flex justify-between items-center pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="text-slate-600 dark:text-slate-300 font-extrabold bg-white/60 dark:bg-slate-800/60 border-white/50 dark:border-slate-700 rounded-2xl px-8 py-6 hover:bg-white dark:hover:bg-slate-700 shadow-sm backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 mr-2" strokeWidth={3} /> Back
          </Button>
          
          <Button 
            onClick={currentStep === 3 ? submitGoals : nextStep}
            disabled={(currentStep === 2 && !isValid) || isSubmitting}
            className={cn("rounded-2xl px-10 py-6 text-[15px] font-black transition-all shadow-lg", 
               currentStep === 3 ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/30" : 
               (currentStep === 2 && !isValid) ? "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 shadow-none" : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/30 transform hover:-translate-y-1")}
          >
            {isSubmitting ? "Submitting..." : currentStep === 3 ? "Submit for approval" : "Continue"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
