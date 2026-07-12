import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function FuelLogs() {
  const { fuelLogs, vehicles, addFuelLog } = useAppContext();
  const [form, setForm] = useState({ vehicleId: '', liters: '', cost: '', date: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    addFuelLog(form);
    setForm({ vehicleId: '', liters: '', cost: '', date: '' });
  };

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Fuel</p>
          <h2>Fuel tracking</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">New log</p>
              <h3>Add fuel entry</h3>
            </div>
          </div>
          <form className="stack-form" onSubmit={handleSubmit}>
            <select value={form.vehicleId} onChange={(event) => setForm((value) => ({ ...value, vehicleId: event.target.value }))} required>
              <option value="">Select vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.registrationNumber}</option>
              ))}
            </select>
            <input type="number" placeholder="Liters" value={form.liters} onChange={(event) => setForm((value) => ({ ...value, liters: event.target.value }))} required />
            <input type="number" placeholder="Cost" value={form.cost} onChange={(event) => setForm((value) => ({ ...value, cost: event.target.value }))} required />
            <input type="date" value={form.date} onChange={(event) => setForm((value) => ({ ...value, date: event.target.value }))} required />
            <button className="primary-button" type="submit">Save fuel log</button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recent fills</p>
              <h3>Fuel history</h3>
            </div>
          </div>
          <div className="trip-list">
            {fuelLogs.map((entry) => (
              <div key={entry.id} className="trip-card">
                <div className="trip-card-header">
                  <h4>{vehicles.find((vehicle) => vehicle.id === entry.vehicleId)?.registrationNumber ?? 'Unknown vehicle'}</h4>
                  <span className="status-badge muted">Fuel</span>
                </div>
                <p>{entry.liters} L • ${entry.cost}</p>
                <p>{entry.date}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
