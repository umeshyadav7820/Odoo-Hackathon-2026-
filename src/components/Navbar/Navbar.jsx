import './Navbar.css';
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { darkMode, toggleTheme } = useAppContext();

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
        <button className="ghost-button">Search fleet</button>
        <button className="ghost-button" onClick={toggleTheme}>
          {darkMode ? '☀️' : '☾'}
        </button>
      </div>
    </header>
  );
}
