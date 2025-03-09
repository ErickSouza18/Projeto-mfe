
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

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
  
  // In a real app, you would fetch company data based on the ID
  const companyName = `Empresa${id}`;
  
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
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center">
          <button 
            onClick={handleGoBack}
            className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">{companyName}</h1>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Envio de Arquivos</h2>
            
            {/* Document type selector */}
            <div className="relative mb-6">
              <div 
                className="flex items-center border border-gray-200 rounded-lg p-3 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className={`w-4 h-4 rounded-full ${getColorClass(getColorForType(selectedDocType))} mr-3`}></div>
                <span className="text-sm font-medium">{selectedType?.label}</span>
                <svg 
                  className={`ml-auto w-5 h-5 transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {showDropdown && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-64 overflow-y-auto">
                  {DOCUMENT_TYPES.map((type) => (
                    <div 
                      key={type.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
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
                      <span className="text-sm">{type.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Upload area */}
            <div className="border border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center">
              <Button
                variant="primary"
                className="mb-4 flex items-center gap-2"
              >
                <Upload size={18} />
                Enviar Arquivos
              </Button>
              <p className="text-sm text-gray-500">Ou arraste e solte seus arquivos aqui</p>
            </div>
          </div>
          
          {/* Files table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-medium mb-4">Arquivos Enviados</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nome do Arquivo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Data de Envio</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tamanho</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                      Nenhum arquivo enviado ainda
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CompanyDetail;
