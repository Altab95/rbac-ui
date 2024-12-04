

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleEditUser = (userId) => {
    setEditingUserId(userId);
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:5000/users/${userId}`)
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch(error => console.error("Error deleting user:", error));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>

      {/* Add User Button */}
      <button
        onClick={() => setEditingUserId(null)} 
        className="bg-green-500 text-white p-2 mb-4"
      >
        Add User
      </button>

      {/* Show UserForm if editingUserId is not null */}
      {editingUserId ? (
        <UserForm userId={editingUserId} closeForm={() => setEditingUserId(null)} />
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleEditUser(user.id)} 
                    className="bg-blue-500 text-white p-1"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)} 
                    className="bg-red-500 text-white p-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;
