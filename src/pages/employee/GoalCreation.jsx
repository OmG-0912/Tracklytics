import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronRight, ChevronLeft, Check, Sparkles, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GoalCreation() {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedCycle, setSelectedCycle] = useState('Q2 FY26');
  
  const [goals, setGoals] = useState([
    { id: 1, title: 'Ship Design System v3.0', description: 'Roll out tokens, motion primitives, a11y audit.', uom: 'Timeline', target: 'Sep', weight: 30 },
    { id: 2, title: 'Improve NPS by 12 points', description: 'Run quarterly research and 3 onboarding experiments.', uom: 'Numeric', target: '68', weight: 25 },
    { id: 3, title: 'Reduce design review cycle time', description: 'Move from 7.2 days to under 3.5 days.', uom: 'Percentage', target: '50', weight: 20 },
    { id: 4, title: 'Zero critical accessibility defects', description: 'Maintain zero P0/P1 a11y issues.', uom: 'Zero-based', target: '0', weight: 15 },
    { id: 5, title: 'Mentor two junior designers to L3', description: 'Weekly 1:1s, portfolio reviews, calibration.', uom: 'Numeric', target: '2', weight: 10 }
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">GOAL CREATION</p>
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Set your goals for the quarter</h2>
        <p className="text-slate-700 text-lg">Add SMART goals, assign weightage that totals 100%, and submit for manager approval.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
        {/* Step 1 */}
        <div 
          onClick={() => setCurrentStep(1)}
          className={cn("flex-1 flex items-center p-3 rounded-xl cursor-pointer transition-all", currentStep === 1 ? "bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-100" : "hover:bg-slate-50")}
        >
          {currentStep > 1 ? (
             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-emerald-600"><Check size={20} strokeWidth={3} /></div>
          ) : (
             <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3", currentStep === 1 ? "bg-slate-100 text-slate-900" : "bg-slate-50 text-slate-500")}>1</div>
          )}
          <div>
            <p className="font-bold text-slate-900">Cycle</p>
            <p className="text-xs text-slate-500 font-medium">Pick the quarter & cycle</p>
          </div>
        </div>
        <div className="px-2 text-slate-300"><ChevronRight size={20} strokeWidth={2} /></div>
        
        {/* Step 2 */}
        <div 
          onClick={() => setCurrentStep(2)}
          className={cn("flex-1 flex items-center p-3 rounded-xl cursor-pointer transition-all", currentStep === 2 ? "bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-100" : "hover:bg-slate-50", currentStep < 2 && "opacity-60")}
        >
          {currentStep > 2 ? (
             <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-emerald-600"><Check size={20} strokeWidth={3} /></div>
          ) : (
             <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3", currentStep === 2 ? "text-slate-900" : "text-slate-400")}>2</div>
          )}
          <div>
            <p className={cn("font-bold", currentStep >= 2 ? "text-slate-900" : "text-slate-500")}>Define goals</p>
            <p className={cn("text-xs font-medium", currentStep >= 2 ? "text-slate-500" : "text-slate-400")}>Add KPIs with weightage</p>
          </div>
        </div>
        <div className="px-2 text-slate-300"><ChevronRight size={20} strokeWidth={2} /></div>

        {/* Step 3 */}
        <div 
          onClick={() => { if (isValid) setCurrentStep(3); }}
          className={cn("flex-1 flex items-center p-3 rounded-xl cursor-pointer transition-all", currentStep === 3 ? "bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-slate-100" : "hover:bg-slate-50", !isValid && currentStep !== 3 && "opacity-60")}
        >
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3", currentStep === 3 ? "text-slate-900" : "text-slate-400")}>3</div>
          <div>
            <p className={cn("font-bold", currentStep === 3 ? "text-slate-900" : "text-slate-500")}>Review & submit</p>
            <p className={cn("text-xs font-medium", currentStep === 3 ? "text-slate-500" : "text-slate-400")}>Sanity-check totals</p>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] flex flex-col">
        {currentStep === 1 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">STEP 1 OF 3</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Choose your goal cycle</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Q1 FY26', 'Q2 FY26', 'Q3 FY26', 'Q4 FY26'].map((cycle) => (
                <div 
                  key={cycle}
                  onClick={() => setSelectedCycle(cycle)}
                  className={cn(
                    "p-6 rounded-2xl border-2 cursor-pointer transition-all",
                    selectedCycle === cycle 
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg scale-[1.02]" 
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  )}
                >
                  <p className={cn("text-xs font-semibold mb-2", selectedCycle === cycle ? "text-slate-300" : "text-slate-500")}>CYCLE</p>
                  <p className={cn("text-xl font-bold", selectedCycle === cycle ? "text-white" : "text-slate-900")}>{cycle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Weightage Tracker */}
             <div className={cn("flex items-center justify-between p-5 rounded-2xl border mb-6 transition-colors duration-300", totalWeight === 100 ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white shadow-sm")}>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white border border-slate-100 shadow-sm text-indigo-600 rounded-xl">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Weightage tracker</h4>
                    <p className="text-sm font-medium text-slate-600">All goals must sum to exactly 100%.</p>
                  </div>
                </div>
                <div className={cn("text-4xl font-extrabold tracking-tight", totalWeight === 100 ? "text-emerald-700" : totalWeight > 100 ? "text-red-500" : "text-slate-900")}>
                  {totalWeight}%
                </div>
             </div>

             {/* Goals Table */}
             <div className="border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
                <div className="grid grid-cols-[2.5fr_2fr_1.5fr_1fr_1fr_40px] gap-4 p-5 border-b border-slate-100 bg-white">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Goal Title</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Description</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">UOM</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Target</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Weight</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-widest text-center">—</div>
                </div>

                <div className="p-3 space-y-3">
                  {goals.map((goal) => (
                    <div key={goal.id} className="grid grid-cols-[2.5fr_2fr_1.5fr_1fr_1fr_40px] gap-4 items-center px-2">
                      <div>
                        <input 
                          type="text" 
                          value={goal.title}
                          onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                          placeholder="e.g. Ship Design System v3.0" 
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={goal.description || ''}
                          onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                          placeholder="e.g. Roll out tokens, motion..." 
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <select 
                          value={goal.uom}
                          onChange={(e) => updateGoal(goal.id, 'uom', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white text-slate-700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:right_12px_center] bg-no-repeat pr-10"
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
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                      </div>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={goal.weight || ''}
                          onChange={(e) => updateGoal(goal.id, 'weight', e.target.value)}
                          placeholder="0" 
                          className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">%</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 h-10 w-10 rounded-xl ml-auto"
                        onClick={() => removeGoal(goal.id)}
                        disabled={goals.length === 1}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-slate-100 bg-slate-50/30">
                  <Button variant="outline" className="border-dashed border-slate-300 text-slate-700 hover:text-slate-900 bg-white rounded-xl px-6 py-5 font-semibold hover:bg-slate-50 transition-all" onClick={addGoal} disabled={goals.length >= 8}>
                    <Plus size={18} className="mr-2" strokeWidth={2.5} /> Add another goal
                  </Button>
                </div>
             </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="mb-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">FINAL REVIEW</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Submitting {goals.length} goals for {selectedCycle}</h3>
                <p className="text-slate-600 text-md">
                  Total weightage: <span className="text-emerald-600 font-bold">{totalWeight}%</span> &middot; Manager: Devon Park
                </p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="divide-y divide-slate-100">
                  {goals.map((g, i) => (
                    <div key={i} className="flex items-start gap-4 p-6 hover:bg-slate-50 transition-colors">
                      <div className="text-indigo-600 mt-1">
                        <Target className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{g.title || 'Untitled Goal'}</h4>
                        <p className="text-slate-500 text-sm">{g.description || 'No description provided.'}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-slate-500 text-sm font-medium">{g.uom}</span>
                        <span className="text-indigo-700 font-bold text-lg w-12 text-right">{g.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Footer Navigation */}
        <div className="mt-8 flex justify-between items-center pt-8 border-t border-slate-200">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="text-slate-700 font-semibold border-slate-200 rounded-full px-6 py-6 hover:bg-slate-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" strokeWidth={2.5} /> Back
          </Button>
          
          <Button 
            onClick={currentStep === 3 ? () => alert('Submitted!') : nextStep}
            disabled={currentStep === 2 && !isValid}
            className={cn("rounded-full px-8 py-6 text-md font-bold transition-all", 
               currentStep === 3 ? "bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50" : 
               (currentStep === 2 && !isValid) ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5")}
          >
            {currentStep === 3 ? "Submit for approval" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
