import toast, { ToastOptions } from 'react-hot-toast';

const baseOptions: ToastOptions = {
  position: 'top-center',
  duration: 4000,
  style: {
    borderRadius: '8px',
    background: '#1e293b',
    color: '#fff',
    fontWeight: 500,
    fontSize: '1rem',
  },
};

export const notify = {
  success: (msg: string, options?: ToastOptions) => toast.success(msg, { ...baseOptions, ...options }),
  error: (msg: string, options?: ToastOptions) => toast.error(msg, { ...baseOptions, ...options }),
  info: (msg: string, options?: ToastOptions) => toast(msg, { ...baseOptions, icon: 'ℹ️', ...options }),
  loading: (msg: string, options?: ToastOptions) => toast.loading(msg, { ...baseOptions, ...options }),
  dismiss: toast.dismiss,
};

export function useNotify() {
  return notify;
} 