import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li><Link to="/users" className="block py-2 hover:bg-gray-600">Users</Link></li>
        <li><Link to="/roles" className="block py-2 hover:bg-gray-600">Roles</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
