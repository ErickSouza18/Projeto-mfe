
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import IconInput from '../components/IconInput';
import Button from '../components/Button';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    cpfCnpj: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    setIsLoading(true);
    
    // Simulando uma requisição
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo - Formulário de cadastro */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 animate-slide-in order-2 md:order-1">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">CADASTRO</h2>
          <p className="text-gray-600 text-center mb-8">Comece aqui!</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <IconInput 
              icon="cpf" 
              type="text" 
              name="cpfCnpj"
              placeholder="CPF/CNPJ" 
              value={userData.cpfCnpj}
              onChange={handleChange}
              required
            />
            
            <IconInput 
              icon="lock" 
              type="password" 
              name="password"
              placeholder="Senha" 
              value={userData.password}
              onChange={handleChange}
              required
            />
            
            <IconInput 
              icon="lock" 
              type="password" 
              name="confirmPassword"
              placeholder="Confirmar senha" 
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            <IconInput 
              icon="email" 
              type="email" 
              name="email"
              placeholder="Email" 
              value={userData.email}
              onChange={handleChange}
              required
            />
            
            <div className="text-xs text-gray-600">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link to="/terms" className="text-blue-500 hover:underline">
                Termos de Uso
              </Link>
              {' '}e{' '}
              <Link to="/privacy" className="text-blue-500 hover:underline">
                Políticas de Privacidade
              </Link>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg"
              isLoading={isLoading}
            >
              CRIAR
            </Button>
          </form>
        </div>
      </div>
      
      {/* Lado direito - Gradiente e Logo */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-8 text-white order-1 md:order-2">
        <div className="animate-fade-in">
          <Logo size="lg" className="mb-12" />
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">MEF</h1>
          <p className="text-xl md:text-2xl text-center mb-12">
            Bem-vindo de volta!
          </p>
          
          <div className="text-center">
            <p className="text-lg mb-4">Já possui uma conta?</p>
            <Link 
              to="/login" 
              className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-full transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
