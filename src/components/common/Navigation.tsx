import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 首页', icon: 'home' },
    { path: '/profile', label: '👤 个人中心', icon: 'user' },
    { path: '/faucet', label: '🚰 水龙头', icon: 'faucet' },
    { path: '/staking', label: '💎 质押', icon: 'stake' },
    { path: '/treasury', label: '🏦 理财', icon: 'treasury' },
    { path: '/api-test', label: '🧪 API测试', icon: 'test' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl">🎓</div>
            <span className="text-white font-bold text-xl hidden md:block">
              Web3 University
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(item.path)
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden text-lg">
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
