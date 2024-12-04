import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

function UserForm({ userId, closeForm }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch roles to assign
    axios.get('http://localhost:5000/roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error("Error fetching roles:", error));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      role: '',
      status: 'Active',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: (values) => {
      const method = userId ? 'put' : 'post';
      const url = userId ? `http://localhost:5000/users/${userId}` : 'http://localhost:5000/users';
      axios[method](url, values)
        .then(() => closeForm())
        .catch(error => console.error("Error saving user:", error));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
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
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          onChange={formik.handleChange}
          value={formik.values.role}
          className="border p-2 w-full"
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </select>
        {formik.errors.role && formik.touched.role && <div className="text-red-500">{formik.errors.role}</div>}
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
          className="border p-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Save User</button>
    </form>
  );
}

export default UserForm;
