import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import type { ToastActionElement, ToastProps } from '@/components/ui/toast';

type ToastItem = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

type ToastInput = Omit<ToastItem, 'id'>;

const MAX_TOASTS = 3;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((toastId?: string) => {
    setToasts((current) =>
      toastId ? current.filter(({ id }) => id !== toastId) : [],
    );
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = crypto.randomUUID();
      setToasts((current) => [{ ...input, id }, ...current].slice(0, MAX_TOASTS));
      return { id, dismiss: () => dismiss(id) };
    },
    [dismiss],
  );

  return { toasts, toast, dismiss };
}