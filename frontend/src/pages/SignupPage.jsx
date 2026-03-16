import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/common/Alerts';
import { FormGroup, TextInput, Select } from '../components/common/FormElements';

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Developer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { label: 'Business Analyst', value: 'BusinessAnalyst' },
    { label: 'Developer', value: 'Developer' },
    { label: 'QA Engineer', value: 'QA' },
    { label: 'Admin', value: 'Admin' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { confirmPassword, ...signupData } = formData;
      console.log('Signup attempt with:', signupData);
      await signup(signupData);
      console.log('Signup successful, redirecting...');
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err?.message || err?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
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
          <p className="text-gray-600 mt-2">Create Your Account</p>
        </div>

        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="First Name">
              <TextInput
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </FormGroup>

            <FormGroup label="Last Name">
              <TextInput
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </FormGroup>
          </div>

          <FormGroup label="Email Address">
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </FormGroup>

          <FormGroup label="Role">
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roles}
            />
          </FormGroup>

          <FormGroup label="Password">
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          <FormGroup label="Confirm Password">
            <TextInput
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </FormGroup>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
