import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function VehicleList() {
  const { vehicles } = useAppContext();

  const statusSummary = useMemo(() => {
    return vehicles.reduce(
      (summary, vehicle) => {
        summary[vehicle.status] = (summary[vehicle.status] || 0) + 1;
        return summary;
      },
      {}
    );
  }, [vehicles]);

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Vehicles</p>
          <h2>Fleet registry</h2>
        </div>
        <div className="panel-actions">
          <span>{vehicles.length} assets</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {Object.entries(statusSummary).map(([status, count]) => (
          <article key={status} className="stat-card">
            <p>{status}</p>
            <h3>{count}</h3>
          </article>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Registration</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Odometer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.registrationNumber}</td>
                <td>{vehicle.name}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.maxLoadCapacity} kg</td>
                <td>{vehicle.odometer} km</td>
                <td>
                  <span className={`status-badge ${vehicle.status === 'Available' ? 'success' : vehicle.status === 'On Trip' ? 'warning' : vehicle.status === 'In Shop' ? 'danger' : 'muted'}`}>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
