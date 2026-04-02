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

        <div className="mt-8 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
          <p className="text-xs text-gray-600 mb-3 font-semibold">📋 Demo Credentials by Role:</p>
          
          <div className="space-y-2">
            {/* Admin */}
            <div className="border-l-4 border-blue-600 pl-3 py-2">
              <p className="text-xs font-bold text-gray-900">👑 Admin</p>
              <p className="text-xs text-gray-600">Email: <span className="text-blue-600">admin@specsync.com</span></p>
              <p className="text-xs text-gray-600">Password: <span className="text-blue-600">Demo123!</span></p>
              <p className="text-xs text-gray-500">Access: Full system access</p>
            </div>

            {/* BusinessAnalyst */}
            <div className="border-l-4 border-green-600 pl-3 py-2">
              <p className="text-xs font-bold text-gray-900">📊 BusinessAnalyst</p>
              <p className="text-xs text-gray-600">Email: <span className="text-green-600">analyst@specsync.com</span></p>
              <p className="text-xs text-gray-600">Password: <span className="text-green-600">Demo123!</span></p>
              <p className="text-xs text-gray-500">Access: Manage requirements & features</p>
            </div>

            {/* Developer */}
            <div className="border-l-4 border-purple-600 pl-3 py-2">
              <p className="text-xs font-bold text-gray-900">💻 Developer</p>
              <p className="text-xs text-gray-600">Email: <span className="text-purple-600">developer@specsync.com</span></p>
              <p className="text-xs text-gray-600">Password: <span className="text-purple-600">Demo123!</span></p>
              <p className="text-xs text-gray-500">Access: View & update features</p>
            </div>

            {/* QA */}
            <div className="border-l-4 border-orange-600 pl-3 py-2">
              <p className="text-xs font-bold text-gray-900">🧪 QA</p>
              <p className="text-xs text-gray-600">Email: <span className="text-orange-600">qa@specsync.com</span></p>
              <p className="text-xs text-gray-600">Password: <span className="text-orange-600">Demo123!</span></p>
              <p className="text-xs text-gray-500">Access: Create & manage test cases</p>
            </div>

            {/* Viewer */}
            <div className="border-l-4 border-gray-400 pl-3 py-2">
              <p className="text-xs font-bold text-gray-900">👁️ Viewer</p>
              <p className="text-xs text-gray-600">Email: <span className="text-gray-600">viewer@specsync.com</span></p>
              <p className="text-xs text-gray-600">Password: <span className="text-gray-600">Demo123!</span></p>
              <p className="text-xs text-gray-500">Access: Read-only access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
