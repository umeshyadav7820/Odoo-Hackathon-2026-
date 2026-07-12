import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function DriverList() {
  const { drivers } = useAppContext();

  const activeCount = useMemo(() => drivers.filter((driver) => driver.status === 'On Trip').length, [drivers]);

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Drivers</p>
          <h2>Driver management</h2>
        </div>
        <div className="panel-actions">
          <span>{activeCount} on route</span>
        </div>
      </div>

      <div className="driver-grid">
        {drivers.map((driver) => (
          <article key={driver.id} className="driver-card">
            <div className="driver-topline">
              <h4>{driver.name}</h4>
              <span className={`status-badge ${driver.status === 'Available' ? 'success' : driver.status === 'On Trip' ? 'warning' : 'danger'}`}>
                {driver.status}
              </span>
            </div>
            <p>{driver.contactNumber}</p>
            <p>License {driver.licenseNumber} ({driver.licenseCategory})</p>
            <p>Expiry {driver.licenseExpiry}</p>
            <p>Safety score {driver.safetyScore}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
