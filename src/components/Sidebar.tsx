
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, User, Settings, LogOut } from 'lucide-react';
import Logo from './Logo';

interface SidebarProps {
  email?: string;
  officeLabel?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  email = 'escritoriox@gmail.com',
  officeLabel = 'Escritório x'
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar p-4 z-10">
      <div className="mb-6 flex justify-center pt-2">
        <Logo size="sm" className="shrink-0" />
      </div>
      
      <div className="mb-8 flex items-center p-2 bg-gray-800/30 rounded-lg">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
          <span className="text-gray-800 font-bold text-xl">E</span>
        </div>
        <div className="ml-2 overflow-hidden">
          <h3 className="font-medium truncate">{officeLabel}</h3>
          <p className="text-xs text-gray-400 truncate">{email}</p>
        </div>
        <button className="ml-auto text-gray-400 hover:text-white">
          <LogOut size={16} />
        </button>
      </div>
      
      <nav className="space-y-2">
        <Link 
          to="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/dashboard') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Home size={20} />
          <span>Início</span>
        </Link>
        
        <Link 
          to="/notifications"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/notifications') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Bell size={20} />
          <span>Notificações</span>
        </Link>
        
        <Link 
          to="/profile"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/profile') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
        
        <Link 
          to="/settings"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/settings') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings size={20} />
          <span>Configurações</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
