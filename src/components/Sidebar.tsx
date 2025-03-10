
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bell, User, LogOut, Moon, Sun, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { toast } from 'sonner';

interface SidebarProps {
  email?: string;
  officeLabel?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  email = 'joao.silva@escritoriox.com',
  officeLabel = 'Escritório X'
}) => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState === 'true';
  });
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast.success(`Modo ${newMode ? 'escuro' : 'claro'} ativado`);
  };
  
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };
  
  // Apply saved dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    toast.success('Logout realizado com sucesso');
    // In a real app, would redirect to login page
  };

  return (
    <div className={`sidebar p-4 z-10 shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-80'}`}>
      {/* Toggle button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-12 bg-app-blue w-6 h-12 rounded-r-md flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
      
      <div className="mb-6 flex justify-center pt-2">
        {collapsed ? (
          <Logo size="sm" className="shrink-0" />
        ) : (
          <Logo size="sm" className="shrink-0" />
        )}
      </div>
      
      {!collapsed && (
        <div className="mb-8 flex items-center p-2 bg-gray-800/30 rounded-lg">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0">
            <span className="text-gray-800 font-bold text-xl">JS</span>
          </div>
          <div className="ml-2 overflow-hidden">
            <h3 className="font-medium truncate">{officeLabel}</h3>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>
          <button 
            className="ml-auto text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
      
      {collapsed && (
        <div className="mb-8 flex justify-center">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-800 font-bold text-xl">JS</span>
          </div>
        </div>
      )}
      
      <nav className="space-y-2 mb-8">
        <Link 
          to="/dashboard"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/dashboard') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Início"
        >
          <Home size={20} />
          {!collapsed && <span>Início</span>}
        </Link>
        
        <Link 
          to="/notifications"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/notifications') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Notificações"
        >
          <Bell size={20} />
          {!collapsed && <span>Notificações</span>}
        </Link>
        
        <Link 
          to="/profile"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/profile') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Perfil"
        >
          <User size={20} />
          {!collapsed && <span>Perfil</span>}
        </Link>
        
        <Link 
          to="/settings"
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive('/settings') 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/5 hover:text-white'
          } ${collapsed ? 'justify-center' : ''}`}
          title="Configurações"
        >
          <Settings size={20} />
          {!collapsed && <span>Configurações</span>}
        </Link>
      </nav>
      
      {/* Dark/Light Mode Toggle */}
      <div className={`fixed ${collapsed ? 'bottom-6 left-4 right-4' : 'bottom-6 left-4 right-4'}`}>
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-center gap-2'} p-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors`}
          title={darkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {darkMode ? (
            <>
              <Sun size={18} />
              {!collapsed && <span>Modo Claro</span>}
            </>
          ) : (
            <>
              <Moon size={18} />
              {!collapsed && <span>Modo Escuro</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
