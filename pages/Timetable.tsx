import React, { useState } from 'react';
import { User, TimetableEntry } from '../types';
import { PERIODS, DAYS, MOCK_TIMETABLE, MOCK_SUBJECTS } from '../constants';
import { Download, RefreshCw, Filter, Wand2 } from 'lucide-react';

const Timetable: React.FC<{ user: User | null }> = ({ user }) => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(MOCK_TIMETABLE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('Sem 6');
  const [selectedSection, setSelectedSection] = useState('A');

  const handleAutoGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
        setIsGenerating(false);
        alert("Timetable optimized successfully with travel constraints and faculty load balancing!");
    }, 2000);
  };

  const getCellContent = (day: string, periodId: number) => {
    const entry = timetable.find(t => t.day === day && t.periodId === periodId);
    if (!entry) return null;
    const subject = MOCK_SUBJECTS.find(s => s.id === entry.subjectId);
    return { entry, subject };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Academic Timetable</h1>
            <p className="text-slate-500">View and manage class schedules</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleAutoGenerate}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                <span>Auto Generate</span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
                <Download size={18} />
                <span>Export PDF</span>
            </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-slate-500">
            <Filter size={18} />
            <span className="text-sm font-medium">Filters:</span>
        </div>
        <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option>Sem 1</option>
            <option>Sem 2</option>
            <option>Sem 3</option>
            <option>Sem 4</option>
            <option>Sem 5</option>
            <option>Sem 6</option>
            <option>Sem 7</option>
            <option>Sem 8</option>
        </select>
        <select 
             value={selectedSection}
             onChange={(e) => setSelectedSection(e.target.value)}
             className="bg-slate-50 border border-slate-200 text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option>Section A</option>
            <option>Section B</option>
            <option>Section C</option>
        </select>
        <div className="ml-auto text-sm text-slate-500 italic">
            Last updated: Today, 09:00 AM
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <div className="min-w-[1000px] p-1">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 border-b border-slate-200 bg-slate-50 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-20">Day / Time</th>
                        {PERIODS.map(p => (
                            <th key={p.id} className={`p-2 border-b border-slate-200 bg-slate-50 text-center text-slate-700 ${p.isBreak ? 'w-12 bg-slate-100' : 'w-32'}`}>
                                <div className="text-xs font-bold">{p.isBreak ? p.label : `Period ${p.id}`}</div>
                                <div className="text-[10px] text-slate-400 font-normal mt-1">{p.startTime}-{p.endTime}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {DAYS.map(day => (
                        <tr key={day} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 border-r border-slate-100 font-bold text-slate-700 bg-slate-50/30 text-center">{day}</td>
                            {PERIODS.map(p => {
                                if (p.isBreak) {
                                    // Merged row concept for breaks if we wanted, but simplified here:
                                    return (
                                        <td key={p.id} className="bg-slate-100 border-r border-slate-200 relative group text-center">
                                            <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                                                {p.label}
                                            </div>
                                            <span className="text-slate-300 transform -rotate-90 block text-[10px] tracking-widest">{p.label?.toUpperCase()}</span>
                                        </td>
                                    );
                                }
                                
                                const cell = getCellContent(day, p.id);
                                return (
                                    <td key={p.id} className="p-2 border-r border-slate-100 h-24 align-top">
                                        {cell ? (
                                            <div className="h-full bg-blue-50 border border-blue-100 rounded-lg p-2 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative group">
                                                 {/* Simple drag handle simulation */}
                                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 cursor-move text-blue-300">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-[#1a237e] leading-tight mb-1">{cell.subject?.code}</div>
                                                    <div className="text-[11px] text-slate-600 font-medium leading-tight line-clamp-2">{cell.subject?.name}</div>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-blue-100 flex justify-between items-center text-[10px]">
                                                    <span className="bg-white px-1.5 py-0.5 rounded text-slate-500 font-medium">{cell.entry.roomId}</span>
                                                    {cell.entry.batch && <span className="text-blue-600 font-bold">{cell.entry.batch}</span>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-full border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 text-xs hover:bg-slate-50 cursor-pointer">
                                                Free
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      
      <div className="text-xs text-slate-400 text-center">
        * Drag and drop slots to manually adjust. Changes are autosaved to draft.
      </div>
    </div>
  );
};

export default Timetable;
