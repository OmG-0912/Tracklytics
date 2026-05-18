const fs = require('fs');

const path = 'd:/AtomQuest/src/pages/employee/QuarterlyCheckin.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "sparkline: 'M0,15 L20,13 L40,14 L60,10 L80,11 L100,8'",
  "sparkline: 'M0,15 L20,13 L40,14 L60,10 L80,11 L100,8',\n             cycle: g.cycle || 'Q2 FY26'"
);

content = content.replace(
  '{/* Goals List */}\n        <div className="space-y-6">\n          {goals.map((goal) => (\n            <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">',
  `{/* Goals List */}
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
                <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">`
).replace(
  '{/* Goals List */}\r\n        <div className="space-y-6">\r\n          {goals.map((goal) => (\r\n            <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">',
  `{/* Goals List */}
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
                <div key={goal.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md">`
);

content = content.replace(
  `              ></textarea>\n            </div>\n          ))}\n        </div>`,
  `              ></textarea>\n                </div>\n              ))}\n            </div>\n          ))}\n        </div>`
).replace(
  `              ></textarea>\r\n            </div>\r\n          ))}\r\n        </div>`,
  `              ></textarea>\r\n                </div>\r\n              ))}\r\n            </div>\r\n          ))}\r\n        </div>`
);

fs.writeFileSync(path, content);
console.log("File updated successfully!");
