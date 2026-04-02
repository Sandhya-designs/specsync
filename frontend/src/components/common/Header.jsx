import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, LogOut, Home, Settings } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation items based on role
  const getNavigationItems = () => {
    const allItems = [
      { label: 'Dashboard', path: '/dashboard', requiredRoles: ['Admin', 'BusinessAnalyst', 'Developer', 'QA', 'Viewer'] },
      { label: 'Projects', path: '/projects', requiredRoles: ['Admin', 'BusinessAnalyst', 'Developer', 'QA', 'Viewer'] },
      { label: 'Requirements', path: '/requirements', requiredRoles: ['Admin', 'BusinessAnalyst', 'Developer', 'QA', 'Viewer'] },
      { label: 'Features', path: '/features', requiredRoles: ['Admin', 'BusinessAnalyst', 'Developer', 'QA', 'Viewer'] },
      { label: 'Test Cases', path: '/testcases', requiredRoles: ['Admin', 'QA'] },
      { label: 'Drift Report', path: '/drift', requiredRoles: ['Admin', 'BusinessAnalyst', 'Developer', 'QA'] },
      { label: 'Analytics', path: '/analytics', requiredRoles: ['Admin', 'BusinessAnalyst'] },
      { label: 'Users', path: '/users', requiredRoles: ['Admin'] },
    ];

    return allItems.filter(item => item.requiredRoles.includes(user?.role));
  };

  const navigationItems = getNavigationItems();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold text-gray-900">SpecSync</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
                >
                  {item.path === '/dashboard' && <Home size={18} />}
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-small"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-primary transition-colors py-2"
                  onClick={() => setShowMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="btn btn-danger text-left w-full"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
