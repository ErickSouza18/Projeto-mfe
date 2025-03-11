
// We need to make significant changes to the CompanyDetail page to ensure files are saved properly 
// and to add color indicators for document types.

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Upload, PlusCircle, Edit, Save, X, FileText, 
  Eye, Download, Pencil, Info, Building 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { toast } from 'sonner';
import DeleteFileModal from '../components/DeleteFileModal';
import CompanyInfoModal from '../components/CompanyInfoModal';
import { useLanguage } from '../context/LanguageContext';

const DOCUMENT_TYPES = [
  { id: 'contratos', label: 'CONTRATOS SOCIAIS E DOCUMENTOS SOCIETÁRIOS', color: 'green' },
  { id: 'documentos', label: 'DOCUMENTOS PESSOAIS', color: 'blue' },
  { id: 'alvaras', label: 'ALVARÁS DE LICENÇA DE FUNCIONAMENTO', color: 'yellow' },
  { id: 'certificados', label: 'CERTIFICADO DIGITAL', color: 'red' },
  { id: 'folhapagamento', label: 'FOLHA DE PAGAMENTO', color: 'orange' },
  { id: 'honorarios', label: 'HONORÁRIOS CONTÁBEIS', color: 'cyan' },
  { id: 'contratos_servicos', label: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS', color: 'purple' },
];

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedDocType, setSelectedDocType] = useState(DOCUMENT_TYPES[0].id);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: number,
    name: string,
    type: string,
    date: string,
    size: string
  }>>([]);
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('');
  const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  const [showCompanyInfoModal, setShowCompanyInfoModal] = useState(false);
  const [companyName, setCompanyName] = useState(`${t('company.label')} ${id}`);
  
  // Load company info and files when component mounts
  useEffect(() => {
    // Load company info
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const company = companies.find((c: any) => c.id === Number(id));
    if (company) {
      setCompanyName(company.name);
    }
    
    // Load files
    const savedFiles = localStorage.getItem(`company_${id}_files`);
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, [id, t]);
  
  // Save files to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`company_${id}_files`, JSON.stringify(uploadedFiles));
  }, [uploadedFiles, id]);
  
  // Listen for company updates
  useEffect(() => {
    const handleCompanyUpdated = (event: CustomEvent) => {
      if (event.detail.companyId === Number(id)) {
        // Refresh company name
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const company = companies.find((c: any) => c.id === Number(id));
        if (company) {
          setCompanyName(company.name);
        }
      }
    };
    
    window.addEventListener('companyUpdated' as any, handleCompanyUpdated);
    
    return () => {
      window.removeEventListener('companyUpdated' as any, handleCompanyUpdated);
    };
  }, [id]);
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };
  
  const getColorForType = (typeId: string) => {
    const type = DOCUMENT_TYPES.find(t => t.id === typeId);
    return type?.color || 'gray';
  };
  
  const getColorClass = (color: string) => {
    switch(color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'cyan': return 'bg-cyan-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  const selectedType = DOCUMENT_TYPES.find(t => t.id === selectedDocType);
  
  const handleAddFile = () => {
    setShowNewFileModal(true);
  };
  
  const handleCreateNewFile = () => {
    if (!newFileName.trim()) {
      toast.error(t('file.error.noName'));
      return;
    }
    
    let fileName = newFileName;
    if (!fileName.includes('.')) {
      fileName += '.pdf';
    }
    
    const fileType = newFileType || selectedDocType;
    
    const newFile = {
      id: uploadedFiles.length > 0 ? Math.max(...uploadedFiles.map(f => f.id)) + 1 : 1,
      name: fileName,
      type: fileType,
      date: new Date().toLocaleDateString('pt-BR'),
      size: (Math.random() * 5).toFixed(1) + ' MB'
    };
    
    // Add to company's files
    setUploadedFiles(prev => [...prev, newFile]);
    
    // Update company's last update date
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const updatedCompanies = companies.map((company: any) => {
      if (company.id === Number(id)) {
        return { ...company, lastUpdate: new Date().toLocaleDateString('pt-BR') };
      }
      return company;
    });
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    
    // Add to recent files
    const dashboardFile = {
      id: Math.random() * 10000 | 0,
      name: fileName,
      recipient: companyName,
      size: (Math.random() * 5).toFixed(1) + ' MB',
      date: new Date().toLocaleDateString('pt-BR'),
      companyId: Number(id),
      deleted: false,
      type: fileType
    };
    
    const recentFiles = JSON.parse(localStorage.getItem('recentFiles') || '[]');
    recentFiles.unshift(dashboardFile);
    if (recentFiles.length > 10) recentFiles.pop();
    localStorage.setItem('recentFiles', JSON.stringify(recentFiles));
    
    // Close modal and reset form
    setShowNewFileModal(false);
    setNewFileName('');
    setNewFileType('');
    toast.success(`${t('file.added')}: "${newFile.name}"`);
  };
  
  const handleDeleteFile = (fileId: number) => {
    const fileToDelete = uploadedFiles.find(f => f.id === fileId);
    if (fileToDelete) {
      setFileToDelete(fileToDelete);
      setShowDeleteModal(true);
    }
  };
  
  const confirmDeleteFile = () => {
    if (!fileToDelete) return;
    
    const fileElement = document.querySelector(`[data-file-id="${fileToDelete.id}"]`);
    if (fileElement) {
      fileElement.classList.add('animate-fade-out');
      setTimeout(() => {
        // Remove from company's files
        setUploadedFiles(uploadedFiles.filter(f => f.id !== fileToDelete.id));
        
        // Update company's last update date
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const updatedCompanies = companies.map((company: any) => {
          if (company.id === Number(id)) {
            return { ...company, lastUpdate: new Date().toLocaleDateString('pt-BR') };
          }
          return company;
        });
        localStorage.setItem('companies', JSON.stringify(updatedCompanies));
        
        // Mark as deleted in recent files
        const recentFiles = JSON.parse(localStorage.getItem('recentFiles') || '[]');
        const updatedRecentFiles = recentFiles.map((file: any) => {
          if (file.name === fileToDelete.name && file.companyId === Number(id)) {
            return { ...file, deleted: true, date: new Date().toLocaleDateString('pt-BR') };
          }
          return file;
        });
        
        // Move deleted file to top of recent files
        const deletedIndex = updatedRecentFiles.findIndex((file: any) => 
          file.name === fileToDelete.name && file.companyId === Number(id)
        );
        
        if (deletedIndex > 0) {
          const deletedFile = updatedRecentFiles.splice(deletedIndex, 1)[0];
          updatedRecentFiles.unshift(deletedFile);
        }
        
        localStorage.setItem('recentFiles', JSON.stringify(updatedRecentFiles));
        
        // Dispatch file deleted event
        window.dispatchEvent(new CustomEvent('fileDeleted', { 
          detail: { fileId: fileToDelete.id } 
        }));
        
        toast.success(`${t('file.deleted')}: "${fileToDelete.name}"`);
        setShowDeleteModal(false);
        setFileToDelete(null);
      }, 300);
    }
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success(t('company.changesSaved'));
    } else {
      toast.info(t('company.editMode'));
    }
  };
  
  const handleViewFile = (file: any) => {
    setCurrentFile(file);
    setShowFilePreviewModal(true);
  };
  
  const handleDownloadFile = (file: any) => {
    toast.success(`${t('file.downloaded')}: "${file.name}"`);
  };
  
  const handleUpdateFileName = () => {
    if (!currentFile) return;
    
    const updatedFiles = uploadedFiles.map(file => {
      if (file.id === currentFile.id) {
        return { ...file, name: currentFile.name };
      }
      return file;
    });
    
    setUploadedFiles(updatedFiles);
    setIsEditingFileName(false);
    toast.success(t('file.nameUpdated'));
  };
  
  const handleViewCompanyInfo = () => {
    setShowCompanyInfoModal(true);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between animate-fade-in">
          <div className="flex items-center">
            <button 
              onClick={handleGoBack}
              className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hover-scale"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold dark:text-white">{companyName}</h1>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewCompanyInfo}
              className="flex items-center gap-1 hover-scale"
            >
              <Building size={16} />
              {t('company.viewInfo')}
            </Button>
            
            <Button
              variant={isEditing ? "danger" : "primary"}
              size="sm"
              onClick={toggleEditMode}
              className="flex items-center gap-1 hover-scale"
            >
              {isEditing ? (
                <>
                  <Save size={16} />
                  {t('company.saveChanges')}
                </>
              ) : (
                <>
                  <Edit size={16} />
                  {t('company.editDocuments')}
                </>
              )}
            </Button>
          </div>
        </header>
        
        <main className="py-6 px-6 dark:text-gray-100">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 fade-in animate-slide-in">
            <h2 className="text-lg font-medium mb-4 dark:text-gray-100">{t('file.upload.title')}</h2>
            
            <div className="relative mb-6">
              <div 
                className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg p-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className={`w-4 h-4 rounded-full ${getColorClass(getColorForType(selectedDocType))} mr-3`}></div>
                <span className="text-sm font-medium dark:text-gray-100">{selectedType?.label}</span>
                <svg 
                  className={`ml-auto w-5 h-5 transition-transform ${showDropdown ? 'transform rotate-180' : ''} dark:text-gray-300`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showDropdown && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10 max-h-64 overflow-y-auto">
                  {DOCUMENT_TYPES.map((type) => (
                    <div 
                      key={type.id}
                      className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        setSelectedDocType(type.id);
                        setShowDropdown(false);
                      }}
                    >
                      {type.id === selectedDocType && (
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      <div className={`w-4 h-4 rounded-full ${getColorClass(type.color)} mr-3`}></div>
                      <span className="text-sm dark:text-gray-100">{type.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="mb-4 flex items-center gap-2 hover-scale"
                onClick={handleAddFile}
              >
                <PlusCircle size={18} />
                {t('file.new')}
              </Button>
              <Button
                variant="secondary"
                className="mb-4 flex items-center gap-2 hover-scale"
              >
                <Upload size={18} />
                {t('file.upload.button')}
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('file.upload.dragDrop')}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 fade-in animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-lg font-medium mb-4 dark:text-gray-100">{t('file.uploaded')}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">{t('file.table.name')}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">{t('file.table.type')}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">{t('file.table.date')}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">{t('file.table.size')}</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">{t('file.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                        {t('file.table.empty')}
                      </td>
                    </tr>
                  ) : (
                    uploadedFiles.map(file => (
                      <tr 
                        key={file.id}
                        data-file-id={file.id}
                        className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-fade-in"
                      >
                        <td className="py-3 px-4 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getColorClass(getColorForType(file.type))}`}></div>
                            <FileText size={16} className="text-blue-500" />
                            {file.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 dark:text-gray-300">
                          {DOCUMENT_TYPES.find(t => t.id === file.type)?.label.split(' ')[0]}
                        </td>
                        <td className="py-3 px-4 dark:text-gray-300">{file.date}</td>
                        <td className="py-3 px-4 dark:text-gray-300">{file.size}</td>
                        <td className="py-3 px-4 flex gap-2">
                          <button 
                            className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                            onClick={() => handleViewFile(file)}
                            title={t('file.actions.view')}
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors"
                            onClick={() => handleDownloadFile(file)}
                            title={t('file.actions.download')}
                          >
                            <Download size={16} />
                          </button>
                          {isEditing && (
                            <>
                              <button 
                                className="text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                                onClick={() => {
                                  setCurrentFile(file);
                                  setIsEditingFileName(true);
                                  setShowFilePreviewModal(true);
                                }}
                                title={t('file.actions.edit')}
                              >
                                <Pencil size={16} />
                              </button>
                              <button 
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                                onClick={() => handleDeleteFile(file.id)}
                                title={t('file.actions.delete')}
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {showNewFileModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative animate-scale-in">
            <button 
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover-scale"
              onClick={() => setShowNewFileModal(false)}
            >
              <X size={20} />
            </button>
            
            <h3 className="text-lg font-medium mb-4 dark:text-white">{t('file.modal.new')}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('file.modal.name')}
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder={t('file.modal.namePlaceholder')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('file.modal.type')}
                </label>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={newFileType || selectedDocType}
                  onChange={(e) => setNewFileType(e.target.value)}
                >
                  {DOCUMENT_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowNewFileModal(false)}
                  className="hover-scale"
                >
                  {t('modal.cancel')}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateNewFile}
                  className="hover-scale"
                >
                  {t('file.modal.create')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showFilePreviewModal && currentFile && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-scale-in">
            <button 
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover-scale"
              onClick={() => {
                setShowFilePreviewModal(false);
                setIsEditingFileName(false);
              }}
            >
              <X size={20} />
            </button>
            
            <h3 className="text-lg font-medium mb-4 dark:text-white flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${getColorClass(getColorForType(currentFile.type))}`}></div>
              <FileText size={20} className="text-blue-500" />
              {isEditingFileName ? (
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={currentFile.name}
                  onChange={(e) => setCurrentFile({...currentFile, name: e.target.value})}
                  autoFocus
                />
              ) : (
                <span>{currentFile.name}</span>
              )}
              {isEditing && !isEditingFileName && (
                <button 
                  className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 ml-2"
                  onClick={() => setIsEditingFileName(true)}
                >
                  <Pencil size={16} />
                </button>
              )}
            </h3>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <FileText size={64} className="mx-auto mb-4 text-blue-500" />
                <p className="text-gray-600 dark:text-gray-300">{t('file.preview.unavailable')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('file.preview.type')}: {DOCUMENT_TYPES.find(t => t.id === currentFile.type)?.label}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-end">
              {isEditingFileName && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => setIsEditingFileName(false)}
                    className="hover-scale"
                  >
                    {t('modal.cancel')}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdateFileName}
                    className="hover-scale"
                  >
                    {t('file.modal.saveName')}
                  </Button>
                </>
              )}
              
              {!isEditingFileName && (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleDownloadFile(currentFile)}
                    className="flex items-center gap-2 hover-scale"
                  >
                    <Download size={16} />
                    {t('file.actions.download')}
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowFilePreviewModal(false)}
                    className="hover-scale"
                  >
                    {t('modal.close')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {showDeleteModal && fileToDelete && (
        <DeleteFileModal
          fileName={fileToDelete.name}
          onConfirm={confirmDeleteFile}
          onCancel={() => {
            setShowDeleteModal(false);
            setFileToDelete(null);
          }}
        />
      )}
      
      {showCompanyInfoModal && (
        <CompanyInfoModal
          companyId={id || '0'}
          onClose={() => setShowCompanyInfoModal(false)}
        />
      )}
    </div>
  );
};

export default CompanyDetail;
