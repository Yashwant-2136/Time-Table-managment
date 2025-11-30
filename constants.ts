import { Period, Subject, Faculty, User, UserRole, TimetableEntry, Student, Assignment } from './types';

export const APP_NAME = "PSNA College of Engineering & Technology";
// Updated academic logo/crest placeholder
export const LOGO_URL = "https://cdn-icons-png.flaticon.com/512/2231/2231649.png"; 

export const PERIODS: Period[] = [
  { id: 1, startTime: "08:45", endTime: "09:40", isBreak: false },
  { id: 2, startTime: "09:40", endTime: "10:35", isBreak: false },
  { id: 101, startTime: "10:35", endTime: "10:55", isBreak: true, label: "Break" },
  { id: 3, startTime: "10:55", endTime: "11:45", isBreak: false },
  { id: 4, startTime: "11:45", endTime: "12:35", isBreak: false },
  { id: 102, startTime: "12:35", endTime: "13:45", isBreak: true, label: "Lunch" },
  { id: 5, startTime: "13:45", endTime: "14:35", isBreak: false },
  { id: 6, startTime: "14:35", endTime: "15:25", isBreak: false },
  { id: 7, startTime: "15:25", endTime: "16:15", isBreak: false },
];

export const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const MOCK_USER: User = {
  id: "u1",
  name: "Dr. A. Sharma",
  email: "asharma@psnacet.edu.in",
  role: UserRole.FACULTY,
  department: "CSE",
  avatarUrl: "https://picsum.photos/id/64/100/100"
};

export const MOCK_SUBJECTS: Subject[] = [
  { id: "s1", code: "CS8601", name: "Mobile Computing", credits: 3, type: 'THEORY' },
  { id: "s2", code: "CS8602", name: "Compiler Design", credits: 4, type: 'THEORY' },
  { id: "s3", code: "CS8691", name: "Artificial Intelligence", credits: 3, type: 'THEORY' },
  { id: "s4", code: "CS8611", name: "Mini Project", credits: 2, type: 'LAB' },
  { id: "s5", code: "CS8080", name: "Information Retrieval", credits: 3, type: 'THEORY' },
];

export const MOCK_FACULTY: Faculty[] = [
  { id: "f1", name: "Dr. A. Sharma", designation: "Professor", departmentId: "CSE" },
  { id: "f2", name: "Mrs. K. Devi", designation: "Asst. Prof", departmentId: "CSE" },
  { id: "f3", name: "Mr. R. Kumar", designation: "Assoc. Prof", departmentId: "CSE" },
];

// Seed some timetable data
export const MOCK_TIMETABLE: TimetableEntry[] = [
  { id: "t1", day: "MON", periodId: 1, subjectId: "s1", facultyId: "f1", roomId: "LH-101" },
  { id: "t2", day: "MON", periodId: 2, subjectId: "s2", facultyId: "f2", roomId: "LH-101" },
  { id: "t3", day: "MON", periodId: 3, subjectId: "s3", facultyId: "f3", roomId: "LH-101" },
  { id: "t4", day: "MON", periodId: 4, subjectId: "s5", facultyId: "f1", roomId: "LH-101" },
  { id: "t5", day: "MON", periodId: 5, subjectId: "s4", facultyId: "f2", roomId: "LAB-2", batch: "Batch A" },
  { id: "t6", day: "MON", periodId: 6, subjectId: "s4", facultyId: "f2", roomId: "LAB-2", batch: "Batch A" },
  { id: "t7", day: "MON", periodId: 7, subjectId: "s4", facultyId: "f2", roomId: "LAB-2", batch: "Batch A" },
  
  { id: "t8", day: "TUE", periodId: 1, subjectId: "s2", facultyId: "f2", roomId: "LH-101" },
  { id: "t9", day: "TUE", periodId: 2, subjectId: "s3", facultyId: "f3", roomId: "LH-101" },
];

export const MOCK_STUDENTS: Student[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `st${i + 1}`,
  rollNumber: `921319104${(i + 1).toString().padStart(3, '0')}`,
  name: `Student Name ${i + 1}`,
  attendanceStatus: 'PRESENT'
}));

export const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: "a1", title: "Unit 1: Architecture Diagrams", subject: "Mobile Computing", dueDate: "2023-11-15T23:59:00", status: "OPEN", submissionCount: 45, totalStudents: 60 },
  { id: "a2", title: "Lexical Analyzer Implementation", subject: "Compiler Design", dueDate: "2023-11-10T23:59:00", status: "CLOSED", submissionCount: 58, totalStudents: 60 },
];