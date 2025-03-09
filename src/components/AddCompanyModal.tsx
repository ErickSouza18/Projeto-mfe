
import React, { useState } from 'react';
import IconInput from './IconInput';
import Button from './Button';

interface AddCompanyModalProps {
  onClose: () => void;
  onAddCompany: (newCompany: {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    responsibleName: string;
  }) => void;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ onClose, onAddCompany }) => {
  const [activeTab, setActiveTab] = useState<'cadastrar' | 'autenticar'>('cadastrar');
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    responsibleName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    onAddCompany(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-auto animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Novo Cliente/Empresa</h2>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                activeTab === 'cadastrar' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('cadastrar')}
            >
              Cadastrar
            </button>
            <button
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                activeTab === 'autenticar' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('autenticar')}
            >
              Autenticar
            </button>
          </div>
          
          {activeTab === 'cadastrar' && (
            <>
              <h3 className="text-xl font-semibold mb-1">Cadastrar Empresa</h3>
              <p className="text-gray-500 text-sm mb-6">Cadastro para a empresa ou cliente.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 2H5C3.346 2 2 3.346 2 5V7.831C2 8.884 2.382 9.841 3 10.577V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H12H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V10.577C21.618 9.841 22 8.884 22 7.831V5C22 3.346 20.654 2 19 2ZM20 5V7.831C20 8.971 19.151 9.943 18 9.996V4H19C19.552 4 20 4.449 20 5ZM9 4H15V10.243C15 11.312 14.126 12 13.243 12H10.757C9.874 12 9 11.312 9 10.243V4ZM4 5C4 4.449 4.448 4 5 4H6V9.996C4.849 9.943 4 8.971 4 7.831V5ZM10 19V17C10 16.448 10.448 16 11 16H13C13.552 16 14 16.448 14 17V19H10ZM19 19H16V17C16 15.346 14.654 14 13 14H11C9.346 14 8 15.346 8 17V19H5V11.722C5.405 11.902 5.865 12 6.361 12H8.069C8.439 12.755 9.195 13.348 10.125 13.707C9.123 14.382 8.528 15.493 8.184 16.651C8.046 17.098 8.252 17.569 8.699 17.707C9.146 17.845 9.617 17.639 9.755 17.192C10.063 16.152 10.698 15 12 15C13.302 15 13.937 16.152 14.245 17.192C14.361 17.569 14.719 17.792 15.097 17.792C15.173 17.792 15.249 17.783 15.326 17.764C15.773 17.627 15.979 17.155 15.842 16.708C15.473 15.414 14.795 14.301 13.89 13.659C14.805 13.294 15.547 12.71 15.917 11.975L15.931 12H17.639C18.102 12 18.551 11.901 18.939 11.734L19 11.707V19Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <IconInput
                    icon="company"
                    type="text"
                    name="name"
                    placeholder="Nome da empresa"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    containerClassName="flex-grow"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 11H10V13H14V11Z" fill="currentColor"/>
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                      <path d="M14 7H10V9H14V7Z" fill="currentColor"/>
                      <path d="M14 15H10V17H14V15Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <IconInput
                    icon="cpf"
                    type="text"
                    name="cnpj"
                    placeholder="CNPJ"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                    containerClassName="flex-grow"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <IconInput
                    icon="email"
                    type="email"
                    name="email"
                    placeholder="E-mail de contato"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    containerClassName="flex-grow"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <IconInput
                    icon="phone"
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    containerClassName="flex-grow"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 mt-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <IconInput
                    icon="user"
                    type="text"
                    name="responsibleName"
                    placeholder="Nome do responsável"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    required
                    containerClassName="flex-grow"
                  />
                </div>
                
                <div className="pt-4 flex justify-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full max-w-xs"
                  >
                    Cadastrar
                  </Button>
                </div>
              </form>
            </>
          )}
          
          {activeTab === 'autenticar' && (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-600 mb-6 text-center">
                Esta funcionalidade permite autenticar uma empresa ou cliente já existente.
              </p>
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;
