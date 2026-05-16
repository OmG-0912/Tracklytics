import { useState } from 'react';
import { Lock, RefreshCw, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function SharedGoals() {
  const role = localStorage.getItem('role') || 'employee';

  const [sharedKPIs] = useState([
    { 
      id: 1, 
      title: 'Org-wide eNPS ≥ 60', 
      audience: 'All Employees',
      syncStatus: 'Synced 2h ago',
      uom: 'Numeric',
      uomLocked: true,
      target: '60',
      weight: 10,
      employeesSynced: '1,284'
    },
    { 
      id: 2, 
      title: 'Zero P0 security incidents', 
      audience: 'Engineering, Design, Product',
      syncStatus: 'Synced yesterday',
      uom: 'Zero-based',
      uomLocked: true,
      target: '0',
      weight: 15,
      employeesSynced: '187'
    },
    { 
      id: 3, 
      title: 'Quarterly Learning hours ≥ 12', 
      audience: 'All Employees',
      syncStatus: 'Synced 5h ago',
      uom: 'Numeric',
      uomLocked: true,
      target: '12',
      weight: 5,
      employeesSynced: '1,284'
    }
  ]);

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-10 pb-8 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">SHARED KPIS</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Departmental & org-wide goals</h2>
          <p className="text-slate-600 text-lg">
            Push KPIs to teams. Lock fields so employees can only adjust weightage.
          </p>
        </div>
        {role !== 'employee' && (
          <Button variant="secondary" className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl px-6 py-6 transition-all shadow-sm">
            Push new KPI
          </Button>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {sharedKPIs.map((goal) => (
          <div key={goal.id} className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm transition-all hover:shadow-md">
            
            {/* Card Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="max-w-[70%]">
                <h4 className="font-extrabold text-slate-900 text-2xl mb-1.5">{goal.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-snug">
                  Pushed by Priya Raman &middot; {goal.audience}
                </p>
              </div>
              <div className="flex items-start gap-1.5 text-emerald-600 mt-1">
                <RefreshCw className="w-3.5 h-3.5 mt-0.5" strokeWidth={3} />
                <span className="text-xs font-bold leading-tight max-w-[80px] text-left">{goal.syncStatus}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-4 mb-8">
              {/* UOM Block */}
              <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">UOM</p>
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xl">
                  <span className="truncate">{goal.uom}</span>
                  {role !== 'admin' && <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" strokeWidth={2.5} />}
                </div>
              </div>

              {/* TARGET Block */}
              <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-sm">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">TARGET</p>
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xl">
                  {goal.target}
                  {role !== 'admin' && <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" strokeWidth={2.5} />}
                </div>
              </div>

              {/* WEIGHT Block */}
              <div className={cn("border rounded-2xl p-5", role !== 'employee' ? "border-indigo-100 bg-[#fafaff]" : "border-slate-100 bg-white shadow-sm")}>
                <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-1.5", role !== 'employee' ? "text-indigo-600" : "text-slate-500")}>
                  {role !== 'employee' ? 'WEIGHT (EDITABLE)' : 'WEIGHT'}
                </p>
                <div className="flex items-center gap-2">
                  {role !== 'employee' ? (
                    <input 
                      type="number" 
                      defaultValue={goal.weight} 
                      className="w-[70px] px-3 py-1.5 border border-indigo-200 rounded-xl text-indigo-900 font-extrabold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" 
                    />
                  ) : (
                    <span className="text-slate-900 font-extrabold text-xl flex items-center gap-1.5">
                      {goal.weight}
                      <Lock className="w-3.5 h-3.5 text-slate-300" strokeWidth={2.5} />
                    </span>
                  )}
                  <span className={cn("font-extrabold text-xl", role !== 'employee' ? "text-indigo-600" : "text-slate-900")}>%</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-slate-600 text-sm font-medium">
              Synced across {goal.employeesSynced} employees &middot; auto-locked
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
