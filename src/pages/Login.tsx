
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import IconInput from '../components/IconInput';
import Button from '../components/Button';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    cpfCnpj: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulando uma requisição
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Lado esquerdo - Gradiente e Logo */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-400 to-indigo-600 flex flex-col items-center justify-center p-8 text-white">
        <div className="animate-fade-in">
          <Logo size="lg" className="mb-12" />
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">MEF</h1>
          <p className="text-xl md:text-2xl text-center mb-12">
            Conecte-se com o seu escritório
          </p>
          <p className="text-lg text-center">A qualquer hora</p>
        </div>
      </div>
      
      {/* Lado direito - Formulário de login */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 animate-slide-in">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-2">LOGIN</h2>
          <p className="text-gray-600 text-center mb-8">Bem-vindo de volta!</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <IconInput 
              icon="cpf" 
              type="text" 
              name="cpfCnpj"
              placeholder="CPF/CNPJ" 
              value={credentials.cpfCnpj}
              onChange={handleChange}
              required
            />
            
            <IconInput 
              icon="lock" 
              type="password" 
              name="password"
              placeholder="Senha" 
              value={credentials.password}
              onChange={handleChange}
              required
            />
            
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-blue-500">
                Esqueceu sua senha?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg"
              isLoading={isLoading}
            >
              ENTRAR
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Ainda não possui uma conta?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
