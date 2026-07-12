import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Dashboard.css';

export default function Dashboard() {
  const { vehicles, drivers, trips, maintenanceRecords, fuelLogs } = useAppContext();

  const activeVehicles = vehicles.filter((vehicle) => vehicle.status === 'On Trip').length;
  const availableCount = vehicles.filter((vehicle) => vehicle.status === 'Available').length;
  const inShopCount = vehicles.filter((vehicle) => vehicle.status === 'In Shop').length;
  const activeTrips = trips.filter((trip) => trip.status === 'Dispatched').length;
  const pendingTrips = trips.filter((trip) => trip.status === 'Draft').length;
  const driversOnDuty = drivers.filter((driver) => driver.status !== 'Off Duty' && driver.status !== 'Suspended').length;
  const fleetUtilization = Math.round((activeVehicles / vehicles.length) * 100);

  const fuelEfficiency = useMemo(() => {
    const completedTrips = trips.filter((trip) => trip.status === 'Completed' && trip.fuelConsumed);
    if (!completedTrips.length) return '0.0';
    const totalDistance = completedTrips.reduce((sum, trip) => sum + trip.plannedDistance, 0);
    const totalFuel = completedTrips.reduce((sum, trip) => sum + (trip.fuelConsumed || 0), 0);
    return (totalDistance / totalFuel).toFixed(1);
  }, [trips]);

  const operationalCost = useMemo(() => {
    const maintenanceCost = maintenanceRecords.filter((record) => record.status === 'Closed').reduce((sum, record) => sum + Number(record.cost || 0), 0);
    const fuelCost = fuelLogs.reduce((sum, log) => sum + Number(log.cost || 0), 0);
    return maintenanceCost + fuelCost;
  }, [maintenanceRecords, fuelLogs]);

  const vehicleRoi = useMemo(() => {
    if (!vehicles.length) return '0%';
    const revenue = 180000;
    const cost = operationalCost;
    const roi = ((revenue - cost) / 68000) * 100;
    return `${roi.toFixed(0)}%`;
  }, [operationalCost, vehicles]);

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Fleet operations</h2>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { title: 'Active Vehicles', value: activeVehicles },
          { title: 'Available Vehicles', value: availableCount },
          { title: 'Vehicles in Maintenance', value: inShopCount },
          { title: 'Active Trips', value: activeTrips },
          { title: 'Pending Trips', value: pendingTrips },
          { title: 'Drivers On Duty', value: driversOnDuty }
        ].map((item) => (
          <article key={item.title} className="stat-card">
            <p>{item.title}</p>
            <h3>{item.value}</h3>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <article className="panel wide">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Fleet utilization</p>
              <h3>{fleetUtilization}%</h3>
            </div>
            <div className="pill">{vehicles.length} assets</div>
          </div>
          <div className="bar-chart">
            {[40, 78, 55, 92, 64].map((value, index) => (
              <div key={index} className="bar-column">
                <div className="bar-fill" style={{ height: `${value}%` }} />
                <span>W{index + 1}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Performance</p>
              <h3>Snapshot</h3>
            </div>
          </div>
          <div className="metric-stack">
            <div><span>Fuel efficiency</span><strong>{fuelEfficiency} km/L</strong></div>
            <div><span>Operational cost</span><strong>${operationalCost}</strong></div>
            <div><span>Vehicle ROI</span><strong>{vehicleRoi}</strong></div>
          </div>
        </article>
      </div>
    </div>
  );
}
