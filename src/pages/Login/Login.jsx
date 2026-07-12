import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('admin@transitops.com');
  const [password, setPassword] = useState('TransitOps@2026');
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, feedback } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError('');
    const success = login({ email, password });

    if (!success) {
      setFormError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Login</p>
            <h2>Sign in to TransitOps</h2>
          </div>
        </div>
        <form className="stack-form auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {formError ? <p className="auth-error">{formError}</p> : null}
          <button className="primary-button" type="submit">Sign in</button>
        </form>
        <p className="auth-hint">Demo credentials: admin@transitops.com / TransitOps@2026</p>
        {feedback && !isAuthenticated ? <p className="feedback-banner">{feedback}</p> : null}
      </div>
    </div>
  );
}
