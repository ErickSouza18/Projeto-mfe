import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, PlusCircle, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CompanyCard from '../components/CompanyCard';
import IconInput from '../components/IconInput';
import Button from '../components/Button';
import AddCompanyModal from '../components/AddCompanyModal';
import { toast } from 'sonner';

// Dados fictícios iniciais
const INITIAL_MOCK_DATA = {
  companies: [
    { id: 1, name: 'Empresa 1', employeeCount: 83, lastUpdate: '13/09/2024', type: 'company' },
    { id: 2, name: 'Cliente 1', employeeCount: 3, lastUpdate: '13/09/2024', type: 'client' },
    { id: 3, name: 'Empresa 2', employeeCount: 32, lastUpdate: '13/09/2024', type: 'company' },
    { id: 4, name: 'Cliente 2', employeeCount: 83, lastUpdate: '13/09/2024', type: 'client' },
    { id: 5, name: 'Empresa 3', employeeCount: 83, lastUpdate: '13/09/2024', type: 'company' },
    { id: 6, name: 'Cliente 3', employeeCount: 0, lastUpdate: '13/09/2024', type: 'client' },
  ],
  recentFiles: [
    { id: 1, name: 'Relatório Mensal.pdf', recipient: 'Empresa 1', size: '1.2 MB', date: '13/09/2024' },
    { id: 2, name: 'Contratos 2024.docx', recipient: 'Cliente 2', size: '0.8 MB', date: '12/09/2024' },
    { id: 3, name: 'Análise Financeira.xlsx', recipient: 'Empresa 3', size: '2.5 MB', date: '10/09/2024' },
    { id: 4, name: 'Proposta Comercial.pdf', recipient: 'Cliente 1', size: '3.1 MB', date: '08/09/2024' },
  ]
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [mockData, setMockData] = useState(INITIAL_MOCK_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const handleCompanyClick = (id: number) => {
    navigate(`/company/${id}`);
  };

  const filteredCompanies = mockData.companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const currentCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredFiles = mockData.recentFiles.filter(file => 
    file.name.toLowerCase().includes(fileSearchQuery.toLowerCase()) ||
    file.recipient.toLowerCase().includes(fileSearchQuery.toLowerCase())
  );

  const handleAddFile = () => {
    const newFile = {
      id: mockData.recentFiles.length > 0 ? Math.max(...mockData.recentFiles.map(f => f.id)) + 1 : 1,
      name: `Novo Documento ${new Date().toLocaleTimeString()}.pdf`,
      recipient: 'Cliente ' + Math.floor(Math.random() * 3 + 1),
      size: (Math.random() * 4).toFixed(1) + ' MB',
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    setMockData(prev => ({
      ...prev,
      recentFiles: [newFile, ...prev.recentFiles]
    }));
    
    toast.success(`Arquivo "${newFile.name}" adicionado com sucesso!`);
  };

  const handleFileClick = (fileId: number) => {
    const file = mockData.recentFiles.find(f => f.id === fileId);
    if (file) {
      toast.info(`Visualizando arquivo: ${file.name}`);
    }
  };

  const handleAddCompany = (newCompany: {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    responsibleName: string;
  }) => {
    const newId = mockData.companies.length > 0 
      ? Math.max(...mockData.companies.map(c => c.id)) + 1 
      : 1;
    
    const companyToAdd = {
      id: newId,
      name: newCompany.name,
      employeeCount: 0,
      lastUpdate: new Date().toLocaleDateString('pt-BR'),
      type: 'company' as 'company' | 'client'
    };
    
    setMockData(prev => ({
      ...prev,
      companies: [...prev.companies, companyToAdd]
    }));
    
    setShowAddModal(false);
    toast.success(`Empresa "${newCompany.name}" adicionada com sucesso!`);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <div className="w-full max-w-md">
            <IconInput 
              icon="search"
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button 
              className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              onClick={handleNotificationClick}
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
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
        
        <main className="py-6 px-6 dark:text-gray-100">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Clientes e Empresas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCompanies.map((company) => (
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
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Anterior
                </Button>
                
                <div className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <span className="font-medium">{currentPage}</span>
                  <span className="mx-1 text-gray-500 dark:text-gray-400">/</span>
                  <span>{totalPages}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center"
                >
                  Próxima
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            )}
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recentes</h2>
              <div className="flex gap-2">
                <IconInput 
                  icon="search"
                  type="text"
                  placeholder="Pesquisar arquivos"
                  value={fileSearchQuery}
                  onChange={(e) => setFileSearchQuery(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700 w-52"
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Nome do Arquivo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Destinatário</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Tamanho</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                        Nenhum arquivo recente encontrado
                      </td>
                    </tr>
                  ) : (
                    filteredFiles.map((file) => (
                      <tr 
                        key={file.id} 
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                        onClick={() => handleFileClick(file.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-500" />
                            {file.name}
                          </div>
                        </td>
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
        <AddCompanyModal 
          onClose={() => setShowAddModal(false)} 
          onAddCompany={handleAddCompany}
        />
      )}
    </div>
  );
};

export default Dashboard;
