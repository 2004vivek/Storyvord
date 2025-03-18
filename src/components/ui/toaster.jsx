import React from 'react';
import { useToast } from './use-toast';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

const Toaster = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={cn(
            "flex items-start bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-border",
            toast.open ? 'animate-in fade-in' : 'animate-out fade-out'
          )}
        >
          <div className="flex-1">
            {toast.title && <h3 className="font-medium text-foreground">{toast.title}</h3>}
            {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
          </div>
          <button 
            onClick={() => dismiss(toast.id)} 
            className="ml-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export { Toaster }; 