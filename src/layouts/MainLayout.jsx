import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { useAppContext } from '../context/AppContext';
import '../assets/styles/layout.css';

export default function MainLayout() {
  const { darkMode } = useAppContext();

  return (
    <div className={`app-shell app-layout ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <div className="main-shell">
        <Navbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
