import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', fullscreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className={`${sizes[size]} border-4 border-neutral-200 dark:border-neutral-700 border-t-primary rounded-full animate-spin`} />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = '📭',
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in`}>
      {message}
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const showToast = (props: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, (props.duration || 3000) + 300);
  };

  const toastComponent = (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );

  return { showToast, toastComponent };
};
