import './Navbar.css';
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { darkMode, toggleTheme, user, logout } = useAppContext();

  return (
    <header className="navbar-shell">
      <div className="navbar-brand">
        <div className="navbar-logo">T</div>
        <div>
          <p className="eyebrow">TransitOps</p>
          <h1>Smart Transport</h1>
        </div>
      </div>
      <div className="navbar-actions">
        <span className="nav-user">{user?.name || 'Manager'}</span>
        <button className="ghost-button">Search fleet</button>
        <button className="ghost-button" onClick={toggleTheme}>
          {darkMode ? '☀️' : '☾'}
        </button>
        <button className="ghost-button" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
