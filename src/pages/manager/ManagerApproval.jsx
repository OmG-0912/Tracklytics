import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function ManagerApproval() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Team Approvals</h2>
        <p className="text-muted-foreground mt-1">Review and manage submitted goals from your direct reports.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awaiting Review</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">9</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Returned for Rework</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Goals requiring your attention.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-500 uppercase tracking-wider">Employee</th>
                  <th className="px-4 py-3 font-medium text-slate-500 uppercase tracking-wider">Goal Title</th>
                  <th className="px-4 py-3 font-medium text-slate-500 uppercase tracking-wider">Weight</th>
                  <th className="px-4 py-3 font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-4">
                    <div className="font-semibold">Aanya Mehta</div>
                    <div className="text-xs text-muted-foreground">Product Designer</div>
                  </td>
                  <td className="px-4 py-4">Ship Design System v3.0</td>
                  <td className="px-4 py-4 font-medium">30%</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">Return</Button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                  <td className="px-4 py-4">
                    <div className="font-semibold">John Doe</div>
                    <div className="text-xs text-muted-foreground">Frontend Engineer</div>
                  </td>
                  <td className="px-4 py-4">Migrate legacy components</td>
                  <td className="px-4 py-4 font-medium">40%</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">Return</Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
