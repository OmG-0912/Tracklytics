import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle, Clock } from 'lucide-react';

export default function QuarterlyCheckin() {
  const goals = [
    { title: 'Ship Design System v3.0', target: '100%', actual: '62%', status: 'On Track', color: 'bg-primary', comments: 2 },
    { title: 'Improve NPS by 12 points', target: '12 pts', actual: '8 pts', status: 'On Track', color: 'bg-primary', comments: 1 },
    { title: 'Reduce design review cycle time', target: '48 hrs', actual: '72 hrs', status: 'Not Started', color: 'bg-slate-300', comments: 0 },
    { title: 'Mentor two junior designers', target: '2 designers', actual: '1 designer', status: 'Completed', color: 'bg-green-500', comments: 4 }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Q2 Check-in</h2>
          <p className="text-muted-foreground mt-1">Update your progress and add notes for your manager.</p>
        </div>
        <Button>Submit Check-in</Button>
      </div>

      <div className="space-y-4">
        {goals.map((goal, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Target: <strong>{goal.target}</strong>
                  </CardDescription>
                </div>
                <div className={`px-2.5 py-1 text-xs font-semibold rounded-full 
                  ${goal.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    goal.status === 'On Track' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                  {goal.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Progress Update */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Update Actual Achievement</label>
                    <div className="flex items-center gap-4 mt-2">
                      <input 
                        type="text" 
                        defaultValue={goal.actual} 
                        className="w-32 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-950"
                      />
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${goal.color} rounded-full`} style={{ width: goal.actual }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Add Note / Evidence</label>
                    <textarea 
                      placeholder="Explain your progress..."
                      className="w-full mt-2 px-3 py-2 border rounded-md text-sm min-h-[80px] focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-950"
                    ></textarea>
                  </div>
                </div>

                {/* Comment History */}
                <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                    <MessageSquare size={16} />
                    Comments ({goal.comments})
                  </div>
                  
                  {goal.comments > 0 ? (
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-semibold">Devon Park (Manager)</span>
                        <span className="text-slate-400 text-xs ml-2">2 days ago</span>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Great progress here, keep it up!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-400 text-center py-4">No comments yet.</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
