
import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyCardProps {
  name: string;
  employeeCount: number;
  lastUpdate: string;
  type: 'company' | 'client';
  onClick?: () => void;
  className?: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  employeeCount,
  lastUpdate,
  type,
  onClick,
  className
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 p-4 card-hover cursor-pointer relative",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>
      
      <div className="mb-4">
        <span className="text-3xl font-semibold">{employeeCount}</span>
        <p className="text-sm text-gray-500">Funcionários</p>
      </div>
      
      <div className="flex items-center text-xs text-gray-500">
        <Clock size={14} className="mr-1" />
        <span>Última atualização: {lastUpdate}</span>
      </div>
    </div>
  );
};

export default CompanyCard;
