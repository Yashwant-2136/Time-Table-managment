import React from 'react';
import { MOCK_ASSIGNMENTS } from '../constants';
import { FileText, Plus, Calendar, MoreVertical } from 'lucide-react';

const Assignments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
            <p className="text-slate-500">Manage coursework and internal assessments</p>
        </div>
        <button className="bg-[#1a237e] hover:bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
            <Plus size={18} />
            <span>Create Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ASSIGNMENTS.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-lg ${assignment.status === 'OPEN' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                          <FileText size={24} />
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical size={20} />
                      </button>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight">{assignment.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{assignment.subject}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                      <Calendar size={14} />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                      <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                S{i}
                             </div>
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                             +{assignment.submissionCount - 3}
                          </div>
                      </div>
                      <div className="text-right">
                          <span className="block font-bold text-slate-800">{assignment.submissionCount}/{assignment.totalStudents}</span>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wide">Submitted</span>
                      </div>
                  </div>
              </div>
          ))}

          {/* New Assignment Placehodler */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-white">
                  <Plus size={24} />
              </div>
              <p className="font-medium">Create New</p>
          </div>
      </div>
    </div>
  );
};

export default Assignments;
