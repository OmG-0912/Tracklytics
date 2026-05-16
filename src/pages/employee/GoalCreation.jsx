import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function GoalCreation() {
  const [goals, setGoals] = useState([
    { id: 1, title: '', uom: 'numeric', target: '', weight: 0 }
  ]);

  const addGoal = () => {
    if (goals.length < 8) {
      setGoals([...goals, { id: Date.now(), title: '', uom: 'numeric', target: '', weight: 0 }]);
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Goal Sheet</h2>
        <p className="text-muted-foreground mt-1">Define your objectives for Q2 FY26. Total weightage must equal 100%.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Goal Portfolio</CardTitle>
              <CardDescription>Add up to 8 goals.</CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${totalWeight === 100 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
              Total Weight: {totalWeight}%
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {goals.map((goal, index) => (
            <div key={goal.id} className="flex items-start gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Goal Title</label>
                  <input 
                    type="text" 
                    value={goal.title}
                    onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                    placeholder="e.g., Improve NPS..." 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">UoM</label>
                  <select 
                    value={goal.uom}
                    onChange={(e) => updateGoal(goal.id, 'uom', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="numeric">Numeric</option>
                    <option value="percentage">Percentage</option>
                    <option value="timeline">Timeline</option>
                  </select>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Target</label>
                  <input 
                    type="text" 
                    value={goal.target}
                    onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}
                    placeholder="Value" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Weight (%)</label>
                  <input 
                    type="number" 
                    value={goal.weight || ''}
                    onChange={(e) => updateGoal(goal.id, 'weight', e.target.value)}
                    placeholder="0" 
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-slate-400 hover:text-destructive mt-6"
                onClick={() => removeGoal(goal.id)}
                disabled={goals.length === 1}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4 border-dashed" onClick={addGoal} disabled={goals.length >= 8}>
            <Plus size={16} className="mr-2" /> Add Another Goal
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between border-t bg-slate-50/50 dark:bg-slate-900/20 pt-6">
          <Button variant="ghost">Cancel</Button>
          <Button disabled={!isValid}>Submit for Approval</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
