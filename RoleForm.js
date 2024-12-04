

import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

function RoleForm({ roleId, closeForm }) {
  const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete']);
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    if (roleId) {
      // Fetch the role for editing
      axios.get(`http://localhost:5000/roles/${roleId}`)
        .then(response => setRoleData(response.data))
        .catch(error => console.error("Error fetching role:", error));
    }
  }, [roleId]);

  const formik = useFormik({
    initialValues: {
      name: roleData ? roleData.name : '',
      permissions: roleData ? roleData.permissions : [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Role name is required'),
    }),
    onSubmit: (values) => {
      const method = roleId ? 'put' : 'post';
      const url = roleId ? `http://localhost:5000/roles/${roleId}` : 'http://localhost:5000/roles';
      axios[method](url, values)
        .then(() => closeForm())
        .catch(error => console.error("Error saving role:", error));
    }
  });

  const togglePermission = (permission) => {
    const currentPermissions = formik.values.permissions;
    if (currentPermissions.includes(permission)) {
      formik.setFieldValue('permissions', currentPermissions.filter(p => p !== permission));
    } else {
      formik.setFieldValue('permissions', [...currentPermissions, permission]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Role Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="border p-2 w-full"
        />
        {formik.errors.name && formik.touched.name && <div className="text-red-500">{formik.errors.name}</div>}
      </div>

      <div>
        <label>Permissions</label>
        <div className="space-y-2">
          {permissions.map(permission => (
            <div key={permission}>
              <label>
                <input
                  type="checkbox"
                  checked={formik.values.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
                {permission}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2">Save Role</button>
    </form>
  );
}

export default RoleForm;
