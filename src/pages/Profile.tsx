
import React, { useState } from 'react';
import { User, Mail, Building2, Phone, FileText, Save, EyeOff, Eye } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import IconInput from '../components/IconInput';
import { toast } from 'sonner';

// Dados ficticios do usuário
const MOCK_USER = {
  name: 'João Silva',
  email: 'joao.silva@escritoriox.com',
  cpfCnpj: '123.456.789-00',
  phone: '(11) 98765-4321',
  company: 'Escritório X',
  role: 'Administrador',
  profileImage: ''
};

const Profile = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(MOCK_USER);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setUser(formData);
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleCancelEdit = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    // Simulando mudança de senha
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Senha alterada com sucesso!');
  };

  // Função para gerar as iniciais do nome do usuário
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-80">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <h1 className="text-xl font-semibold">Meu Perfil</h1>
        </header>
        
        {/* Main content */}
        <main className="py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Perfil básico */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Informações Pessoais</h2>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={handleSaveProfile}
                    >
                      <Save size={16} className="mr-1" />
                      Salvar
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <IconInput
                      icon="user"
                      label="Nome"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Seu nome"
                    />
                    <IconInput
                      icon="email"
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Seu email"
                    />
                    <IconInput
                      icon="cpf"
                      label="CPF/CNPJ"
                      name="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={handleInputChange}
                      placeholder="Seu CPF ou CNPJ"
                    />
                    <IconInput
                      icon="phone"
                      label="Telefone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Seu telefone"
                    />
                    <IconInput
                      icon="company"
                      label="Empresa"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Sua empresa"
                    />
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-gray-100 h-20 w-20 flex items-center justify-center text-gray-700 text-2xl font-bold">
                        {user.profileImage ? (
                          <img 
                            src={user.profileImage} 
                            alt={user.name} 
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium">{user.name}</h3>
                        <p className="text-gray-500">{user.role} at {user.company}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <div className="flex items-center mt-1">
                          <Mail size={16} className="text-gray-400 mr-2" />
                          <p>{user.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">CPF/CNPJ</p>
                        <div className="flex items-center mt-1">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <p>{user.cpfCnpj}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Telefone</p>
                        <div className="flex items-center mt-1">
                          <Phone size={16} className="text-gray-400 mr-2" />
                          <p>{user.phone}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Empresa</p>
                        <div className="flex items-center mt-1">
                          <Building2 size={16} className="text-gray-400 mr-2" />
                          <p>{user.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Foto de perfil e segurança */}
            <div className="space-y-6">
              {/* Foto de perfil */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4">Foto de Perfil</h2>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-4xl font-bold mb-4">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Remover
                    </Button>
                    <Button variant="secondary" size="sm">
                      Alterar
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Segurança */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-medium mb-4">Segurança</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Senha Atual
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nova Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Nova Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    onClick={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                  >
                    Atualizar Senha
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Adicionando o componente Lock faltante que não está nas importações originais
const Lock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default Profile;
