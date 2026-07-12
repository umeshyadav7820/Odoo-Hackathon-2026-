import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

const initialVehicles = [
  {
    id: 1,
    registrationNumber: 'Van-05',
    name: 'Mercedes Sprinter',
    type: 'Van',
    maxLoadCapacity: 500,
    odometer: 125400,
    acquisitionCost: 68000,
    status: 'Available',
    region: 'North'
  },
  {
    id: 2,
    registrationNumber: 'Box-12',
    name: 'Isuzu N-Series',
    type: 'Truck',
    maxLoadCapacity: 1200,
    odometer: 188200,
    acquisitionCost: 94000,
    status: 'On Trip',
    region: 'West'
  },
  {
    id: 3,
    registrationNumber: 'Temp-09',
    name: 'Toyota Hiace',
    type: 'Van',
    maxLoadCapacity: 700,
    odometer: 98000,
    acquisitionCost: 52000,
    status: 'In Shop',
    region: 'Central'
  },
  {
    id: 4,
    registrationNumber: 'Flat-21',
    name: 'Volvo Lorry',
    type: 'Truck',
    maxLoadCapacity: 1800,
    odometer: 260100,
    acquisitionCost: 112000,
    status: 'Available',
    region: 'South'
  }
];

const initialDrivers = [
  {
    id: 1,
    name: 'Alex',
    licenseNumber: 'DL-2048',
    licenseCategory: 'C',
    licenseExpiry: '2027-08-20',
    contactNumber: '+1 555 1122',
    safetyScore: 94,
    status: 'Available'
  },
  {
    id: 2,
    name: 'Mina',
    licenseNumber: 'DL-7751',
    licenseCategory: 'C',
    contactNumber: '+1 555 2233',
    safetyScore: 87,
    licenseExpiry: '2026-09-01',
    status: 'On Trip'
  },
  {
    id: 3,
    name: 'Noah',
    licenseNumber: 'DL-9910',
    licenseCategory: 'B',
    contactNumber: '+1 555 4455',
    safetyScore: 78,
    licenseExpiry: '2025-12-10',
    status: 'Suspended'
  }
];

const initialTrips = [
  {
    id: 1,
    source: 'North Hub',
    destination: 'Downtown',
    vehicleId: 2,
    driverId: 2,
    cargoWeight: 900,
    plannedDistance: 128,
    status: 'Completed',
    finalOdometer: 188400,
    fuelConsumed: 21,
    createdAt: '2026-07-10'
  },
  {
    id: 2,
    source: 'Central Depot',
    destination: 'Airport',
    vehicleId: 1,
    driverId: 1,
    cargoWeight: 450,
    plannedDistance: 86,
    status: 'Draft',
    createdAt: '2026-07-12'
  }
];

const initialMaintenance = [
  {
    id: 1,
    vehicleId: 3,
    title: 'Oil Change',
    description: 'Routine service and brake inspection',
    cost: 320,
    status: 'Closed',
    date: '2026-07-07'
  }
];

const initialFuelLogs = [
  {
    id: 1,
    vehicleId: 2,
    liters: 21,
    cost: 56,
    date: '2026-07-10'
  }
];

const initialExpenses = [
  {
    id: 1,
    title: 'Toll',
    vehicleId: 2,
    amount: 18,
    date: '2026-07-10'
  }
];

const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const storedUser = window.localStorage.getItem('transitops-user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const getStoredAuth = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('transitops-auth') === 'true';
};

