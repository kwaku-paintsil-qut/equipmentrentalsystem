import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Add new pages here. `roles` limits who sees the link; omit it to show to everyone logged in.
const menuItems = [
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/dashboard', label: 'Bookings Dashboard', roles: ['staff', 'manager'] },
];

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const visibleItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded whitespace-nowrap ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <aside className="bg-gray-100 border-b md:border-b-0 md:border-r md:w-56 md:min-h-[calc(100vh-4.5rem)] p-4">
      <nav>
        <ul className="flex md:flex-col gap-2 overflow-x-auto">
          {visibleItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
