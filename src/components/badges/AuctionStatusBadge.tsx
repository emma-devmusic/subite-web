import React from 'react';
import { Badge } from './Badge';

type AuctionStatus = 'pending' | 'running' | 'finish';

interface AuctionStatusBadgeProps {
  status: AuctionStatus;
  className?: string;
}

const statusLabels = {
  pending: 'En espera',
  running: 'Activa', 
  finish: 'Finalizada'
};

const statusIcons = {
  pending: '⏳',
  running: '🔥',
  finish: '✅'
};

export const AuctionStatusBadge: React.FC<AuctionStatusBadgeProps> = ({ 
  status, 
  className = '' 
}) => {
  return (
    <Badge 
      variant={status} 
      className={`absolute z-[2] top-2 right-2 ${className}`}
    >
      {statusLabels[status]}
    </Badge>
  );
};