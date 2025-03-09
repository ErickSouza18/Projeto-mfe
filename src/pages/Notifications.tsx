
import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, MessageCircle, Calendar, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

// Dados fictícios de notificações
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'info',
    title: 'Atualização do sistema',
    message: 'Uma nova atualização está disponível para o sistema',
    date: '15/09/2024',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Envio bem-sucedido',
    message: 'Os documentos foram enviados com sucesso para a Empresa 1',
    date: '14/09/2024',
    read: true
  },
  {
    id: 3,
    type: 'warning',
    title: 'Documentos pendentes',
    message: 'Existem documentos pendentes para a Empresa 2',
    date: '13/09/2024',
    read: false
  },
  {
    id: 4,
    type: 'error',
    title: 'Erro no envio',
    message: 'Ocorreu um erro ao enviar os documentos para o Cliente 3',
    date: '12/09/2024',
    read: false
  },
  {
    id: 5,
    type: 'message',
    title: 'Nova mensagem',
    message: 'Você recebeu uma nova mensagem do Cliente 1',
    date: '11/09/2024',
    read: true
  },
  {
    id: 6,
    type: 'event',
    title: 'Reunião agendada',
    message: 'Reunião com Empresa 3 agendada para amanhã às 14h',
    date: '10/09/2024',
    read: false
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const getIconByType = (type: string) => {
    switch(type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'message': return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case 'event': return <Calendar className="h-5 w-5 text-cyan-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-gray-700 mr-2" />
            <h1 className="text-xl font-semibold">Notificações</h1>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <Button 
            variant="secondary" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Marcar todas como lidas
          </Button>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button 
              variant={filter === 'unread' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Não lidas
            </Button>
            <Button 
              variant={filter === 'info' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('info')}
            >
              Informações
            </Button>
            <Button 
              variant={filter === 'success' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('success')}
            >
              Sucesso
            </Button>
            <Button 
              variant={filter === 'warning' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('warning')}
            >
              Avisos
            </Button>
            <Button 
              variant={filter === 'error' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('error')}
            >
              Erros
            </Button>
            <Button 
              variant={filter === 'message' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('message')}
            >
              Mensagens
            </Button>
            <Button 
              variant={filter === 'event' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('event')}
            >
              Eventos
            </Button>
          </div>
          
          {/* Notifications list */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">Nenhuma notificação encontrada</h3>
                <p className="text-gray-500 mt-1">
                  {filter !== 'all' 
                    ? 'Tente mudar os filtros ou verificar mais tarde' 
                    : 'Você não possui notificações no momento'}
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`bg-white rounded-lg shadow-sm border ${notification.read ? 'border-gray-100' : 'border-blue-300'} p-4 flex items-start transition-all hover:shadow-md`}
                >
                  <div className="p-2 rounded-full bg-gray-50 mr-4">
                    {getIconByType(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          Marcar como lida
                        </Button>
                      </div>
                    )}
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600 p-1"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
