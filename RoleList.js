

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RoleForm from './RoleForm';

function RoleList() {
  const [roles, setRoles] = useState([]);
  const [editingRoleId, setEditingRoleId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error("Error fetching roles:", error));
  }, []);

  const handleEditRole = (roleId) => {
    setEditingRoleId(roleId);
  };

  const handleDeleteRole = (roleId) => {
    axios.delete(`http://localhost:5000/roles/${roleId}`)
      .then(() => setRoles(roles.filter(role => role.id !== roleId)))
      .catch(error => console.error("Error deleting role:", error));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Roles</h2>

      {/* Add Role Button */}
      <button 
        onClick={() => setEditingRoleId(null)} 
        className="bg-green-500 text-white p-2 mb-4"
      >
        Add Role
      </button>

      {/* Show RoleForm if editingRoleId is not null */}
      {editingRoleId ? (
        <RoleForm roleId={editingRoleId} closeForm={() => setEditingRoleId(null)} />
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Permissions</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td className="border px-4 py-2">{role.name}</td>
                <td className="border px-4 py-2">{role.permissions.join(', ')}</td>
                <td className="border px-4 py-2">
                  <button 
                    onClick={() => handleEditRole(role.id)} 
                    className="bg-blue-500 text-white p-1"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRole(role.id)} 
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

export default RoleList;
