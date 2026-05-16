import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Lock, Users } from 'lucide-react';

export default function SharedGoals() {
  const sharedKPIs = [
    { id: 1, title: 'Increase Organization NPS to 60', owner: 'Executive Team', participants: 450, synced: true },
    { id: 2, title: 'Reduce Operational Costs by 15%', owner: 'Finance', participants: 120, synced: true },
    { id: 3, title: 'Launch Q3 Product Suite', owner: 'Product Dept', participants: 85, synced: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shared Departmental KPIs</h2>
          <p className="text-muted-foreground mt-1">Push organization-wide goals down to employee portfolios.</p>
        </div>
        <Button className="flex gap-2"><Share2 size={16} /> Cascade New Goal</Button>
      </div>

      <div className="grid gap-6">
        {sharedKPIs.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={16} className="text-muted-foreground" />
                  {kpi.title}
                </CardTitle>
                <CardDescription className="mt-1">Owned by {kpi.owner}</CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sm">
                <Users size={14} className="text-primary" />
                {kpi.participants} Assigned
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  This goal is locked for employees. They can only modify the <strong>Weightage</strong> field in their individual portfolios to reflect how much of their time is dedicated to this KPI.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${kpi.synced ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                  <span className="text-xs font-medium text-slate-500">
                    {kpi.synced ? 'Fully synced across portfolios' : 'Pending sync for 12 users'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
