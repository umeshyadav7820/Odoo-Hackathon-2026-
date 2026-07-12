import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function ExpenseList() {
  const { expenses, vehicles, addExpense } = useAppContext();
  const [form, setForm] = useState({ vehicleId: '', title: '', amount: '', date: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    addExpense(form);
    setForm({ vehicleId: '', title: '', amount: '', date: '' });
  };

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Expenses</p>
          <h2>Cost tracking</h2>
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Record expense</p>
              <h3>Add new item</h3>
            </div>
          </div>
          <form className="stack-form" onSubmit={handleSubmit}>
            <select value={form.vehicleId} onChange={(event) => setForm((value) => ({ ...value, vehicleId: event.target.value }))} required>
              <option value="">Select vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.registrationNumber}</option>
              ))}
            </select>
            <input placeholder="Expense title" value={form.title} onChange={(event) => setForm((value) => ({ ...value, title: event.target.value }))} required />
            <input type="number" placeholder="Amount" value={form.amount} onChange={(event) => setForm((value) => ({ ...value, amount: event.target.value }))} required />
            <input type="date" value={form.date} onChange={(event) => setForm((value) => ({ ...value, date: event.target.value }))} required />
            <button className="primary-button" type="submit">Save expense</button>
          </form>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recent spend</p>
              <h3>Expense history</h3>
            </div>
          </div>
          <div className="trip-list">
            {expenses.map((entry) => (
              <div key={entry.id} className="trip-card">
                <div className="trip-card-header">
                  <h4>{vehicles.find((vehicle) => vehicle.id === entry.vehicleId)?.registrationNumber ?? 'Unknown vehicle'}</h4>
                  <span className="status-badge danger">Expense</span>
                </div>
                <p>{entry.title} • ${entry.amount}</p>
                <p>{entry.date}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
