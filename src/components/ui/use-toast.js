// This file is modified from the original toast module from radix-ui/react-toast
// Adapted for use in a React application from the shadcn/ui implementation

import { useState, useEffect, createContext, useContext } from 'react';

const TOAST_REMOVE_DELAY = 1000000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST"
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const initialState = {
  toasts: [],
};

const toastTimeouts = new Map();

const ToastContext = createContext({
  ...initialState,
  toast: () => {},
  dismiss: () => {},
  update: () => {},
});

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts],
      };
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
    case actionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
}

export function useToast() {
  const [state, setState] = useState(initialState);

  const toast = ({ ...props }) => {
    const id = props.id || genId();
    const newToast = { id, open: true, ...props };

    setState((prevState) => reducer(prevState, { type: actionTypes.ADD_TOAST, toast: newToast }));

    return id;
  };

  const update = (id, props) => {
    if (!id) return;
    setState((prevState) => reducer(prevState, { type: actionTypes.UPDATE_TOAST, toast: { id, ...props } }));
  };

  const dismiss = (id) => {
    if (!id) return;
    setState((prevState) => reducer(prevState, { type: actionTypes.DISMISS_TOAST, toastId: id }));
  };

  useEffect(() => {
    const handleRemoveToast = (id) => {
      setState((prevState) => reducer(prevState, { type: actionTypes.REMOVE_TOAST, toastId: id }));
    };

    state.toasts.forEach((toast) => {
      if (!toast.open && !toastTimeouts.has(toast.id)) {
        toastTimeouts.set(toast.id, setTimeout(() => {
          handleRemoveToast(toast.id);
          toastTimeouts.delete(toast.id);
        }, TOAST_REMOVE_DELAY));
      }
    });

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.clear();
    };
  }, [state.toasts]);

  return {
    ...state,
    toast,
    dismiss,
    update,
  };
}

export const Toaster = () => {
  const { toasts } = useToast();

  // This is a simplified toaster - in a real app you'd implement this with proper UI
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${toast.open ? 'animate-in fade-in' : 'animate-out fade-out'}`}
        >
          {toast.title && <h3 className="font-medium">{toast.title}</h3>}
          {toast.description && <p className="text-sm text-gray-500">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}; 