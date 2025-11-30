import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import Layout from './components/Layout';
import { User } from './types';

// Mock Auth wrapper
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedUser = localStorage.getItem('psna_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('psna_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('psna_user');
    setUser(null);
  };

  if (loading) return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;

  // Clone children and pass auth props
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.cloneElement(child, { user, login, logout } as any);
    }
    return child;
  });
};

interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC<{ user: User | null; login: (u: User) => void; logout: () => void }> = ({ user, login, logout }) => {
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={login} />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute user={user}>
            <Layout user={user} onLogout={logout}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/timetable" element={<Timetable user={user} />} />
                <Route path="/attendance" element={<Attendance user={user} />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes user={null} login={() => {}} logout={() => {}} />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
