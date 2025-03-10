
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Sun, Globe, Shield, Users, Share2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    updates: false,
    marketing: false
  });
  
  const [appearance, setAppearance] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? 'dark' : 'light';
  });
  
  const [privacy, setPrivacy] = useState({
    shareData: false,
    shareAnalytics: true
  });
  
  const [permissions, setPermissions] = useState({
    editDocuments: true,
    deleteDocuments: false,
    manageUsers: true
  });
  
  // Apply dark mode on component mount and when appearance changes
  useEffect(() => {
    if (appearance === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else if (appearance === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [appearance]);
  
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
    const themeText = mode === 'dark' 
      ? t('toast.theme.dark') 
      : mode === 'light' 
        ? t('toast.theme.light') 
        : t('toast.theme.system');
    toast.success(`${t('toast.theme.changed')}${themeText}`);
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'pt-BR' | 'en-US' | 'es' | 'fr');
  };
  
  const handleSaveSettings = () => {
    toast.success(t('toast.settings.saved'));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center">
          <SettingsIcon className="h-5 w-5 text-gray-700 dark:text-gray-300 mr-2" />
          <h1 className="text-xl font-semibold dark:text-white">{t('settings.title')}</h1>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar de navegação de configurações */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <nav className="space-y-1">
                <a href="#notifications" className="flex items-center py-2 px-3 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Bell className="h-5 w-5 mr-2" />
                  <span>{t('settings.notifications')}</span>
                </a>
                <a href="#appearance" className="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Sun className="h-5 w-5 mr-2" />
                  <span>{t('settings.appearance')}</span>
                </a>
                <a href="#language" className="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>{t('settings.language')}</span>
                </a>
                <a href="#privacy" className="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>{t('settings.privacy')}</span>
                </a>
                <a href="#permissions" className="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{t('settings.permissions')}</span>
                </a>
                <a href="#share" className="flex items-center py-2 px-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Share2 className="h-5 w-5 mr-2" />
                  <span>{t('settings.sharing')}</span>
                </a>
              </nav>
            </div>
            
            {/* Conteúdo das configurações */}
            <div className="md:col-span-3 space-y-6">
              {/* Notificações */}
              <div id="notifications" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center dark:text-white">
                  <Bell className="h-5 w-5 mr-2 text-blue-500" />
                  {t('settings.notifications')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.email.notifications')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.email.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.email ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.email ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.app.notifications')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.app.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.app ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.app ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.updates')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.updates.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.updates ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${notifications.updates ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.marketing')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.marketing.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${notifications.marketing ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
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
              <div id="appearance" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center dark:text-white">
                  <Sun className="h-5 w-5 mr-2 text-blue-500" />
                  {t('settings.appearance')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3 dark:text-white">{t('settings.theme')}</h3>
                    <div className="flex gap-4">
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'light' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => handleAppearanceChange('light')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-white border-2 flex items-center justify-center ${appearance === 'light' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'}`}>
                          <Sun className="h-8 w-8" />
                        </div>
                        <span className="mt-2">{t('settings.theme.light')}</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'dark' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => handleAppearanceChange('dark')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-gray-800 border-2 flex items-center justify-center ${appearance === 'dark' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'}`}>
                          <Moon className="h-8 w-8 text-white" />
                        </div>
                        <span className="mt-2">{t('settings.theme.dark')}</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center cursor-pointer ${appearance === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => handleAppearanceChange('system')}
                      >
                        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-white to-gray-800 border-2 flex items-center justify-center ${appearance === 'system' ? 'border-blue-500' : 'border-gray-200 dark:border-gray-600'}`}>
                          <Sun className="h-6 w-6 text-yellow-500 -translate-x-1" />
                          <Moon className="h-6 w-6 text-blue-300 translate-x-1" />
                        </div>
                        <span className="mt-2">{t('settings.theme.system')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Idioma */}
              <div id="language" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center dark:text-white">
                  <Globe className="h-5 w-5 mr-2 text-blue-500" />
                  {t('settings.language')}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 dark:text-white">{t('settings.select.language')}</h3>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="pt-BR">{t('language.pt-BR')}</option>
                      <option value="en-US">{t('language.en-US')}</option>
                      <option value="es">{t('language.es')}</option>
                      <option value="fr">{t('language.fr')}</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Privacidade */}
              <div id="privacy" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center dark:text-white">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  {t('settings.privacy')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.share.data')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.share.data.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${privacy.shareData ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${privacy.shareData ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.share.analytics')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.share.analytics.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${privacy.shareAnalytics ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
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
              <div id="permissions" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center dark:text-white">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  {t('settings.permissions')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.edit.documents')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.edit.documents.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.editDocuments ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${permissions.editDocuments ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.delete.documents')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.delete.documents.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.deleteDocuments ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
                      >
                        <span 
                          className={`block w-5 h-5 mt-0.5 ml-0.5 rounded-full transition-transform duration-200 ease-in-out bg-white shadow-sm ${permissions.deleteDocuments ? 'transform translate-x-6' : ''}`} 
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{t('settings.manage.users')}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.manage.users.desc')}</p>
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
                        className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${permissions.manageUsers ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'}`}
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
                  {t('settings.save')}
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
