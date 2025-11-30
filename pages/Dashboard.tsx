import React from 'react';
import { User } from '../types';
import { Users, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { MOCK_TIMETABLE, MOCK_SUBJECTS, PERIODS } from '../constants';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; subtext?: string }> = ({ title, value, icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC<{ user: User | null }> = ({ user }) => {
  // Simple logic to find today's classes
  const today = "MON"; // Mock today
  const todayClasses = MOCK_TIMETABLE.filter(t => t.day === today).sort((a, b) => a.periodId - b.periodId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user?.name.split('.')[1] || 'Faculty'}</h1>
            <p className="text-slate-500">Here is what's happening in your department today.</p>
        </div>
        <div className="text-right hidden sm:block">
            <p className="text-lg font-bold text-[#1a237e]">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p className="text-slate-500 text-sm">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Students" 
            value="142" 
            subtext="Across 3 Classes"
            icon={<Users size={24} />} 
            color="bg-blue-500" 
        />
        <StatCard 
            title="Hours Today" 
            value={`${todayClasses.length} Hrs`} 
            subtext="Next: CS8601 at 10:55"
            icon={<Clock size={24} />} 
            color="bg-emerald-500" 
        />
        <StatCard 
            title="Assignments" 
            value="12" 
            subtext="Pending Grading"
            icon={<BookOpen size={24} />} 
            color="bg-purple-500" 
        />
        <StatCard 
            title="Attendance" 
            value="94%" 
            subtext="Average this month"
            icon={<AlertCircle size={24} />} 
            color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Today's Schedule</h3>
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">Monday</span>
          </div>
          <div className="divide-y divide-slate-50">
            {todayClasses.length > 0 ? todayClasses.map((cls) => {
               const period = PERIODS.find(p => p.id === cls.periodId);
               const subject = MOCK_SUBJECTS.find(s => s.id === cls.subjectId);
               return (
                <div key={cls.id} className="p-4 flex items-center hover:bg-slate-50 transition-colors">
                    <div className="w-24 flex-shrink-0 flex flex-col items-center justify-center border-r border-slate-100 pr-4">
                        <span className="text-sm font-bold text-slate-700">{period?.startTime}</span>
                        <span className="text-xs text-slate-400">{period?.endTime}</span>
                    </div>
                    <div className="pl-4 flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold text-[#1a237e]">{subject?.code} - {subject?.name}</h4>
                                <p className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                                    {cls.roomId} {cls.batch && `• ${cls.batch}`}
                                </p>
                            </div>
                            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Period {cls.periodId}</span>
                        </div>
                    </div>
                </div>
               );
            }) : (
                <div className="p-8 text-center text-slate-500">No classes scheduled for today.</div>
            )}
          </div>
        </div>

        {/* Quick Actions / Notices */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
           <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
           <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3 group">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded group-hover:bg-blue-200">
                      <Users size={18} />
                  </div>
                  <div>
                      <p className="font-medium text-slate-700">Mark Attendance</p>
                      <p className="text-xs text-slate-400">For Period 3 (CS8691)</p>
                  </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all flex items-center gap-3 group">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded group-hover:bg-purple-200">
                      <BookOpen size={18} />
                  </div>
                  <div>
                      <p className="font-medium text-slate-700">Create Assignment</p>
                      <p className="text-xs text-slate-400">Upload Q. Paper</p>
                  </div>
              </button>
           </div>

           <h3 className="font-semibold text-slate-800 mt-8 mb-4">Department Notices</h3>
           <div className="space-y-4">
                <div className="flex gap-3">
                    <div className="w-1 bg-red-400 rounded-full h-full min-h-[40px]"></div>
                    <div>
                        <p className="text-sm font-medium text-slate-800">HOD Meeting</p>
                        <p className="text-xs text-slate-500">Today at 4:30 PM in Conference Hall regarding NAAC visit.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="w-1 bg-blue-400 rounded-full h-full min-h-[40px]"></div>
                    <div>
                        <p className="text-sm font-medium text-slate-800">Timetable Draft</p>
                        <p className="text-xs text-slate-500">Verify your allocated slots for Next Semester by Friday.</p>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
