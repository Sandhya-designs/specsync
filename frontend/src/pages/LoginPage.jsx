import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/common/Alerts';
import { FormGroup, TextInput } from '../components/common/FormElements';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', email);
      await login({ email, password });
      console.log('Login successful, waiting before redirect...');
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SpecSync</h1>
          <p className="text-gray-600 mt-2">Requirement Drift Detection</p>
        </div>

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup label="Email Address">
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </FormGroup>

          <FormGroup label="Password">
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:underline font-semibold">
            Sign up
          </Link>
        </p>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Demo Credentials:</p>
          <p className="text-xs text-gray-600">Email: admin@specsync.com</p>
          <p className="text-xs text-gray-600">Password: Demo123!</p>
        </div>
      </div>
    </div>
  );
};
