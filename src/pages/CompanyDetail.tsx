
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, PlusCircle, Edit, Save, X, FileText } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { toast } from 'sonner';

// Mock data
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
  
  // Load files from localStorage if they exist
  useEffect(() => {
    const savedFiles = localStorage.getItem(`company_${id}_files`);
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, [id]);
  
  // Save files to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`company_${id}_files`, JSON.stringify(uploadedFiles));
  }, [uploadedFiles, id]);
  
  // In a real app, you would fetch company data based on the ID
  const companyName = `Empresa ${id}`;
  
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
      toast.error('Por favor, insira um nome para o arquivo');
      return;
    }
    
    // Add file extension if not provided
    let fileName = newFileName;
    if (!fileName.includes('.')) {
      fileName += '.pdf';
    }
    
    const newFile = {
      id: uploadedFiles.length > 0 ? Math.max(...uploadedFiles.map(f => f.id)) + 1 : 1,
      name: fileName,
      type: newFileType || selectedDocType,
      date: new Date().toLocaleDateString('pt-BR'),
      size: (Math.random() * 5).toFixed(1) + ' MB'
    };
    
    setUploadedFiles([...uploadedFiles, newFile]);
    setShowNewFileModal(false);
    setNewFileName('');
    setNewFileType('');
    toast.success(`Arquivo "${newFile.name}" adicionado com sucesso!`);
  };
  
  const handleDeleteFile = (fileId: number) => {
    const fileToDelete = uploadedFiles.find(f => f.id === fileId);
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
    toast.success(`Arquivo "${fileToDelete?.name}" removido com sucesso!`);
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success('Alterações salvas com sucesso!');
    } else {
      toast.info('Modo de edição ativado');
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={handleGoBack}
              className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold dark:text-white">{companyName}</h1>
          </div>
          
          <Button
            variant={isEditing ? "danger" : "primary"}
            size="sm"
            onClick={toggleEditMode}
            className="flex items-center gap-1"
          >
            {isEditing ? (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            ) : (
              <>
                <Edit size={16} />
                Editar Documentos
              </>
            )}
          </Button>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6 dark:text-gray-100">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-medium mb-4 dark:text-gray-100">Envio de Arquivos</h2>
            
            {/* Document type selector */}
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
            
            {/* Upload area */}
            <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="mb-4 flex items-center gap-2"
                onClick={handleAddFile}
              >
                <PlusCircle size={18} />
                Novo Arquivo
              </Button>
              <Button
                variant="secondary"
                className="mb-4 flex items-center gap-2"
              >
                <Upload size={18} />
                Enviar Arquivos
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ou arraste e solte seus arquivos aqui</p>
            </div>
          </div>
          
          {/* Files table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-medium mb-4 dark:text-gray-100">Arquivos Enviados</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Nome do Arquivo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Data de Envio</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Tamanho</th>
                    {isEditing && <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-300">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.length === 0 ? (
                    <tr>
                      <td colSpan={isEditing ? 5 : 4} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                        Nenhum arquivo enviado ainda
                      </td>
                    </tr>
                  ) : (
                    uploadedFiles.map(file => (
                      <tr key={file.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-blue-500" />
                            {file.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 dark:text-gray-300">
                          {DOCUMENT_TYPES.find(t => t.id === file.type)?.label.split(' ')[0]}
                        </td>
                        <td className="py-3 px-4 dark:text-gray-300">{file.date}</td>
                        <td className="py-3 px-4 dark:text-gray-300">{file.size}</td>
                        {isEditing && (
                          <td className="py-3 px-4">
                            <button 
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                              onClick={() => handleDeleteFile(file.id)}
                            >
                              <X size={16} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowNewFileModal(false)}
            >
              <X size={20} />
            </button>
            
            <h3 className="text-lg font-medium mb-4 dark:text-white">Novo Arquivo</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome do Arquivo
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Ex: Contrato Social"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tipo de Documento
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
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateNewFile}
                >
                  Criar Arquivo
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