export function AppProvider({ children }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [trips, setTrips] = useState(initialTrips);
  const [maintenanceRecords, setMaintenanceRecords] = useState(initialMaintenance);
  const [fuelLogs, setFuelLogs] = useState(initialFuelLogs);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [darkMode, setDarkMode] = useState(true);
  const [feedback, setFeedback] = useState('Fleet commands are ready for the next dispatch window.');
  const [user, setUser] = useState(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isAuthenticated && user) {
      window.localStorage.setItem('transitops-auth', 'true');
      window.localStorage.setItem('transitops-user', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('transitops-auth');
      window.localStorage.removeItem('transitops-user');
    }
  }, [isAuthenticated, user]);

  const login = ({ email, password }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    if (normalizedEmail === 'admin@transitops.com' && normalizedPassword === 'TransitOps@2026') {
      const sessionUser = {
        id: 1,
        name: 'Alex Morgan',
        email: normalizedEmail,
        role: 'Fleet Manager'
      };
      setUser(sessionUser);
      setIsAuthenticated(true);
      setFeedback(`Welcome back, ${sessionUser.name}.`);
      return true;
    }

    setFeedback('Invalid credentials. Use admin@transitops.com / TransitOps@2026.');
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setFeedback('You have been signed out.');
  };

  const createTrip = (payload) => {
    const vehicle = vehicles.find((v) => v.id === Number(payload.vehicleId));
    const driver = drivers.find((d) => d.id === Number(payload.driverId));

    if (!vehicle || !driver) {
      setFeedback('Select both a vehicle and driver.');
      return false;
    }
    if (vehicle.status !== 'Available' || driver.status !== 'Available') {
      setFeedback('Vehicle or driver is not available for dispatch.');
      return false;
    }
    if (Number(payload.cargoWeight) > vehicle.maxLoadCapacity) {
      setFeedback('Cargo exceeds vehicle capacity.');
      return false;
    }
    if (driver.licenseExpiry && new Date(driver.licenseExpiry) <= new Date()) {
      setFeedback('Selected driver has an expired license.');
      return false;
    }
    const newTrip = {
      id: Date.now(),
      source: payload.source,
      destination: payload.destination,
      vehicleId: Number(payload.vehicleId),
      driverId: Number(payload.driverId),
      cargoWeight: Number(payload.cargoWeight),
      plannedDistance: Number(payload.plannedDistance),
      status: 'Draft',
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setTrips((current) => [newTrip, ...current]);
    setFeedback('Trip created and waiting for dispatch.');
    return true;
  };

  const dispatchTrip = (tripId) => {
    const trip = trips.find((item) => item.id === tripId);
    if (!trip || trip.status !== 'Draft') {
      setFeedback('Only draft trips can be dispatched.');
      return;
    }
    setTrips((current) => current.map((item) => item.id === tripId ? { ...item, status: 'Dispatched' } : item));
    setVehicles((current) => current.map((item) => item.id === trip.vehicleId ? { ...item, status: 'On Trip' } : item));
    setDrivers((current) => current.map((item) => item.id === trip.driverId ? { ...item, status: 'On Trip' } : item));
    setFeedback('Trip dispatched and crew is on route.');
  };

  const completeTrip = (tripId, finalOdometer, fuelConsumed) => {
    const trip = trips.find((item) => item.id === tripId);
    if (!trip || trip.status !== 'Dispatched') {
      setFeedback('Only dispatched trips can be completed.');
      return false;
    }
    if (!finalOdometer || !fuelConsumed) {
      setFeedback('Final odometer and fuel consumed are required.');
      return false;
    }
    setTrips((current) => current.map((item) => item.id === tripId ? { ...item, status: 'Completed', finalOdometer, fuelConsumed } : item));
    setVehicles((current) => current.map((item) => item.id === trip.vehicleId ? { ...item, status: 'Available', odometer: finalOdometer } : item));
    setDrivers((current) => current.map((item) => item.id === trip.driverId ? { ...item, status: 'Available' } : item));
    setFuelLogs((current) => [
      {
        id: Date.now(),
        vehicleId: trip.vehicleId,
        liters: Number(fuelConsumed),
        cost: Number((Number(fuelConsumed) * 2.8).toFixed(2)),
        date: new Date().toISOString().slice(0, 10)
      },
      ...current
    ]);
    setFeedback('Trip completed and vehicle returned to service.');
    return true;
  };

  const cancelTrip = (tripId) => {
    const trip = trips.find((item) => item.id === tripId);
    if (!trip || trip.status !== 'Dispatched') {
      setFeedback('Only dispatched trips can be cancelled.');
      return;
    }
    setTrips((current) => current.map((item) => item.id === tripId ? { ...item, status: 'Cancelled' } : item));
    setVehicles((current) => current.map((item) => item.id === trip.vehicleId ? { ...item, status: 'Available' } : item));
    setDrivers((current) => current.map((item) => item.id === trip.driverId ? { ...item, status: 'Available' } : item));
    setFeedback('Trip cancelled and assets released.');
  };

  const createMaintenance = (payload) => {
    const vehicle = vehicles.find((item) => item.id === Number(payload.vehicleId));
    if (!vehicle) {
      setFeedback('Choose a valid vehicle.');
      return false;
    }
    const newRecord = {
      id: Date.now(),
      vehicleId: vehicle.id,
      title: payload.title,
      description: payload.description,
      cost: Number(payload.cost || 0),
      status: 'Open',
      date: new Date().toISOString().slice(0, 10)
    };
    setMaintenanceRecords((current) => [newRecord, ...current]);
    setVehicles((current) => current.map((item) => item.id === vehicle.id ? { ...item, status: 'In Shop' } : item));
    setFeedback('Maintenance record created and vehicle moved to shop.');
    return true;
  };

  const closeMaintenance = (recordId) => {
    const record = maintenanceRecords.find((item) => item.id === recordId);
    if (!record) return;
    setMaintenanceRecords((current) => current.map((item) => item.id === recordId ? { ...item, status: 'Closed' } : item));
    setVehicles((current) => current.map((item) => item.id === record.vehicleId && item.status !== 'Retired' ? { ...item, status: 'Available' } : item));
    setFeedback('Maintenance closed and vehicle returned to availability.');
  };

  const addFuelLog = (payload) => {
    const newLog = {
      id: Date.now(),
      vehicleId: Number(payload.vehicleId),
      liters: Number(payload.liters || 0),
      cost: Number(payload.cost || 0),
      date: payload.date || new Date().toISOString().slice(0, 10)
    };
    setFuelLogs((current) => [newLog, ...current]);
    setFeedback('Fuel log added.');
  };

  const addExpense = (payload) => {
    const newExpense = {
      id: Date.now(),
      vehicleId: Number(payload.vehicleId),
      title: payload.title,
      amount: Number(payload.amount || 0),
      date: payload.date || new Date().toISOString().slice(0, 10)
    };
    setExpenses((current) => [newExpense, ...current]);
    setFeedback('Expense recorded.');
  };

  const toggleTheme = () => setDarkMode((value) => !value);

  const value = useMemo(() => ({
    vehicles,
    drivers,
    trips,
    maintenanceRecords,
    fuelLogs,
    expenses,
    darkMode,
    feedback,
    user,
    isAuthenticated,
    createTrip,
    dispatchTrip,
    completeTrip,
    cancelTrip,
    createMaintenance,
    closeMaintenance,
    addFuelLog,
    addExpense,
    toggleTheme,
    login,
    logout,
    setFeedback
  }), [vehicles, drivers, trips, maintenanceRecords, fuelLogs, expenses, darkMode, feedback, user, isAuthenticated]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
