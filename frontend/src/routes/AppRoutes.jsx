import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import VehicleList from '../pages/Vehicles/VehicleList';
import DriverList from '../pages/Drivers/DriverList';
import TripList from '../pages/Trips/TripList';
import MaintenanceList from '../pages/Maintenance/MaintenanceList';
import FuelLogs from '../pages/Fuel/FuelLogs';
import ExpenseList from '../pages/Expenses/ExpenseList';
import Reports from '../pages/Reports/Reports';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="vehicles" element={<VehicleList />} />
        <Route path="drivers" element={<DriverList />} />
        <Route path="trips" element={<TripList />} />
        <Route path="maintenance" element={<MaintenanceList />} />
        <Route path="fuel" element={<FuelLogs />} />
        <Route path="expenses" element={<ExpenseList />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}
