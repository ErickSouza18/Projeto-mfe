
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, PlusCircle, ChevronLeft, ChevronRight, FileText, Trash2, Ban } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CompanyCard from '../components/CompanyCard';
import IconInput from '../components/IconInput';
import Button from '../components/Button';
import AddCompanyModal from '../components/AddCompanyModal';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

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
    { id: 1, name: 'Relatório Mensal.pdf', recipient: 'Empresa 1', size: '1.2 MB', date: '13/09/2024', companyId: 1, deleted: false },
    { id: 2, name: 'Contratos 2024.docx', recipient: 'Cliente 2', size: '0.8 MB', date: '12/09/2024', companyId: 4, deleted: false },
    { id: 3, name: 'Análise Financeira.xlsx', recipient: 'Empresa 3', size: '2.5 MB', date: '10/09/2024', companyId: 5, deleted: false },
    { id: 4, name: 'Proposta Comercial.pdf', recipient: 'Cliente 1', size: '3.1 MB', date: '08/09/2024', companyId: 2, deleted: false },
  ]
};

// Helper function to find company ID from name
const findCompanyIdByName = (companies: any[], name: string) => {
  const company = companies.find(c => c.name === name);
  return company?.id || 1; // Default to first company if not found
};

// Format date to DD/MM/YYYY
const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString('pt-BR');
};

const Dashboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [mockData, setMockData] = useState(() => {
    // Load data from localStorage
    const savedCompanies = localStorage.getItem('companies');
    const savedRecentFiles = localStorage.getItem('recentFiles');
    
    const companies = savedCompanies ? JSON.parse(savedCompanies) : INITIAL_MOCK_DATA.companies;
    const recentFiles = savedRecentFiles ? JSON.parse(savedRecentFiles) : INITIAL_MOCK_DATA.recentFiles;
    
    return {
      companies,
      recentFiles
    };
  });
  
  // Save data to localStorage when they change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(mockData.companies));
    localStorage.setItem('recentFiles', JSON.stringify(mockData.recentFiles));
  }, [mockData]);
  
  // Add new method to handle file updates
  const updateRecentFiles = (file: any) => {
    setMockData(prev => {
      // Check if file already exists
      const existingFileIndex = prev.recentFiles.findIndex(f => f.id === file.id);
      const newRecentFiles = [...prev.recentFiles];
      
      if (existingFileIndex >= 0) {
        // Update existing file with current date
        newRecentFiles[existingFileIndex] = { 
          ...file, 
          date: formatDate() 
        };
        
        // Move the file to the beginning of the array
        const updatedFile = newRecentFiles.splice(existingFileIndex, 1)[0];
        newRecentFiles.unshift(updatedFile);
      } else {
        // Add new file at the beginning
        newRecentFiles.unshift({
          id: prev.recentFiles.length > 0 ? Math.max(...prev.recentFiles.map(f => f.id)) + 1 : 1,
          name: file.name,
          recipient: prev.companies.find(c => c.id === file.companyId)?.name || 'Unknown',
          size: file.size || '1.0 MB',
          date: formatDate(),
          companyId: file.companyId,
          deleted: false
        });
        
        // Keep only the 10 most recent files
        if (newRecentFiles.length > 10) {
          newRecentFiles.pop();
        }
      }
      
      return { ...prev, recentFiles: newRecentFiles };
    });
  };
  
  // Method to update company last update date
  const updateCompanyLastUpdate = (companyId: number) => {
    setMockData(prev => {
      const updatedCompanies = prev.companies.map(company => {
        if (company.id === companyId) {
          return { ...company, lastUpdate: formatDate() };
        }
        return company;
      });
      
      return { ...prev, companies: updatedCompanies };
    });
  };
  
  // Method to mark a file as deleted
  const markFileAsDeleted = (fileId: number) => {
    setMockData(prev => {
      const updatedFiles = prev.recentFiles.map(file => {
        if (file.id === fileId) {
          return { ...file, deleted: true, date: formatDate() };
        }
        return file;
      });
      
      // Move the deleted file to the beginning
      const deletedFileIndex = updatedFiles.findIndex(f => f.id === fileId);
      if (deletedFileIndex > 0) {
        const deletedFile = updatedFiles.splice(deletedFileIndex, 1)[0];
        updatedFiles.unshift(deletedFile);
      }
      
      return { ...prev, recentFiles: updatedFiles };
    });
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  // Initialize dark mode on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const handleFileClick = (fileId: number) => {
    const file = mockData.recentFiles.find(f => f.id === fileId);
    if (file) {
      if (file.deleted) {
        toast.error(t('dashboard.file.deleted'));
        return;
      }
      
      updateRecentFiles(file);
      updateCompanyLastUpdate(file.companyId);
      navigate(`/company/${file.companyId}`);
      toast.info(`${t('dashboard.file.viewing')}: ${file.name}`);
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
      lastUpdate: formatDate(),
      type: 'company' as 'company' | 'client'
    };
    
    setMockData(prev => ({
      ...prev,
      companies: [...prev.companies, companyToAdd]
    }));
    
    setShowAddModal(false);
    toast.success(`${t('dashboard.company.added')}: "${newCompany.name}"`);
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  // Listen for file deletion events from the CompanyDetail page
  useEffect(() => {
    const handleFileDeleted = (event: CustomEvent) => {
      const { fileId } = event.detail;
      markFileAsDeleted(fileId);
    };
    
    window.addEventListener('fileDeleted' as any, handleFileDeleted);
    
    return () => {
      window.removeEventListener('fileDeleted' as any, handleFileDeleted);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <div className="w-full max-w-md">
            <IconInput 
              icon="search"
              type="text"
              placeholder={t('dashboard.search')}
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
              {t('dashboard.company.new')}
            </Button>
          </div>
        </header>
        
        <main className="py-6 px-6 dark:text-gray-100">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              {t('dashboard.companies.title')}
            </h2>
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
                  {t('dashboard.pagination.previous')}
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
                  {t('dashboard.pagination.next')}
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            )}
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {t('dashboard.files.recent')}
              </h2>
              <div className="flex gap-2">
                <IconInput 
                  icon="search"
                  type="text"
                  placeholder={t('dashboard.files.search')}
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('dashboard.files.name')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('dashboard.files.recipient')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('dashboard.files.size')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('dashboard.files.date')}
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {t('dashboard.files.status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                        {t('dashboard.files.empty')}
                      </td>
                    </tr>
                  ) : (
                    filteredFiles.map((file) => (
                      <tr 
                        key={file.id} 
                        className={`border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${
                          file.deleted ? 'bg-red-50 dark:bg-red-900/10' : ''
                        }`}
                        onClick={() => handleFileClick(file.id)}
                      >
                        <td className="py-3 px-4 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className={file.deleted ? "text-gray-400" : "text-blue-500"} />
                            <span className={file.deleted ? "text-gray-400 line-through" : ""}>
                              {file.name}
                            </span>
                          </div>
                        </td>
                        <td className={`py-3 px-4 dark:text-gray-300 ${file.deleted ? "text-gray-400" : ""}`}>
                          {file.recipient}
                        </td>
                        <td className={`py-3 px-4 dark:text-gray-300 ${file.deleted ? "text-gray-400" : ""}`}>
                          {file.size}
                        </td>
                        <td className={`py-3 px-4 dark:text-gray-300 ${file.deleted ? "text-gray-400" : ""}`}>
                          {file.date}
                        </td>
                        <td className="py-3 px-4 dark:text-gray-300">
                          {file.deleted ? (
                            <div className="flex items-center text-red-500 dark:text-red-400">
                              <Trash2 size={14} className="mr-1" />
                              <span>{t('dashboard.files.deleted')}</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-500 dark:text-green-400">
                              <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 mr-2"></div>
                              <span>{t('dashboard.files.active')}</span>
                            </div>
                          )}
                        </td>
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
