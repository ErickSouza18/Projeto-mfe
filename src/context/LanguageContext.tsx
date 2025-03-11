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
  },
  // Sidebar translations
  'sidebar.home': {
    'pt-BR': 'Início',
    'en-US': 'Home',
    'es': 'Inicio',
    'fr': 'Accueil'
  },
  'sidebar.notifications': {
    'pt-BR': 'Notificações',
    'en-US': 'Notifications',
    'es': 'Notificaciones',
    'fr': 'Notifications'
  },
  'sidebar.profile': {
    'pt-BR': 'Perfil',
    'en-US': 'Profile',
    'es': 'Perfil',
    'fr': 'Profil'
  },
  'sidebar.settings': {
    'pt-BR': 'Configurações',
    'en-US': 'Settings',
    'es': 'Configuraciones',
    'fr': 'Paramètres'
  },
  'sidebar.logout.success': {
    'pt-BR': 'Sessão encerrada com sucesso!',
    'en-US': 'Logged out successfully!',
    'es': '¡Sesión cerrada con éxito!',
    'fr': 'Déconnexion réussie !'
  },
  
  // Dashboard translations
  'dashboard.search': {
    'pt-BR': 'Pesquisar...',
    'en-US': 'Search...',
    'es': 'Buscar...',
    'fr': 'Rechercher...'
  },
  'dashboard.company.new': {
    'pt-BR': 'Nova Empresa',
    'en-US': 'New Company',
    'es': 'Nueva Empresa',
    'fr': 'Nouvelle Entreprise'
  },
  'dashboard.companies.title': {
    'pt-BR': 'Empresas e Clientes',
    'en-US': 'Companies and Clients',
    'es': 'Empresas y Clientes',
    'fr': 'Entreprises et Clients'
  },
  'dashboard.pagination.previous': {
    'pt-BR': 'Anterior',
    'en-US': 'Previous',
    'es': 'Anterior',
    'fr': 'Précédent'
  },
  'dashboard.pagination.next': {
    'pt-BR': 'Próximo',
    'en-US': 'Next',
    'es': 'Siguiente',
    'fr': 'Suivant'
  },
  'dashboard.files.recent': {
    'pt-BR': 'Arquivos Recentes',
    'en-US': 'Recent Files',
    'es': 'Archivos Recientes',
    'fr': 'Fichiers Récents'
  },
  'dashboard.files.search': {
    'pt-BR': 'Pesquisar arquivos...',
    'en-US': 'Search files...',
    'es': 'Buscar archivos...',
    'fr': 'Rechercher des fichiers...'
  },
  'dashboard.files.name': {
    'pt-BR': 'Nome',
    'en-US': 'Name',
    'es': 'Nombre',
    'fr': 'Nom'
  },
  'dashboard.files.recipient': {
    'pt-BR': 'Destinatário',
    'en-US': 'Recipient',
    'es': 'Destinatario',
    'fr': 'Destinataire'
  },
  'dashboard.files.size': {
    'pt-BR': 'Tamanho',
    'en-US': 'Size',
    'es': 'Tamaño',
    'fr': 'Taille'
  },
  'dashboard.files.date': {
    'pt-BR': 'Data',
    'en-US': 'Date',
    'es': 'Fecha',
    'fr': 'Date'
  },
  'dashboard.files.status': {
    'pt-BR': 'Status',
    'en-US': 'Status',
    'es': 'Estado',
    'fr': 'Statut'
  },
  'dashboard.files.empty': {
    'pt-BR': 'Nenhum arquivo recente encontrado',
    'en-US': 'No recent files found',
    'es': 'No se encontraron archivos recientes',
    'fr': 'Aucun fichier récent trouvé'
  },
  'dashboard.files.deleted': {
    'pt-BR': 'Excluído',
    'en-US': 'Deleted',
    'es': 'Eliminado',
    'fr': 'Supprimé'
  },
  'dashboard.files.active': {
    'pt-BR': 'Ativo',
    'en-US': 'Active',
    'es': 'Activo',
    'fr': 'Actif'
  },
  'dashboard.company.added': {
    'pt-BR': 'Empresa adicionada',
    'en-US': 'Company added',
    'es': 'Empresa añadida',
    'fr': 'Entreprise ajoutée'
  },
  'dashboard.file.deleted': {
    'pt-BR': 'Este arquivo foi excluído',
    'en-US': 'This file has been deleted',
    'es': 'Este archivo ha sido eliminado',
    'fr': 'Ce fichier a été supprimé'
  },
  'dashboard.file.viewing': {
    'pt-BR': 'Visualizando arquivo',
    'en-US': 'Viewing file',
    'es': 'Visualizando archivo',
    'fr': 'Visualisation du fichier'
  },
  
  // Company detail translations
  'company.label': {
    'pt-BR': 'Empresa',
    'en-US': 'Company',
    'es': 'Empresa',
    'fr': 'Entreprise'
  },
  'company.editDocuments': {
    'pt-BR': 'Editar Documentos',
    'en-US': 'Edit Documents',
    'es': 'Editar Documentos',
    'fr': 'Modifier Documents'
  },
  'company.saveChanges': {
    'pt-BR': 'Salvar Alterações',
    'en-US': 'Save Changes',
    'es': 'Guardar Cambios',
    'fr': 'Enregistrer les Modifications'
  },
  'company.editMode': {
    'pt-BR': 'Modo de edição ativado',
    'en-US': 'Edit mode activated',
    'es': 'Modo de edición activado',
    'fr': 'Mode édition activé'
  },
  'company.changesSaved': {
    'pt-BR': 'Alterações salvas com sucesso',
    'en-US': 'Changes saved successfully',
    'es': 'Cambios guardados con éxito',
    'fr': 'Modifications enregistrées avec succès'
  },
  'company.viewInfo': {
    'pt-BR': 'Ver Informações',
    'en-US': 'View Information',
    'es': 'Ver Información',
    'fr': 'Voir Informations'
  },
  'company.info.title': {
    'pt-BR': 'Informações da Empresa',
    'en-US': 'Company Information',
    'es': 'Información de la Empresa',
    'fr': 'Informations sur l\'Entreprise'
  },
  'company.edit.title': {
    'pt-BR': 'Editar Informações da Empresa',
    'en-US': 'Edit Company Information',
    'es': 'Editar Información de la Empresa',
    'fr': 'Modifier les Informations de l\'Entreprise'
  },
  'company.info.edit': {
    'pt-BR': 'Editar Informações',
    'en-US': 'Edit Information',
    'es': 'Editar Información',
    'fr': 'Modifier les Informations'
  },
  'company.info.basic': {
    'pt-BR': 'Informações Básicas',
    'en-US': 'Basic Information',
    'es': 'Información Básica',
    'fr': 'Informations de Base'
  },
  'company.info.name': {
    'pt-BR': 'Nome da Empresa',
    'en-US': 'Company Name',
    'es': 'Nombre de la Empresa',
    'fr': 'Nom de l\'Entreprise'
  },
  'company.info.location': {
    'pt-BR': 'Localização',
    'en-US': 'Location',
    'es': 'Ubicación',
    'fr': 'Emplacement'
  },
  'company.info.identifierType': {
    'pt-BR': 'Tipo de Identificação',
    'en-US': 'Identifier Type',
    'es': 'Tipo de Identificación',
    'fr': 'Type d\'Identification'
  },
  'company.info.owner': {
    'pt-BR': 'Informações do Proprietário',
    'en-US': 'Owner Information',
    'es': 'Información del Propietario',
    'fr': 'Informations du Propriétaire'
  },
  'company.info.ownerName': {
    'pt-BR': 'Nome do Proprietário',
    'en-US': 'Owner Name',
    'es': 'Nombre del Propietario',
    'fr': 'Nom du Propriétaire'
  },
  'company.info.ownerEmail': {
    'pt-BR': 'Email do Proprietário',
    'en-US': 'Owner Email',
    'es': 'Email del Propietario',
    'fr': 'Email du Propriétaire'
  },
  'company.info.ownerPhone': {
    'pt-BR': 'Telefone do Proprietário',
    'en-US': 'Owner Phone',
    'es': 'Teléfono del Propietario',
    'fr': 'Téléphone du Propriétaire'
  },
  
  // File translations
  'file.upload.title': {
    'pt-BR': 'Enviar Documentos',
    'en-US': 'Upload Documents',
    'es': 'Subir Documentos',
    'fr': 'Télécharger des Documents'
  },
  'file.new': {
    'pt-BR': 'Novo Arquivo',
    'en-US': 'New File',
    'es': 'Nuevo Archivo',
    'fr': 'Nouveau Fichier'
  },
  'file.upload.button': {
    'pt-BR': 'Enviar Arquivo',
    'en-US': 'Upload File',
    'es': 'Subir Archivo',
    'fr': 'Télécharger Fichier'
  },
  'file.upload.dragDrop': {
    'pt-BR': 'Ou arraste e solte arquivos aqui',
    'en-US': 'Or drag and drop files here',
    'es': 'O arrastra y suelta archivos aquí',
    'fr': 'Ou glisser-déposer des fichiers ici'
  },
  'file.uploaded': {
    'pt-BR': 'Documentos Enviados',
    'en-US': 'Uploaded Documents',
    'es': 'Documentos Subidos',
    'fr': 'Documents Téléchargés'
  },
  'file.table.name': {
    'pt-BR': 'Nome do Arquivo',
    'en-US': 'File Name',
    'es': 'Nombre del Archivo',
    'fr': 'Nom du Fichier'
  },
  'file.table.type': {
    'pt-BR': 'Tipo',
    'en-US': 'Type',
    'es': 'Tipo',
    'fr': 'Type'
  },
  'file.table.date': {
    'pt-BR': 'Data',
    'en-US': 'Date',
    'es': 'Fecha',
    'fr': 'Date'
  },
  'file.table.size': {
    'pt-BR': 'Tamanho',
    'en-US': 'Size',
    'es': 'Tamaño',
    'fr': 'Taille'
  },
  'file.table.actions': {
    'pt-BR': 'Ações',
    'en-US': 'Actions',
    'es': 'Acciones',
    'fr': 'Actions'
  },
  'file.table.empty': {
    'pt-BR': 'Nenhum documento enviado ainda',
    'en-US': 'No documents uploaded yet',
    'es': 'Aún no se han subido documentos',
    'fr': 'Aucun document téléchargé pour le moment'
  },
  'file.actions.view': {
    'pt-BR': 'Visualizar',
    'en-US': 'View',
    'es': 'Ver',
    'fr': 'Voir'
  },
  'file.actions.download': {
    'pt-BR': 'Baixar',
    'en-US': 'Download',
    'es': 'Descargar',
    'fr': 'Télécharger'
  },
  'file.actions.edit': {
    'pt-BR': 'Editar',
    'en-US': 'Edit',
    'es': 'Editar',
    'fr': 'Modifier'
  },
  'file.actions.delete': {
    'pt-BR': 'Excluir',
    'en-US': 'Delete',
    'es': 'Eliminar',
    'fr': 'Supprimer'
  },
  'file.modal.new': {
    'pt-BR': 'Criar Novo Arquivo',
    'en-US': 'Create New File',
    'es': 'Crear Nuevo Archivo',
    'fr': 'Créer un Nouveau Fichier'
  },
  'file.modal.name': {
    'pt-BR': 'Nome do Arquivo',
    'en-US': 'File Name',
    'es': 'Nombre del Archivo',
    'fr': 'Nom du Fichier'
  },
  'file.modal.namePlaceholder': {
    'pt-BR': 'ex: Contrato Social.pdf',
    'en-US': 'e.g. Business Contract.pdf',
    'es': 'ej: Contrato Social.pdf',
    'fr': 'ex: Contrat d\'Entreprise.pdf'
  },
  'file.modal.type': {
    'pt-BR': 'Tipo de Documento',
    'en-US': 'Document Type',
    'es': 'Tipo de Documento',
    'fr': 'Type de Document'
  },
  'file.modal.create': {
    'pt-BR': 'Criar Arquivo',
    'en-US': 'Create File',
    'es': 'Crear Archivo',
    'fr': 'Créer Fichier'
  },
  'file.modal.saveName': {
    'pt-BR': 'Salvar Nome',
    'en-US': 'Save Name',
    'es': 'Guardar Nombre',
    'fr': 'Enregistrer le Nom'
  },
  'file.preview.unavailable': {
    'pt-BR': 'Visualização não disponível',
    'en-US': 'Preview not available',
    'es': 'Vista previa no disponible',
    'fr': 'Aperçu non disponible'
  },
  'file.preview.type': {
    'pt-BR': 'Tipo de documento',
    'en-US': 'Document type',
    'es': 'Tipo de documento',
    'fr': 'Type de document'
  },
  'file.error.noName': {
    'pt-BR': 'Por favor, digite um nome para o arquivo',
    'en-US': 'Please enter a file name',
    'es': 'Por favor, ingrese un nombre para el archivo',
    'fr': 'Veuillez entrer un nom de fichier'
  },
  'file.added': {
    'pt-BR': 'Arquivo adicionado',
    'en-US': 'File added',
    'es': 'Archivo añadido',
    'fr': 'Fichier ajouté'
  },
  'file.deleted': {
    'pt-BR': 'Arquivo excluído',
    'en-US': 'File deleted',
    'es': 'Archivo eliminado',
    'fr': 'Fichier supprimé'
  },
  'file.downloaded': {
    'pt-BR': 'Arquivo baixado',
    'en-US': 'File downloaded',
    'es': 'Archivo descargado',
    'fr': 'Fichier téléchargé'
  },
  'file.nameUpdated': {
    'pt-BR': 'Nome do arquivo atualizado',
    'en-US': 'File name updated',
    'es': 'Nombre del archivo actualizado',
    'fr': 'Nom du fichier mis à jour'
  },
  
  // Modal translations
  'modal.cancel': {
    'pt-BR': 'Cancelar',
    'en-US': 'Cancel',
    'es': 'Cancelar',
    'fr': 'Annuler'
  },
  'modal.close': {
    'pt-BR': 'Fechar',
    'en-US': 'Close',
    'es': 'Cerrar',
    'fr': 'Fermer'
  },
  'modal.save': {
    'pt-BR': 'Salvar',
    'en-US': 'Save',
    'es': 'Guardar',
    'fr': 'Enregistrer'
  },
  'modal.delete.title': {
    'pt-BR': 'Confirmação de Exclusão',
    'en-US': 'Delete Confirmation',
    'es': 'Confirmación de Eliminación',
    'fr': 'Confirmation de Suppression'
  },
  'modal.delete.confirmation': {
    'pt-BR': 'Tem certeza que deseja excluir o arquivo',
    'en-US': 'Are you sure you want to delete the file',
    'es': '¿Está seguro de que desea eliminar el archivo',
    'fr': 'Êtes-vous sûr de vouloir supprimer le fichier'
  },
  'modal.delete.warning': {
    'pt-BR': 'Esta ação não pode ser desfeita.',
    'en-US': 'This action cannot be undone.',
    'es': 'Esta acción no se puede deshacer.',
    'fr': 'Cette action ne peut pas être annulée.'
  },
  'modal.delete.adminRequired': {
    'pt-BR': 'É necessária a senha de administrador para concluir esta ação.',
    'en-US': 'Administrator password is required to complete this action.',
    'es': 'Se requiere la contraseña del administrador para completar esta acción.',
    'fr': 'Le mot de passe administrateur est requis pour terminer cette action.'
  },
  'modal.delete.password': {
    'pt-BR': 'Senha de Administrador',
    'en-US': 'Administrator Password',
    'es': 'Contraseña de Administrador',
    'fr': 'Mot de passe Administrateur'
  },
  'modal.delete.confirm': {
    'pt-BR': 'Excluir',
    'en-US': 'Delete',
    'es': 'Eliminar',
    'fr': 'Supprimer'
  },
  'modal.delete.wrongPassword': {
    'pt-BR': 'Senha incorreta. Tente novamente.',
    'en-US': 'Incorrect password. Please try again.',
    'es': 'Contraseña incorrecta. Inténtelo de nuevo.',
    'fr': 'Mot de passe incorrect. Veuillez réessayer.'
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
