
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  User, 
  Lock, 
  Mail, 
  Building2, 
  Phone, 
  FileText,
  Search
} from 'lucide-react';

type IconType = 'user' | 'lock' | 'email' | 'cpf' | 'company' | 'phone' | 'search';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconType;
  label?: string;
  containerClassName?: string;
}

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(
  ({ icon, label, className, containerClassName, ...props }, ref) => {
    const getIcon = () => {
      switch (icon) {
        case 'user':
          return <User className="h-5 w-5 text-gray-400" />;
        case 'lock':
          return <Lock className="h-5 w-5 text-gray-400" />;
        case 'email':
          return <Mail className="h-5 w-5 text-gray-400" />;
        case 'cpf':
          return <FileText className="h-5 w-5 text-gray-400" />;
        case 'company':
          return <Building2 className="h-5 w-5 text-gray-400" />;
        case 'phone':
          return <Phone className="h-5 w-5 text-gray-400" />;
        case 'search':
          return <Search className="h-5 w-5 text-gray-400" />;
        default:
          return <User className="h-5 w-5 text-gray-400" />;
      }
    };

    return (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        )}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getIcon()}
          </div>
          <input
            ref={ref}
            className={cn(
              "input-animated",
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

IconInput.displayName = 'IconInput';

export default IconInput;
