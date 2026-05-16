import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AuditTrail() {
  const logs = [
    { id: '1029', user: 'Devon Park', role: 'Manager', action: 'APPROVED_SHEET', target: 'Aanya Mehta (Q2 Portfolio)', time: 'Oct 24, 09:41 AM', status: 'Success' },
    { id: '1028', user: 'Priya Sharma', role: 'Admin', action: 'UNLOCKED_GOAL', target: 'Goal #G-8821', time: 'Oct 24, 08:15 AM', status: 'Warning' },
    { id: '1027', user: 'System', role: 'System', action: 'CYCLE_CREATED', target: 'Q3 FY26 Configuration', time: 'Oct 23, 16:30 PM', status: 'Success' },
    { id: '1026', user: 'John Doe', role: 'Employee', action: 'SUBMITTED_SHEET', target: 'Self (Q2 Portfolio)', time: 'Oct 23, 14:12 PM', status: 'Success' },
    { id: '1025', user: 'Aanya Mehta', role: 'Employee', action: 'EDITED_WEIGHTAGE', target: 'Goal #G-9920 (From 20% to 30%)', time: 'Oct 22, 11:05 AM', status: 'Success' },
    { id: '1024', user: 'System', role: 'System', action: 'FAILED_LOGIN', target: 'IP: 192.168.1.44', time: 'Oct 22, 02:15 AM', status: 'Failed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Trail Logs</h2>
        <p className="text-muted-foreground mt-1">Comprehensive system compliance and activity tracking.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Last 30 days of logged events.</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-slate-950"
                />
              </div>
              <Button variant="outline" size="icon"><Filter size={16} /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-500">Log ID</th>
                  <th className="px-4 py-3 font-medium text-slate-500">Timestamp</th>
                  <th className="px-4 py-3 font-medium text-slate-500">User</th>
                  <th className="px-4 py-3 font-medium text-slate-500">Action</th>
                  <th className="px-4 py-3 font-medium text-slate-500">Target/Details</th>
                  <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y font-mono text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50">
                    <td className="px-4 py-3 text-slate-500">#{log.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{log.time}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 font-sans">{log.user}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{log.role}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{log.action}</td>
                    <td className="px-4 py-3">{log.target}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider font-sans uppercase
                        ${log.status === 'Success' ? 'bg-green-100 text-green-700' : 
                          log.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-destructive/10 text-destructive'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
