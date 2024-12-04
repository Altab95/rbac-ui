
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RoleList from './components/RoleList';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <ul>
            <li><a href="/users" className="block py-2 hover:bg-gray-600">Users</a></li>
            <li><a href="/roles" className="block py-2 hover:bg-gray-600">Roles</a></li>
          </ul>
        </div>
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/roles" element={<RoleList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
