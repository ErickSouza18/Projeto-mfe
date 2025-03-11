
import React, { useState } from 'react';
import { Building, MapPin, Calculator, User, Mail, Phone, X, Save, Edit, FileText } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

interface CompanyInfo {
  name: string;
  location: string;
  identifier: string; // CNPJ or MEI
  identifierType: 'CNPJ' | 'MEI';
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
}

interface CompanyInfoModalProps {
  companyId: string;
  onClose: () => void;
}

const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({
  companyId,
  onClose
}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  
  // Load company info from localStorage or use defaults
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const savedInfo = localStorage.getItem(`company_${companyId}_info`);
    return savedInfo ? JSON.parse(savedInfo) : {
      name: `Empresa ${companyId}`,
      location: 'São Paulo, SP',
      identifier: '12.345.678/0001-90',
      identifierType: 'CNPJ',
      ownerName: 'João Silva',
      ownerEmail: 'joao.silva@empresa.com',
      ownerPhone: '(11) 98765-4321'
    };
  });
  
  // Create a copy for editing
  const [editInfo, setEditInfo] = useState<CompanyInfo>({...companyInfo});
  
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(`company_${companyId}_info`, JSON.stringify(editInfo));
    setCompanyInfo(editInfo);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditInfo({...companyInfo});
    setIsEditing(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInfo({
      ...editInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleIdentifierTypeChange = (type: 'CNPJ' | 'MEI') => {
    setEditInfo({
      ...editInfo,
      identifierType: type
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-scale-in">
        <button 
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Building className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium dark:text-white">
            {isEditing ? t('company.edit.title') : t('company.info.title')}
          </h3>
          
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto flex items-center gap-1"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={16} />
              {t('company.info.edit')}
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Company Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase">
              {t('company.info.basic')}
            </h4>
            
            <div className="space-y-4">
              {/* Company Name */}
              <div className="flex items-start">
                <Building className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('company.info.name')}
                  </h5>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editInfo.name}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.name}</p>
                  )}
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('company.info.location')}
                  </h5>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={editInfo.location}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.location}</p>
                  )}
                </div>
              </div>
              
              {/* Identifier (CNPJ or MEI) */}
              <div className="flex items-start">
                <Calculator className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {isEditing ? t('company.info.identifierType') : companyInfo.identifierType}
                  </h5>
                  
                  {isEditing ? (
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={editInfo.identifierType === 'CNPJ'}
                            onChange={() => handleIdentifierTypeChange('CNPJ')}
                            className="mr-2"
                          />
                          CNPJ
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={editInfo.identifierType === 'MEI'}
                            onChange={() => handleIdentifierTypeChange('MEI')}
                            className="mr-2"
                          />
                          MEI
                        </label>
                      </div>
                      <input
                        type="text"
                        name="identifier"
                        value={editInfo.identifier}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.identifier}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Owner Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase">
              {t('company.info.owner')}
            </h4>
            
            <div className="space-y-4">
              {/* Owner Name */}
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('company.info.ownerName')}
                  </h5>
                  {isEditing ? (
                    <input
                      type="text"
                      name="ownerName"
                      value={editInfo.ownerName}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.ownerName}</p>
                  )}
                </div>
              </div>
              
              {/* Owner Email */}
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('company.info.ownerEmail')}
                  </h5>
                  {isEditing ? (
                    <input
                      type="email"
                      name="ownerEmail"
                      value={editInfo.ownerEmail}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.ownerEmail}</p>
                  )}
                </div>
              </div>
              
              {/* Owner Phone */}
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {t('company.info.ownerPhone')}
                  </h5>
                  {isEditing ? (
                    <input
                      type="text"
                      name="ownerPhone"
                      value={editInfo.ownerPhone}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200">{companyInfo.ownerPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={handleCancel}
            >
              {t('modal.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              <Save size={16} className="mr-1" />
              {t('modal.save')}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end mt-6">
            <Button
              variant="primary"
              onClick={onClose}
            >
              {t('modal.close')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfoModal;
