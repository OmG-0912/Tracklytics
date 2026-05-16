import { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AuditTrail() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Admin', 'Manager', 'Employee', 'System'];

  const logs = [
    {
      id: 1,
      role: 'Manager',
      user: 'Devon Park',
      action: 'Approved goal',
      field: 'status: Pending -> Approved',
      timestamp: '2026-02-18 14:32',
      target: 'Improve NPS by 12 points',
      ip: '10.4.21.118',
      roleColor: 'text-indigo-600 border-indigo-200 bg-indigo-50/50'
    },
    {
      id: 2,
      role: 'Employee',
      user: 'Aanya Mehta',
      action: 'Edited weightage',
      field: 'weightage: 25% -> 30%',
      timestamp: '2026-02-18 11:08',
      target: 'Improve NPS by 12 points',
      ip: '10.4.21.119',
      roleColor: 'text-cyan-600 border-cyan-200 bg-cyan-50/50'
    },
    {
      id: 3,
      role: 'Admin',
      user: 'Priya Raman',
      action: 'Pushed shared KPI',
      field: 'scope: org-wide',
      timestamp: '2026-02-17 09:45',
      target: 'Org-wide eNPS ≥ 60',
      ip: '10.4.21.100',
      roleColor: 'text-purple-600 border-purple-200 bg-purple-50/50'
    },
    {
      id: 4,
      role: 'Employee',
      user: 'Marcus Chen',
      action: 'Submitted goals',
      field: 'status: Draft -> Pending',
      timestamp: '2026-02-16 17:21',
      target: 'Q2 FY26 Portfolio',
      ip: '10.4.21.145',
      roleColor: 'text-cyan-600 border-cyan-200 bg-cyan-50/50'
    },
    {
      id: 5,
      role: 'Manager',
      user: 'Devon Park',
      action: 'Returned for rework',
      field: 'status: Pending -> Rework',
      timestamp: '2026-02-16 10:14',
      target: 'Launch mobile app v2.0',
      ip: '10.4.21.118',
      roleColor: 'text-indigo-600 border-indigo-200 bg-indigo-50/50'
    },
    {
      id: 6,
      role: 'Admin',
      user: 'Priya Raman',
      action: 'Unlocked goal',
      field: 'locked: true -> false',
      timestamp: '2026-02-15 16:02',
      target: 'Zero P0 security incidents',
      ip: '10.4.21.100',
      roleColor: 'text-purple-600 border-purple-200 bg-purple-50/50'
    },
    {
      id: 7,
      role: 'System',
      user: 'System',
      action: 'Escalation triggered',
      field: 'SLA breach',
      timestamp: '2026-02-15 09:00',
      target: 'Pending Approvals > 5 days',
      ip: '127.0.0.1',
      roleColor: 'text-slate-600 border-slate-200 bg-slate-50/50'
    }
  ];

  const [selectedLog, setSelectedLog] = useState(logs[0]);

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      {/* Header */}
      <div className="flex justify-between items-end mb-10 pb-8 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">GOVERNANCE</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Audit trail</h2>
          <p className="text-slate-600 text-lg">
            Every change is logged — user, action, modified field, and timestamp.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl px-6 py-6 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Export logs
        </Button>
      </div>

      {/* Toolbar Container */}
      <div className="flex flex-col lg:flex-row items-center border border-slate-200 rounded-full p-2 mb-10 shadow-sm bg-white w-full overflow-hidden">
        
        {/* Search */}
        <div className="relative flex-1 w-full flex items-center min-w-[300px]">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by user, action, target, field..." 
            className="w-full pl-12 pr-16 py-2.5 bg-transparent border-0 text-[15px] font-medium placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
          <div className="absolute right-4 px-2 py-1 rounded bg-slate-50 border border-slate-200 text-slate-500 text-[11px] font-bold font-mono shadow-sm">
            ⌘ K
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-8 bg-slate-200 mx-2"></div>

        {/* Filters */}
        <div className="flex items-center w-full lg:w-auto px-2 overflow-x-auto">
          <Filter className="w-5 h-5 text-slate-400 shrink-0 mr-4" />
          <div className="flex gap-2">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all border",
                  activeFilter === filter 
                    ? "bg-white border-slate-800 text-slate-900 shadow-sm" 
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        
        {/* Left Panel: Table */}
        <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-5 text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">USER</th>
                <th className="px-6 py-5 text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">ACTION</th>
                <th className="px-6 py-5 text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">MODIFIED FIELD</th>
                <th className="px-6 py-5 text-[10px] font-extrabold text-slate-900 uppercase tracking-widest">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  className={cn("cursor-pointer transition-colors group", selectedLog.id === log.id ? "bg-slate-50/80" : "hover:bg-slate-50/50")}
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border", log.roleColor)}>
                        {log.role}
                      </span>
                      <span className="font-extrabold text-slate-900 text-[15px] truncate max-w-[120px]">
                        {log.user.length > 7 ? log.user.substring(0, 5) + '...' : log.user}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-700 text-[15px] group-hover:text-slate-900 transition-colors">
                    {log.action}
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-mono text-[13px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 group-hover:border-slate-200 transition-colors">
                      {log.field.length > 20 ? log.field.substring(0, 16) + '...' : log.field}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-mono text-[13px] font-bold text-slate-500">
                    {log.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel: Detail View */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-sm flex flex-col h-fit">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">ACTIVITY DETAIL</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{selectedLog.action}</h3>
          <p className="text-slate-500 text-[15px] font-medium leading-snug mb-8 pb-8 border-b border-slate-100">
            {selectedLog.target}
          </p>

          <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 font-bold text-sm shrink-0">User</span>
              <span className="text-slate-900 font-extrabold text-sm text-right">{selectedLog.user}</span>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 font-bold text-sm shrink-0">Role</span>
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold border", selectedLog.roleColor)}>
                {selectedLog.role}
              </span>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 font-bold text-sm shrink-0">Field</span>
              <span className="font-mono text-[13px] font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                {selectedLog.field}
              </span>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 font-bold text-sm shrink-0">Timestamp</span>
              <span className="font-mono text-[13px] font-bold text-slate-700 text-right">{selectedLog.timestamp}</span>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 font-bold text-sm shrink-0">IP</span>
              <span className="font-mono text-[13px] font-bold text-slate-700 text-right">{selectedLog.ip}</span>
            </div>
          </div>

          <div className="mt-10 bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Audit entries are immutable. Export compliant format for SOC 2 review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
