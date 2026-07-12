import { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import './TripList.css';

const statusClasses = {
  Draft: 'muted',
  Dispatched: 'warning',
  Completed: 'success',
  Cancelled: 'danger'
};

export default function TripList() {
  const { trips, vehicles, drivers, dispatchTrip, cancelTrip } = useAppContext();

  const vehicleById = useMemo(() => Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle])), [vehicles]);
  const driverById = useMemo(() => Object.fromEntries(drivers.map((driver) => [driver.id, driver])), [drivers]);

  const sortedTrips = [...trips].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Trips</p>
          <h2>Trip dispatch</h2>
        </div>
      </div>

      <div className="trip-summary-row">
        <div>
          <p className="eyebrow">Fleet trips</p>
          <h3>{trips.length} dispatch records</h3>
        </div>
        <div className="trip-summary-card">
          <span>Latest:</span>
          <strong>{sortedTrips[0]?.source ?? 'No trips yet'} → {sortedTrips[0]?.destination ?? 'No route'}</strong>
        </div>
      </div>

      <div className="trip-table">
        <div className="trip-row head">
          <span>Route</span>
          <span>Vehicle</span>
          <span>Driver</span>
          <span>Distance</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {sortedTrips.map((trip) => (
          <div key={trip.id} className="trip-row">
            <div>
              <p className="trip-route">{trip.source} → {trip.destination}</p>
              <small>{trip.createdAt}</small>
            </div>
            <div>{vehicleById[trip.vehicleId]?.name ?? 'Unknown'}</div>
            <div>{driverById[trip.driverId]?.name ?? 'Unassigned'}</div>
            <div>{trip.plannedDistance} km</div>
            <div>
              <span className={`status-pill ${statusClasses[trip.status] ?? ''}`}>{trip.status}</span>
            </div>
            <div className="action-group">
              {trip.status === 'Draft' && (
                <button type="button" className="primary-button" onClick={() => dispatchTrip(trip.id)}>
                  Dispatch
                </button>
              )}
              {trip.status === 'Dispatched' && (
                <button type="button" className="ghost-button danger" onClick={() => cancelTrip(trip.id)}>
                  Cancel
                </button>
              )}
              {trip.status === 'Completed' && <span className="muted-text">Closed</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
