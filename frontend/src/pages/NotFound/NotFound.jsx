import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">404</p>
          <h2>Page not found</h2>
        </div>
      </div>
      <p>The route you requested does not exist.</p>
      <Link to="/" className="primary-button">Back to Dashboard</Link>
    </div>
  );
}
