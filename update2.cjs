const fs = require('fs');

const path = 'd:/AtomQuest/src/pages/employee/QuarterlyCheckin.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add selectedCycle state
content = content.replace(
  'const [isSaving, setIsSaving] = useState(false);',
  'const [isSaving, setIsSaving] = useState(false);\n  const [selectedCycle, setSelectedCycle] = useState("Q2 FY26");'
);

// Replace the main layout grid mapping
const oldLayout = `{/* Goals List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(
            goals.reduce((acc, goal) => {
              const cycle = goal.cycle || 'Uncategorized';
              if (!acc[cycle]) acc[cycle] = [];
              acc[cycle].push(goal);
              return acc;
            }, {})
          ).map(([cycle, cycleGoals]) => (
            <div key={cycle} className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">{cycle}</h3>
              {cycleGoals.map((goal) => (
                <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">`;

const oldLayoutWin = oldLayout.replace(/\n/g, '\\r\\n');

const newLayout = `{/* Goals List Area */}
        <div className="flex flex-col gap-6">
          {/* Cycle Dropdown */}
          <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
             <h3 className="font-bold text-slate-900 text-lg">Goals for {selectedCycle}</h3>
             <select 
                value={selectedCycle} 
                onChange={e => setSelectedCycle(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
             >
                {[...new Set(goals.map(g => g.cycle || 'Uncategorized'))].map(c => (
                   <option key={c} value={c}>{c}</option>
                ))}
             </select>
          </div>

          {/* Goals List */}
          <div className="space-y-6">
            {goals.filter(g => (g.cycle || 'Uncategorized') === selectedCycle).map((goal) => (
              <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">`;

content = content.replace(oldLayout, newLayout).replace(oldLayoutWin, newLayout);

// Replace the closing tags
const oldClosing = `              ></textarea>
                </div>
              ))}
            </div>
          ))}
        </div>`;
const oldClosingWin = oldClosing.replace(/\n/g, '\\r\\n');

const newClosing = `              ></textarea>
              </div>
            ))}
          </div>
        </div>`;

content = content.replace(oldClosing, newClosing).replace(oldClosingWin, newClosing);

fs.writeFileSync(path, content);
console.log("File updated successfully!");
