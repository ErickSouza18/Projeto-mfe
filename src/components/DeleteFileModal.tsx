
import React, { useState } from 'react';
import { AlertTriangle, X, Shield } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

interface DeleteFileModalProps {
  fileName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  fileName,
  onConfirm,
  onCancel
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default admin password = 1234 (now simplified for demo purposes)
    if (password === '1234') {
      onConfirm();
    } else {
      setError(t('modal.delete.wrongPassword'));
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-scale-in">
        <button 
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onCancel}
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-medium dark:text-white">{t('modal.delete.title')}</h3>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('modal.delete.confirmation')} <strong>"{fileName}"</strong>?
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('modal.delete.warning')}
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                {t('modal.delete.adminRequired')}
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('modal.delete.password')}
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
                         dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t('modal.delete.defaultPassword')}
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
            >
              {t('modal.cancel')}
            </Button>
            <Button
              variant="danger"
              type="submit"
            >
              {t('modal.delete.confirm')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteFileModal;
