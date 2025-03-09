
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Globe, Shield, Users, Share2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { toast } from 'sonner';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    updates: false,
    marketing: false
  });
  
  const [appearance, setAppearance] = useState('light');
  const [language, setLanguage] = useState('pt-BR');
  
  const [privacy, setPrivacy] = useState({
    shareData: false,
    shareAnalytics: true
  });
  
  const [permissions, setPermissions] = useState({
    editDocuments: true,
    deleteDocuments: false,
    manageUsers: true
  });
  
  const handleToggle = (category: string, setting: string) => {
    switch(category) {
      case 'notifications':
        setNotifications(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
      case 'privacy':
        setPrivacy(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
      case 'permissions':
        setPermissions(prev => ({
          ...prev,
          [setting]: !prev[setting as keyof typeof prev]
        }));
        break;
    }
  };
  
  const handleAppearanceChange = (mode: string) => {
    setAppearance(mode);
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  
  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center">
          <SettingsIcon className="h-5 w-5 text-gray-700 mr-2" />
          <h1 className="text-xl font-semibold">Configurações</h1>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar de navegação de configurações */}
            <div className="md:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <nav className="space-y-1">
                <a href="#notifications" className="flex items-center py-2 px-3 rounded-md bg-blue-50 text-blue-600">
                  <Bell className="h-5 w-5 mr-2" />
                  <span>Notificações</span>
                </a>
                <a href="#appearance" className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50">
                  <Sun className="h-5 w-5 mr-2" />
                  <span>Aparência</span>
                </a>
                <a href="#language" className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Idioma</span>
                </a>
                <a href="#privacy" className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>Privacidade</span>
                </a>
                <a href="#permissions" className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Permissões</span>
                </a>
                <a href="#share" className="flex items-center py-2 px-3 rounded-md text-gray-700 hover:bg-gray-50">
                  <Share2 className="h-5 w-5 mr-2" />
                  <span>Compartilhamento</span>
                </a>
              </nav>
            </div>
            
            {/* Conteúdo das configurações */}
            <div className="md:col-span-3 space-y-6">
              {/* Notificações */}
              <div id="notifications" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-500" />
                  Notificações
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações por email</h3>
                      <p className="text-sm text-gray-500">Receba atualizações por email</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="email-notifications"
                        checked={notifications.email}
                        onChange={() => handleToggle('notifications', 'email')}
                      />
                      <label 
                        htmlFor="email-notifications"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.email ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.email ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notificações no aplicativo</h3>
                      <p className="text-sm text-gray-500">Receba atualizações dentro do sistema</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="app-notifications"
                        checked={notifications.app}
                        onChange={() => handleToggle('notifications', 'app')}
                      />
                      <label 
                        htmlFor="app-notifications"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.app ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.app ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Atualizações do sistema</h3>
                      <p className="text-sm text-gray-500">Receba notificações sobre atualizações do sistema</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="updates-notifications"
                        checked={notifications.updates}
                        onChange={() => handleToggle('notifications', 'updates')}
                      />
                      <label 
                        htmlFor="updates-notifications"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.updates ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.updates ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Comunicações de marketing</h3>
                      <p className="text-sm text-gray-500">Receba notificações sobre novas funcionalidades</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="marketing-notifications"
                        checked={notifications.marketing}
                        onChange={() => handleToggle('notifications', 'marketing')}
                      />
                      <label 
                        htmlFor="marketing-notifications"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.marketing ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.marketing ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Aparência */}
              <div id="appearance" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-blue-500" />
                  Aparência
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Tema</h3>
                    <div className="flex gap-4">
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'light' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleAppearanceChange('light')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-white border-2 flex items-center justify-center ${appearance === 'light' ? 'border-blue-500' : 'border-gray-200'}`}>
                          <Sun className="h-8 w-8" />
                        </div>
                        <span className="mt-2">Claro</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'dark' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleAppearanceChange('dark')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-gray-800 border-2 flex items-center justify-center ${appearance === 'dark' ? 'border-blue-500' : 'border-gray-200'}`}>
                          <Moon className="h-8 w-8 text-white" />
                        </div>
                        <span className="mt-2">Escuro</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'system' ? 'text-blue-500' : 'text-gray-500'}`}
                        onClick={() => handleAppearanceChange('system')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-white to-gray-800 border-2 flex items-center justify-center ${appearance === 'system' ? 'border-blue-500' : 'border-gray-200'}`}>
                          <Sun className="h-6 w-6 text-yellow-500 -translate-x-1" />
                          <Moon className="h-6 w-6 text-blue-300 translate-x-1" />
                        </div>
                        <span className="mt-2">Sistema</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Idioma */}
              <div id="language" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  Idioma
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Selecione o idioma</h3>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (United States)</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Privacidade */}
              <div id="privacy" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  Privacidade
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Compartilhar dados</h3>
                      <p className="text-sm text-gray-500">Compartilhar dados com parceiros</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="share-data"
                        checked={privacy.shareData}
                        onChange={() => handleToggle('privacy', 'shareData')}
                      />
                      <label 
                        htmlFor="share-data"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${privacy.shareData ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${privacy.shareData ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Compartilhar estatísticas</h3>
                      <p className="text-sm text-gray-500">Compartilhar estatísticas anônimas para melhorar o sistema</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="share-analytics"
                        checked={privacy.shareAnalytics}
                        onChange={() => handleToggle('privacy', 'shareAnalytics')}
                      />
                      <label 
                        htmlFor="share-analytics"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${privacy.shareAnalytics ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${privacy.shareAnalytics ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Permissões */}
              <div id="permissions" className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Permissões
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Editar documentos</h3>
                      <p className="text-sm text-gray-500">Permissão para editar documentos</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="edit-documents"
                        checked={permissions.editDocuments}
                        onChange={() => handleToggle('permissions', 'editDocuments')}
                      />
                      <label 
                        htmlFor="edit-documents"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.editDocuments ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${permissions.editDocuments ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Excluir documentos</h3>
                      <p className="text-sm text-gray-500">Permissão para excluir documentos</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="delete-documents"
                        checked={permissions.deleteDocuments}
                        onChange={() => handleToggle('permissions', 'deleteDocuments')}
                      />
                      <label 
                        htmlFor="delete-documents"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.deleteDocuments ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${permissions.deleteDocuments ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Gerenciar usuários</h3>
                      <p className="text-sm text-gray-500">Permissão para gerenciar usuários</p>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        id="manage-users"
                        checked={permissions.manageUsers}
                        onChange={() => handleToggle('permissions', 'manageUsers')}
                      />
                      <label 
                        htmlFor="manage-users"
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.manageUsers ? 'bg-blue-500' : 'bg-gray-200'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${permissions.manageUsers ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botão de salvar */}
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSaveSettings}
                >
                  Salvar Configurações
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
