import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Reports() {
  const { vehicles, trips, maintenanceRecords, fuelLogs, expenses } = useAppContext();

  const metrics = useMemo(() => {
    const active = vehicles.filter((vehicle) => vehicle.status === 'On Trip').length;
    const available = vehicles.filter((vehicle) => vehicle.status === 'Available').length;
    const maintenance = vehicles.filter((vehicle) => vehicle.status === 'In Shop').length;
    const totalFuel = fuelLogs.reduce((sum, log) => sum + Number(log.liters || 0), 0);
    const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return { active, available, maintenance, totalFuel, totalExpense };
  }, [vehicles, fuelLogs, expenses]);

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Reports</p>
          <h2>Data insights</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Fleet health</p>
              <h3>Operational stats</h3>
            </div>
          </div>
          <div className="metric-stack">
            <div><span>Active vehicles</span><strong>{metrics.active}</strong></div>
            <div><span>Available vehicles</span><strong>{metrics.available}</strong></div>
            <div><span>In maintenance</span><strong>{metrics.maintenance}</strong></div>
            <div><span>Trips logged</span><strong>{trips.length}</strong></div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Cost summary</p>
              <h3>Expense overview</h3>
            </div>
          </div>
          <div className="metric-stack">
            <div><span>Total fuel</span><strong>{metrics.totalFuel} L</strong></div>
            <div><span>Total expenses</span><strong>${metrics.totalExpense}</strong></div>
            <div><span>Maintenance records</span><strong>{maintenanceRecords.length}</strong></div>
          </div>
        </article>
      </div>

      <article className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Trip performance</p>
            <h3>Latest completed trips</h3>
          </div>
        </div>
        <div className="trip-list">
          {trips.filter((trip) => trip.status === 'Completed').slice(0, 5).map((trip) => (
            <div key={trip.id} className="trip-card">
              <div className="trip-card-header">
                <h4>{trip.source} → {trip.destination}</h4>
                <span className="status-badge success">Completed</span>
              </div>
              <p>{trip.plannedDistance} km • {trip.fuelConsumed ?? 'TBD'} L</p>
              <p>{trip.createdAt}</p>
            </div>
          ))}
          {!trips.some((trip) => trip.status === 'Completed') && <p>No completed trips yet.</p>}
        </div>
      </article>
    </div>
  );
}
