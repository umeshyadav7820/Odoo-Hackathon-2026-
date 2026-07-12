import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Vehicles', to: '/vehicles' },
  { label: 'Drivers', to: '/drivers' },
  { label: 'Trips', to: '/trips' },
  { label: 'Maintenance', to: '/maintenance' },
  { label: 'Fuel', to: '/fuel' },
  { label: 'Expenses', to: '/expenses' },
  { label: 'Reports', to: '/reports' },
  { label: 'Profile', to: '/profile' }
];

export default function Sidebar() {
  return (
    <aside className="sidebar-shell">
      <div className="brand-card">
        <div className="brand-badge">T</div>
        <div>
          <p className="eyebrow">Smart Operations</p>
          <h2>TransitOps</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-card">
        <p className="eyebrow">Live Signal</p>
        <h3>Compliance</h3>
        <p>Driver license and maintenance alerts keep dispatch safe.</p>
      </div>
    </aside>
  );
}
