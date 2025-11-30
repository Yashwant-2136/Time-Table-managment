import React, { useState } from 'react';
import { User, Student } from '../types';
import { MOCK_STUDENTS, MOCK_SUBJECTS } from '../constants';
import { Save, CheckCircle, XCircle, Clock } from 'lucide-react';

const Attendance: React.FC<{ user: User | null }> = ({ user }) => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedSubject, setSelectedSubject] = useState(MOCK_SUBJECTS[0].id);

  const toggleStatus = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'OD') => {
    setStudents(prev => prev.map(s => 
        s.id === studentId ? { ...s, attendanceStatus: status } : s
    ));
  };

  const markAll = (status: 'PRESENT' | 'ABSENT') => {
      setStudents(prev => prev.map(s => ({ ...s, attendanceStatus: status })));
  };

  const getStats = () => {
      const present = students.filter(s => s.attendanceStatus === 'PRESENT').length;
      const absent = students.filter(s => s.attendanceStatus === 'ABSENT').length;
      const od = students.filter(s => s.attendanceStatus === 'OD').length;
      return { present, absent, od };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
            <p className="text-slate-500">Mark daily attendance for students</p>
        </div>
        <button className="bg-[#1a237e] hover:bg-blue-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all">
            <Save size={18} />
            <span>Submit Attendance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex gap-4 items-center">
                    <select 
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="bg-slate-50 border border-slate-200 text-sm font-medium rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {MOCK_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
                    </select>
                    <span className="text-sm text-slate-500">{new Date().toLocaleDateString()}</span>
                 </div>
                 <div className="flex gap-2">
                     <button onClick={() => markAll('PRESENT')} className="text-xs font-medium px-3 py-1 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">Mark All Present</button>
                     <button onClick={() => markAll('ABSENT')} className="text-xs font-medium px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors">Mark All Absent</button>
                 </div>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-20">Roll No</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-sm font-medium text-slate-600 font-mono">{student.rollNumber.slice(-3)}</td>
                                <td className="p-4 text-sm font-medium text-slate-800 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                        {student.name.charAt(0)}
                                    </div>
                                    {student.name}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2 bg-slate-100 p-1 rounded-lg w-fit mx-auto">
                                        <button 
                                            onClick={() => toggleStatus(student.id, 'PRESENT')}
                                            className={`p-2 rounded-md transition-all ${student.attendanceStatus === 'PRESENT' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-green-600'}`}
                                            title="Present"
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                        <button 
                                            onClick={() => toggleStatus(student.id, 'ABSENT')}
                                            className={`p-2 rounded-md transition-all ${student.attendanceStatus === 'ABSENT' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400 hover:text-red-600'}`}
                                            title="Absent"
                                        >
                                            <XCircle size={18} />
                                        </button>
                                        <button 
                                            onClick={() => toggleStatus(student.id, 'OD')}
                                            className={`p-2 rounded-md transition-all ${student.attendanceStatus === 'OD' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-blue-600'}`}
                                            title="On Duty"
                                        >
                                            <Clock size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="space-y-4">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Summary</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Present</span>
                        <span className="text-sm font-bold text-green-600">{stats.present}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(stats.present / students.length) * 100}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Absent</span>
                        <span className="text-sm font-bold text-red-600">{stats.absent}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(stats.absent / students.length) * 100}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">On Duty</span>
                        <span className="text-sm font-bold text-blue-600">{stats.od}</span>
                    </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="text-center">
                        <span className="text-3xl font-bold text-slate-800">{Math.round((stats.present / students.length) * 100)}%</span>
                        <p className="text-xs text-slate-400">Class Attendance</p>
                    </div>
                </div>
             </div>

             <div className="bg-[#1a237e] p-6 rounded-xl shadow-lg text-white">
                 <h3 className="font-bold mb-2">Android App</h3>
                 <p className="text-xs text-blue-200 mb-4">Mark attendance offline using the mobile app with biometric security.</p>
                 <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors border border-white/20">
                    Download APK
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
