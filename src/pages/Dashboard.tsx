
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, PlusCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CompanyCard from '../components/CompanyCard';
import IconInput from '../components/IconInput';
import Button from '../components/Button';
import AddCompanyModal from '../components/AddCompanyModal';

// Dados fictícios
const MOCK_DATA = {
  companies: [
    { id: 1, name: 'Empresa 1', employeeCount: 83, lastUpdate: '13/09/2024', type: 'company' },
    { id: 2, name: 'Cliente 1', employeeCount: 3, lastUpdate: '13/09/2024', type: 'client' },
    { id: 3, name: 'Empresa 2', employeeCount: 32, lastUpdate: '13/09/2024', type: 'company' },
    { id: 4, name: 'Cliente 2', employeeCount: 83, lastUpdate: '13/09/2024', type: 'client' },
    { id: 5, name: 'Empresa 3', employeeCount: 83, lastUpdate: '13/09/2024', type: 'company' },
    { id: 6, name: 'Cliente 3', employeeCount: 0, lastUpdate: '13/09/2024', type: 'client' },
  ],
  recentFiles: []
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const handleCompanyClick = (id: number) => {
    navigate(`/company/${id}`);
  };

  const filteredCompanies = MOCK_DATA.companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="w-full max-w-md">
            <IconInput 
              icon="search"
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative text-gray-600 hover:text-gray-900">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
            
            <button className="text-gray-600 hover:text-gray-900">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
                <path d="M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z" fill="currentColor"/>
                <path d="M4 15C5.10457 15 6 14.1046 6 13C6 11.8954 5.10457 11 4 11C2.89543 11 2 11.8954 2 13C2 14.1046 2.89543 15 4 15Z" fill="currentColor"/>
              </svg>
            </button>
            
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowAddModal(true)}
            >
              <PlusCircle size={16} />
              Nova Empresa
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Clientes e Empresas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  name={company.name}
                  employeeCount={company.employeeCount}
                  lastUpdate={company.lastUpdate}
                  type={company.type as 'company' | 'client'}
                  onClick={() => handleCompanyClick(company.id)}
                />
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recentes</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nome do Arquivo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Destinatário</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tamanho</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DATA.recentFiles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                        Nenhum arquivo recente encontrado
                      </td>
                    </tr>
                  ) : (
                    MOCK_DATA.recentFiles.map((file, index) => (
                      <tr key={index} className="border-b border-gray-200 last:border-0">
                        <td className="py-3 px-4">{file.name}</td>
                        <td className="py-3 px-4">{file.recipient}</td>
                        <td className="py-3 px-4">{file.size}</td>
                        <td className="py-3 px-4">{file.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
      
      {showAddModal && (
        <AddCompanyModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
