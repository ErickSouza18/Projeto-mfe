
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'pt-BR' | 'en-US' | 'es' | 'fr';

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create translations
const translations: Translations = {
  'settings.title': {
    'pt-BR': 'Configurações',
    'en-US': 'Settings',
    'es': 'Configuraciones',
    'fr': 'Paramètres'
  },
  'settings.notifications': {
    'pt-BR': 'Notificações',
    'en-US': 'Notifications',
    'es': 'Notificaciones',
    'fr': 'Notifications'
  },
  'settings.appearance': {
    'pt-BR': 'Aparência',
    'en-US': 'Appearance',
    'es': 'Apariencia',
    'fr': 'Apparence'
  },
  'settings.language': {
    'pt-BR': 'Idioma',
    'en-US': 'Language',
    'es': 'Idioma',
    'fr': 'Langue'
  },
  'settings.privacy': {
    'pt-BR': 'Privacidade',
    'en-US': 'Privacy',
    'es': 'Privacidad',
    'fr': 'Confidentialité'
  },
  'settings.permissions': {
    'pt-BR': 'Permissões',
    'en-US': 'Permissions',
    'es': 'Permisos',
    'fr': 'Autorisations'
  },
  'settings.sharing': {
    'pt-BR': 'Compartilhamento',
    'en-US': 'Sharing',
    'es': 'Compartir',
    'fr': 'Partage'
  },
  'settings.save': {
    'pt-BR': 'Salvar Configurações',
    'en-US': 'Save Settings',
    'es': 'Guardar Configuraciones',
    'fr': 'Enregistrer les paramètres'
  },
  'settings.theme.light': {
    'pt-BR': 'Claro',
    'en-US': 'Light',
    'es': 'Claro',
    'fr': 'Clair'
  },
  'settings.theme.dark': {
    'pt-BR': 'Escuro',
    'en-US': 'Dark',
    'es': 'Oscuro',
    'fr': 'Sombre'
  },
  'settings.theme.system': {
    'pt-BR': 'Sistema',
    'en-US': 'System',
    'es': 'Sistema',
    'fr': 'Système'
  },
  'settings.email.notifications': {
    'pt-BR': 'Notificações por email',
    'en-US': 'Email notifications',
    'es': 'Notificaciones por correo electrónico',
    'fr': 'Notifications par e-mail'
  },
  'settings.email.desc': {
    'pt-BR': 'Receba atualizações por email',
    'en-US': 'Receive updates via email',
    'es': 'Recibir actualizaciones por correo electrónico',
    'fr': 'Recevoir des mises à jour par e-mail'
  },
  'settings.app.notifications': {
    'pt-BR': 'Notificações no aplicativo',
    'en-US': 'In-app notifications',
    'es': 'Notificaciones en la aplicación',
    'fr': 'Notifications dans l\'application'
  },
  'settings.app.desc': {
    'pt-BR': 'Receba atualizações dentro do sistema',
    'en-US': 'Receive updates within the system',
    'es': 'Recibir actualizaciones dentro del sistema',
    'fr': 'Recevoir des mises à jour dans le système'
  },
  'settings.updates': {
    'pt-BR': 'Atualizações do sistema',
    'en-US': 'System updates',
    'es': 'Actualizaciones del sistema',
    'fr': 'Mises à jour du système'
  },
  'settings.updates.desc': {
    'pt-BR': 'Receba notificações sobre atualizações do sistema',
    'en-US': 'Receive notifications about system updates',
    'es': 'Recibir notificaciones sobre actualizaciones del sistema',
    'fr': 'Recevoir des notifications sur les mises à jour du système'
  },
  'settings.marketing': {
    'pt-BR': 'Comunicações de marketing',
    'en-US': 'Marketing communications',
    'es': 'Comunicaciones de marketing',
    'fr': 'Communications marketing'
  },
  'settings.marketing.desc': {
    'pt-BR': 'Receba notificações sobre novas funcionalidades',
    'en-US': 'Receive notifications about new features',
    'es': 'Recibir notificaciones sobre nuevas funcionalidades',
    'fr': 'Recevoir des notifications sur les nouvelles fonctionnalités'
  },
  'settings.theme': {
    'pt-BR': 'Tema',
    'en-US': 'Theme',
    'es': 'Tema',
    'fr': 'Thème'
  },
  'settings.select.language': {
    'pt-BR': 'Selecione o idioma',
    'en-US': 'Select language',
    'es': 'Seleccionar idioma',
    'fr': 'Sélectionner la langue'
  },
  'settings.share.data': {
    'pt-BR': 'Compartilhar dados',
    'en-US': 'Share data',
    'es': 'Compartir datos',
    'fr': 'Partager des données'
  },
  'settings.share.data.desc': {
    'pt-BR': 'Compartilhar dados com parceiros',
    'en-US': 'Share data with partners',
    'es': 'Compartir datos con socios',
    'fr': 'Partager des données avec des partenaires'
  },
  'settings.share.analytics': {
    'pt-BR': 'Compartilhar estatísticas',
    'en-US': 'Share analytics',
    'es': 'Compartir estadísticas',
    'fr': 'Partager des analyses'
  },
  'settings.share.analytics.desc': {
    'pt-BR': 'Compartilhar estatísticas anônimas para melhorar o sistema',
    'en-US': 'Share anonymous statistics to improve the system',
    'es': 'Compartir estadísticas anónimas para mejorar el sistema',
    'fr': 'Partager des statistiques anonymes pour améliorer le système'
  },
  'settings.edit.documents': {
    'pt-BR': 'Editar documentos',
    'en-US': 'Edit documents',
    'es': 'Editar documentos',
    'fr': 'Modifier les documents'
  },
  'settings.edit.documents.desc': {
    'pt-BR': 'Permissão para editar documentos',
    'en-US': 'Permission to edit documents',
    'es': 'Permiso para editar documentos',
    'fr': 'Autorisation de modifier les documents'
  },
  'settings.delete.documents': {
    'pt-BR': 'Excluir documentos',
    'en-US': 'Delete documents',
    'es': 'Eliminar documentos',
    'fr': 'Supprimer des documents'
  },
  'settings.delete.documents.desc': {
    'pt-BR': 'Permissão para excluir documentos',
    'en-US': 'Permission to delete documents',
    'es': 'Permiso para eliminar documentos',
    'fr': 'Autorisation de supprimer des documents'
  },
  'settings.manage.users': {
    'pt-BR': 'Gerenciar usuários',
    'en-US': 'Manage users',
    'es': 'Gestionar usuarios',
    'fr': 'Gérer les utilisateurs'
  },
  'settings.manage.users.desc': {
    'pt-BR': 'Permissão para gerenciar usuários',
    'en-US': 'Permission to manage users',
    'es': 'Permiso para gestionar usuarios',
    'fr': 'Autorisation de gérer les utilisateurs'
  },
  'language.pt-BR': {
    'pt-BR': 'Português (Brasil)',
    'en-US': 'Portuguese (Brazil)',
    'es': 'Portugués (Brasil)',
    'fr': 'Portugais (Brésil)'
  },
  'language.en-US': {
    'pt-BR': 'Inglês (Estados Unidos)',
    'en-US': 'English (United States)',
    'es': 'Inglés (Estados Unidos)',
    'fr': 'Anglais (États-Unis)'
  },
  'language.es': {
    'pt-BR': 'Espanhol',
    'en-US': 'Spanish',
    'es': 'Español',
    'fr': 'Espagnol'
  },
  'language.fr': {
    'pt-BR': 'Francês',
    'en-US': 'French',
    'es': 'Francés',
    'fr': 'Français'
  },
  'toast.settings.saved': {
    'pt-BR': 'Configurações salvas com sucesso!',
    'en-US': 'Settings saved successfully!',
    'es': '¡Configuraciones guardadas con éxito!',
    'fr': 'Paramètres enregistrés avec succès!'
  },
  'toast.theme.changed': {
    'pt-BR': 'Tema alterado para ',
    'en-US': 'Theme changed to ',
    'es': 'Tema cambiado a ',
    'fr': 'Thème changé à '
  },
  'toast.theme.light': {
    'pt-BR': 'claro',
    'en-US': 'light',
    'es': 'claro',
    'fr': 'clair'
  },
  'toast.theme.dark': {
    'pt-BR': 'escuro',
    'en-US': 'dark',
    'es': 'oscuro',
    'fr': 'sombre'
  },
  'toast.theme.system': {
    'pt-BR': 'sistema',
    'en-US': 'system',
    'es': 'sistema',
    'fr': 'système'
  }
};

// Language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to pt-BR
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'pt-BR';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    if (!translations[key][language]) {
      console.warn(`Translation not found for key ${key} in language ${language}`);
      return translations[key]['en-US'] || key;
    }
    
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
