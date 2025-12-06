import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import BookSearch from './pages/BookSearch';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import FinePayment from './pages/FinePayment';
import AddBook from './pages/AddBook';
import ManageMembers from './pages/ManageMembers';
import ManageUsers from './pages/ManageUsers';
import IssueRequests from './pages/IssueRequests';
import Reports from './pages/Reports';
import Charts from './pages/Charts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/books/search"
            element={
              <PrivateRoute>
                <BookSearch />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/transactions/issue"
            element={
              <PrivateRoute>
                <IssueBook />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/transactions/return"
            element={
              <PrivateRoute>
                <ReturnBook />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/transactions/fine-payment"
            element={
              <PrivateRoute>
                <FinePayment />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/books/add"
            element={
              <PrivateRoute adminOnly={true}>
                <AddBook />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/members"
            element={
              <PrivateRoute adminOnly={true}>
                <ManageMembers />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/users"
            element={
              <PrivateRoute adminOnly={true}>
                <ManageUsers />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/issue-requests"
            element={
              <PrivateRoute>
                <IssueRequests />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute adminOnly={true}>
                <Reports />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin/charts"
            element={
              <PrivateRoute adminOnly={true}>
                <Charts />
              </PrivateRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
