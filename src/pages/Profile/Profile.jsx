import { useAppContext } from '../../context/AppContext';

export default function Profile() {
  const { darkMode, toggleTheme } = useAppContext();

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Profile</p>
          <h2>User settings</h2>
        </div>
      </div>
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Theme</p>
            <h3>Display mode</h3>
          </div>
        </div>
        <p>Toggle the dashboard theme and adjust your workspace ambience.</p>
        <button className="primary-button" type="button" onClick={toggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} mode
        </button>
      </section>
    </div>
  );
}
