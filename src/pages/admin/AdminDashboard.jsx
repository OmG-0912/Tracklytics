import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Activity, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Organization Overview</h2>
        <p className="text-muted-foreground mt-1">High-level metrics and system audit trail.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Alignment</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">74%</div>
            <p className="text-xs text-muted-foreground">Goal completion average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground">Unsubmitted goal sheets</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Audit Trail</CardTitle>
          <CardDescription>Recent administrative and compliance actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Devon Park</p>
                <p className="text-sm text-muted-foreground">APPROVED_SHEET for Aanya Mehta</p>
              </div>
              <div className="ml-auto font-medium text-xs text-slate-400">Oct 24, 09:41 AM</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Priya Sharma</p>
                <p className="text-sm text-muted-foreground text-amber-500">UNLOCKED_GOAL #G-8821</p>
              </div>
              <div className="ml-auto font-medium text-xs text-slate-400">Oct 24, 08:15 AM</div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">System</p>
                <p className="text-sm text-muted-foreground">CYCLE_CREATED: Q3 FY26</p>
              </div>
              <div className="ml-auto font-medium text-xs text-slate-400">Oct 23, 16:30 PM</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
