export const users = [
  // Admins
  {
    id: 'U101',
    name: 'Priya Raman',
    role: 'admin',
    title: 'Chief People Officer',
    department: 'People Ops',
    location: 'Bengaluru, KA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  },
  {
    id: 'U102',
    name: 'Amit Verma',
    role: 'admin',
    title: 'VP of Engineering',
    department: 'Engineering',
    location: 'Pune, MH',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
  },

  // Managers
  {
    id: 'U201',
    name: 'Rohan Sharma',
    role: 'manager',
    title: 'Design Director',
    department: 'Design',
    location: 'Mumbai, MH',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U101',
  },
  {
    id: 'U202',
    name: 'Aditi Desai',
    role: 'manager',
    title: 'Engineering Manager',
    department: 'Engineering',
    location: 'Hyderabad, TS',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U102',
  },
  {
    id: 'U203',
    name: 'Vikram Singh',
    role: 'manager',
    title: 'Product Head',
    department: 'Product',
    location: 'Delhi, NCR',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U101',
  },

  // Employees
  {
    id: 'U301',
    name: 'Aanya Mehta',
    role: 'employee',
    title: 'Sr. Product Designer',
    department: 'Design',
    location: 'Mumbai, MH',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U201',
  },
  {
    id: 'U302',
    name: 'Arjun Patel',
    role: 'employee',
    title: 'Product Designer',
    department: 'Design',
    location: 'Pune, MH',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U201',
  },
  {
    id: 'U303',
    name: 'Kavya Reddy',
    role: 'employee',
    title: 'Design Engineer',
    department: 'Design',
    location: 'Bengaluru, KA',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U201',
  },
  {
    id: 'U304',
    name: 'Rahul Joshi',
    role: 'employee',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Delhi, NCR',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U201',
  },
  {
    id: 'U305',
    name: 'Neha Gupta',
    role: 'employee',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Noida, UP',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80',
    managerId: 'U202',
  }
];

export const sharedKPIs = [
  { 
    id: 'KPI-1', 
    title: 'Org-wide eNPS ≥ 60', 
    audience: 'All Employees',
    syncStatus: 'Synced 2h ago',
    uom: 'Numeric',
    uomLocked: true,
    target: '60',
    weight: 10,
    employeesSynced: '1,284',
    pushedBy: 'Priya Raman'
  },
  { 
    id: 'KPI-2', 
    title: 'Zero P0 security incidents', 
    audience: 'Engineering, Design, Product',
    syncStatus: 'Synced yesterday',
    uom: 'Zero-based',
    uomLocked: true,
    target: '0',
    weight: 15,
    employeesSynced: '412',
    pushedBy: 'Amit Verma'
  },
  { 
    id: 'KPI-3', 
    title: 'Quarterly Learning hours ≥ 12', 
    audience: 'All Employees',
    syncStatus: 'Synced 5h ago',
    uom: 'Numeric',
    uomLocked: true,
    target: '12',
    weight: 5,
    employeesSynced: '1,284',
    pushedBy: 'Priya Raman'
  }
];

export const teamGoals = [
  {
    id: 'G101',
    userId: 'U301',
    title: 'Ship Design System v3.0 for India Market',
    status: 'In Progress',
    statusColor: 'text-indigo-600 border-indigo-200 bg-white',
    weight: '30%',
    uom: 'Milestone',
    target: 'Oct 15',
    progress: '62%',
    desc: 'Roll out tokens and accessibility audit across 6 product surfaces focusing on regional localization.'
  },
  {
    id: 'G102',
    userId: 'U301',
    title: 'Improve NPS by 12 points in Tier-2 Cities',
    status: 'Approved',
    statusColor: 'text-blue-600 border-blue-200 bg-white',
    weight: '25%',
    uom: 'Numeric',
    target: '68',
    progress: '71%',
    desc: 'Run quarterly research in Jaipur, Indore, and Kochi. Ship 3 onboarding experiments.'
  },
  {
    id: 'G103',
    userId: 'U302',
    title: 'Reduce mobile app load time by 30%',
    status: 'At Risk',
    statusColor: 'text-red-600 border-red-200 bg-white',
    weight: '20%',
    uom: 'Percentage',
    target: '30',
    progress: '10%',
    desc: 'Optimize image assets and caching strategies for low-bandwidth 4G networks in rural India.'
  }
];

export const auditLogs = [
  {
    id: 1,
    role: 'Manager',
    user: 'Rohan Sharma',
    action: 'Approved goal',
    field: 'status: Pending -> Approved',
    timestamp: '2026-02-18 14:32',
    target: 'Improve NPS by 12 points',
    ip: '49.36.12.110', // Indian IP range mockup
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
    ip: '115.112.55.99',
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
    ip: '103.21.124.5',
    roleColor: 'text-purple-600 border-purple-200 bg-purple-50/50'
  },
  {
    id: 4,
    role: 'Employee',
    user: 'Arjun Patel',
    action: 'Submitted goals',
    field: 'status: Draft -> Pending',
    timestamp: '2026-02-16 17:21',
    target: 'Q2 FY26 Portfolio',
    ip: '49.36.14.21',
    roleColor: 'text-cyan-600 border-cyan-200 bg-cyan-50/50'
  },
  {
    id: 5,
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

export const managerLeaderboard = [
  { name: 'Priya Raman', initials: 'PR', dept: 'People Ops', location: 'Bengaluru', score: 96, trend: 4 },
  { name: 'Rohan Sharma', initials: 'RS', dept: 'Design', location: 'Mumbai', score: 92, trend: 2 },
  { name: 'Aditi Desai', initials: 'AD', dept: 'Engineering', location: 'Hyderabad', score: 90, trend: -1 },
  { name: 'Vikram Singh', initials: 'VS', dept: 'Product', location: 'Delhi', score: 88, trend: 3 },
  { name: 'Karan Malhotra', initials: 'KM', dept: 'Sales', location: 'Gurugram', score: 81, trend: 0 },
];
