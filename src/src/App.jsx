import React, { useState } from 'react';
import { 
  FileText, ShieldAlert, CheckCircle2, AlertTriangle, Cpu, 
  Layers, Plus, Trash2, Edit3, Download, RefreshCw, Eye, 
  Check, X, ChevronRight, Activity, Zap, HardDrive, Database
} from 'lucide-react';

export default function App() {
  // Navigation & Mode States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWireframeMode, setIsWireframeMode] = useState(true);

  // Audit Inspector State (Site Walk Data)
  const [findings, setFindings] = useState([
    { 
      id: 1, 
      category: 'Air Emissions (Title V)', 
      location: 'Boiler House #2', 
      severity: 'High', 
      status: 'Open', 
      regulation: '40 CFR Part 60 Subpart Db', 
      notes: 'Continuous Emission Monitoring System (CEMS) calibration drift exceeded ±5% threshold during 30-day rolling audit.',
      correctiveAction: 'Initiate vendor recalibration protocol and verify zero-span gas bottle concentrations.'
    },
    { 
      id: 2, 
      category: 'Hazardous Waste (RCRA)', 
      location: 'Chemical Storage Pad B', 
      severity: 'Medium', 
      status: 'In Review', 
      regulation: '40 CFR 265.173', 
      notes: 'Secondary containment sump observed with rainwater accumulation and minor oil sheen without immediate drainage log.',
      correctiveAction: 'Pump accumulated water into oil-water separator and update weekly inspection checklist.'
    },
    { 
      id: 3, 
      category: 'Wastewater & NPDES', 
      location: 'Outfall 002 Discharge', 
      severity: 'Low', 
      status: 'Resolved', 
      regulation: 'NPDES Permit #IA-004829', 
      notes: 'pH probe reading showed slight nominal offset during morning grab sample verification.',
      correctiveAction: 'Calibrated probe against standard buffer solutions 7.0 and 10.0.'
    }
  ]);

  // New Finding Form State
  const [newCategory, setNewCategory] = useState('Air Emissions (Title V)');
  const [newLocation, setNewLocation] = useState('');
  const [newSeverity, setNewSeverity] = useState('Medium');
  const [newRegulation, setNewRegulation] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newAction, setNewAction] = useState('');

  // AI Report Generator State
  const [aiPrompt, setAiPrompt] = useState('Draft executive summary highlighting CEMS compliance drift and RCRA containment improvements for Q3 Environmental Audit.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState(`EXECUTIVE SUMMARY: Q3 COMPLIANCE & RISK ASSESSMENT
Facility: Des Moines Energy & Manufacturing Complex
Lead Auditor: R. Manuel, PE, Lead Environmental Compliance Auditor

1. OVERVIEW & REGULATORY POSTURE
The Q3 environmental audit evaluated Title V air operating permits, RCRA hazardous waste management units, and NPDES stormwater discharge points. Overall facility compliance remains stable, though targeted corrective action is required for continuous monitoring instrumentation.

2. CRITICAL FINDINGS REQUIRING IMMEDIATE CAP
- Air Emissions: CEMS drift calibration tolerances required immediate recalibration under 40 CFR Part 60. Vendor dispatched on-site.
- Waste Management: Secondary containment pad B housekeeping needs immediate water removal and oil-water separator verification.

3. STRATEGIC RECOMMENDATIONS
Accelerate transition to automated EHS Audit Writer Pro logging to eliminate manual data entry latency and ensure audit-ready records.`);

  const handleAddFinding = (e) => {
    e.preventDefault();
    if (!newLocation || !newNotes) return;
    const item = {
      id: Date.now(),
      category: newCategory,
      location: newLocation,
      severity: newSeverity,
      status: 'Open',
      regulation: newRegulation || 'General EHS Standard',
      notes: newNotes,
      correctiveAction: newAction || 'Pending review'
    };
    setFindings([item, ...findings]);
    setNewLocation('');
    setNewNotes('');
    setNewRegulation('');
    setNewAction('');
  };

  const handleDeleteFinding = (id) => {
    setFindings(findings.filter(f => f.id !== id));
  };

  const runAiGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiOutput(`AI GENERATED COMPLIANCE REPORT UPDATE (${new Date().toLocaleDateString()}):\n\n` +
        `Analyzed ${findings.length} active site findings across air, water, and waste domains.\n` +
        `- High Severity Items: ${findings.filter(f => f.severity === 'High').length}\n` +
        `- Medium Severity Items: ${findings.filter(f => f.severity === 'Medium').length}\n\n` +
        `RECOMMENDED CORRECTIVE ACTION PLAN (CAP):\nAll open observations have been mapped to standardized EPA enforcement response guidelines with automated milestone tracking.`);
    }, 1000);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isWireframeMode ? 'bg-zinc-100 text-zinc-900 border-4 border-dashed border-zinc-300' : 'bg-slate-900 text-slate-100'}`}>
      
      {/* Top Header */}
      <header className={`border-b px-6 py-4 flex flex-wrap justify-between items-center ${isWireframeMode ? 'bg-white border-zinc-300 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isWireframeMode ? 'bg-zinc-900 text-white' : 'bg-blue-600 text-white'}`}>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">EHS Audit Writer Pro</h1>
            <p className={`text-xs ${isWireframeMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Innovex Risk Engineering L.L.C. | AI-Assisted Compliance & CAP Automation
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          {/* Wireframe / High-Fidelity Mode Toggle */}
          <button 
            onClick={() => setIsWireframeMode(!isWireframeMode)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              isWireframeMode 
                ? 'bg-zinc-900 text-white border-zinc-900' 
                : 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
            }`}
          >
            {isWireframeMode ? '📐 Wireframe Blueprint Mode' : '🚀 Enterprise SaaS Mode'}
          </button>
          
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${isWireframeMode ? 'bg-zinc-200 text-zinc-700' : 'bg-blue-900 text-blue-200'}`}>
            v2.4 Production Ready
          </span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={`flex overflow-x-auto border-b px-6 space-x-8 ${isWireframeMode ? 'bg-white border-zinc-300' : 'bg-slate-800 border-slate-700'}`}>
        {[
          { id: 'dashboard', label: 'Dashboard & Metrics', icon: Activity },
          { id: 'inspector', label: 'Site Walk & Audit Inspector', icon: Layers },
          { id: 'generator', label: 'AI Report Generator', icon: Cpu },
          { id: 'library', label: 'Regulations & Templates', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive 
                  ? (isWireframeMode ? 'border-zinc-900 text-zinc-900' : 'border-blue-500 text-blue-400')
                  : (isWireframeMode ? 'border-transparent text-zinc-500 hover:text-zinc-800' : 'border-transparent text-slate-400 hover:text-slate-200')
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="p-6 max-w-7xl mx-auto">
        
        {/* ================= VIEW 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: 'Active Audit Findings', value: findings.length, change: '+2 this week', urgent: findings.filter(f => f.severity === 'High').length },
                { title: 'Open Corrective Action Plans', value: findings.filter(f => f.status === 'Open').length, change: 'Action Required' },
                { title: 'Regulatory Frameworks', value: '4 Active', change: 'Title V, RCRA, NPDES, CEMS' },
                { title: 'Compliance Score', value: '92.4%', change: '+1.8% vs last audit' }
              ].map((stat, i) => (
                <div key={i} className={`p-5 rounded-lg border ${isWireframeMode ? 'bg-white border-zinc-300 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
                  <p className={`text-xs font-medium uppercase tracking-wider ${isWireframeMode ? 'text-zinc-500' : 'text-slate-400'}`}>{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.urgent ? 'text-red-500 font-semibold' : (isWireframeMode ? 'text-zinc-600' : 'text-slate-400')}`}>
                    {stat.change} {stat.urgent ? `(${stat.urgent} High Risk)` : ''}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Findings Quick Table */}
            <div className={`p-6 rounded-lg border ${isWireframeMode ? 'bg-white border-zinc-300' : 'bg-slate-800 border-slate-700'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recent Site Walk Observations</h3>
                <button 
                  onClick={() => setActiveTab('inspector')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center space-x-1 ${isWireframeMode ? 'bg-zinc-900 text-white' : 'bg-blue-600 text-white'}`}
                >
                  <span>Open Full Inspector</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={`border-b ${isWireframeMode ? 'border-zinc-200 text-zinc-500' : 'border-slate-700 text-slate-400'}`}>
                    <tr>
                      <th className="pb-3 font-semibold">Category / Domain</th>
                      <th className="pb-3 font-semibold">Location</th>
                      <th className="pb-3 font-semibold">Severity</th>
                      <th className="pb-3 font-semibold">Regulation</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-slate-700">
                    {findings.map((f) => (
                      <tr key={f.id} className="hover:bg-zinc-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="py-3 font-medium">{f.category}</td>
                        <td className="py-3 text-zinc-500 dark:text-slate-400">{f.location}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                            f.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                            f.severity === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}>
                            {f.severity}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-xs">{f.regulation}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 text-xs font-medium rounded bg-zinc-200 dark:bg-slate-700">
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: SITE WALK INSPECTOR ================= */}
        {activeTab === 'inspector' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Add Finding Form */}
            <div className={`p-6 rounded-lg border h-fit ${isWireframeMode ? 'bg-white border-zinc-300' : 'bg-slate-800 border-slate-700'}`}>
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Plus className="w-5 h-5 text-blue-500" />
                <span>Log New Observation</span>
              </h3>
              
              <form onSubmit={handleAddFinding} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Compliance Domain</label>
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                  >
                    <option>Air Emissions (Title V)</option>
                    <option>Hazardous Waste (RCRA)</option>
                    <option>Wastewater & NPDES</option>
                    <option>CEMS Calibration & Testing</option>
                    <option>Emergency Planning & Community Right-to-Know</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Facility Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Boiler House #2 Sump" 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    required
                    className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Severity</label>
                    <select 
                      value={newSeverity} 
                      onChange={(e) => setNewSeverity(e.target.value)}
                      className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Regulation Code</label>
                    <input 
                      type="text" 
                      placeholder="40 CFR 60..." 
                      value={newRegulation}
                      onChange={(e) => setNewRegulation(e.target.value)}
                      className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Observation Notes</label>
                  <textarea 
                    rows="3"
                    placeholder="Detail the exact finding..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    required
                    className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Corrective Action Plan (CAP)</label>
                  <input 
                    type="text" 
                    placeholder="Remediation steps..." 
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    className={`w-full p-2.5 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-2.5 px-4 text-sm font-bold rounded shadow transition-colors ${isWireframeMode ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                >
                  Log Finding & Track CAP
                </button>
              </form>
            </div>

            {/* Findings Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Active Audit Observations ({findings.length})</h3>
                <span className="text-xs text-zinc-500">Auto-synced with EHS Database</span>
              </div>

              {findings.map((f) => (
                <div key={f.id} className={`p-5 rounded-lg border relative ${isWireframeMode ? 'bg-white border-zinc-300 shadow-sm' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs px-2 py-0.5 font-bold rounded uppercase ${
                        f.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                        f.severity === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                      }`}>
                        {f.severity} Risk
                      </span>
                      <h4 className="text-base font-bold mt-1">{f.category} — {f.location}</h4>
                    </div>
                    <button 
                      onClick={() => handleDeleteFinding(f.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                      title="Delete Finding"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm mt-2 text-zinc-600 dark:text-slate-300">{f.notes}</p>

                  <div className={`mt-4 pt-3 border-t grid grid-cols-1 md:grid-cols-2 gap-2 text-xs ${isWireframeMode ? 'border-zinc-200 text-zinc-500' : 'border-slate-700 text-slate-400'}`}>
                    <div><span className="font-semibold">Regulation:</span> <code className="font-mono">{f.regulation}</code></div>
                    <div><span className="font-semibold">Corrective Action:</span> {f.correctiveAction}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= VIEW 3: AI REPORT GENERATOR ================= */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className={`p-6 rounded-lg border flex flex-col justify-between ${isWireframeMode ? 'bg-white border-zinc-300' : 'bg-slate-800 border-slate-700'}`}>
              <div>
                <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span>AI Compliance Report Assistant</span>
                </h3>
                <p className="text-xs text-zinc-500 mb-4">
                  Automate compliance writeups, root cause analysis, and EPA Corrective Action Plan formatting.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1">Custom AI Directive / Scope</label>
                    <textarea 
                      rows="4" 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className={`w-full p-3 text-sm rounded border ${isWireframeMode ? 'bg-zinc-50 border-zinc-300' : 'bg-slate-900 border-slate-700 text-slate-100'}`}
                    ></textarea>
                  </div>

                  <div className="p-4 rounded bg-zinc-100 dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 text-xs space-y-2">
                    <p className="font-bold uppercase tracking-wider">Loaded Context parameters:</p>
                    <p>• Active Findings: {findings.length} items logged</p>
                    <p>• Auditor Credential: PE & Lead Environmental Compliance Auditor</p>
                    <p>• Standards: GIAS 2024 & US EPA Title V / RCRA Guidelines</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  onClick={runAiGeneration}
                  disabled={isGenerating}
                  className={`w-full py-3 px-4 text-sm font-bold rounded shadow flex items-center justify-center space-x-2 transition-colors ${
                    isGenerating ? 'opacity-50 cursor-not-allowed bg-zinc-500 text-white' : 
                    isWireframeMode ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Synthesizing Compliance Draft...' : 'Generate Executive Report Draft'}</span>
                </button>
              </div>
            </div>

            {/* AI
