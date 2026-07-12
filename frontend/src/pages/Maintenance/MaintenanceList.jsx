import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function MaintenanceList() {
  const { maintenanceRecords, vehicles, createMaintenance, closeMaintenance } = useAppContext();
  const [form, setForm] = useState({ vehicleId: '', title: '', description: '', cost: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createMaintenance(form)) {
      setForm({ vehicleId: '', title: '', description: '', cost: '' });
    }
  };

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Maintenance</p>
          <h2>Service records</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">New request</p>
              <h3>Schedule service</h3>
            </div>
          </div>
          <form className="stack-form" onSubmit={handleSubmit}>
            <select value={form.vehicleId} onChange={(event) => setForm((value) => ({ ...value, vehicleId: event.target.value }))} required>
              <option value="">Select vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.registrationNumber} • {vehicle.name}</option>
              ))}
            </select>
            <input placeholder="Service title" value={form.title} onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))} required />
            <textarea placeholder="Description" value={form.description} onChange={(event) => setForm((value) => ({ ...value, description: event.target.value }))} required />
            <input type="number" placeholder="Estimated cost" value={form.cost} onChange={(event) => setForm((value) => ({ ...value, cost: event.target.value }))} required />
            <button className="primary-button" type="submit">Create record</button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Active work</p>
              <h3>Service history</h3>
            </div>
          </div>
          <div className="trip-list">
            {maintenanceRecords.map((record) => (
              <div key={record.id} className="trip-card">
                <div className="trip-card-header">
                  <h4>{record.title}</h4>
                  <span className={`status-badge ${record.status === 'Open' ? 'warning' : 'success'}`}>
                    {record.status}
                  </span>
                </div>
                <p>{vehicles.find((vehicle) => vehicle.id === record.vehicleId)?.registrationNumber ?? 'Unknown vehicle'}</p>
                <p>{record.description}</p>
                <p>Cost ${record.cost} • {record.date}</p>
                {record.status === 'Open' && (
                  <button className="ghost-button" type="button" onClick={() => closeMaintenance(record.id)}>
                    Close maintenance
                  </button>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
