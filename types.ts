export enum UserRole {
  ADMIN = 'ADMIN',
  HOD = 'HOD',
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatarUrl?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: 'THEORY' | 'LAB';
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
}

export interface Period {
  id: number;
  startTime: string;
  endTime: string;
  isBreak: boolean;
  label?: string; // e.g., "Lunch"
}

export interface TimetableEntry {
  id: string;
  day: string; // "MON", "TUE", etc.
  periodId: number;
  subjectId: string;
  facultyId: string;
  roomId: string;
  batch?: string; // For labs
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  attendanceStatus?: 'PRESENT' | 'ABSENT' | 'OD'; // For local state
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // ISO string
  status: 'OPEN' | 'CLOSED';
  submissionCount: number;
  totalStudents: number;
}
