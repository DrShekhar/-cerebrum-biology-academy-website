import toast from 'react-hot-toast'

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#10B981',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '✅',
    })
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#EF4444',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '❌',
    })
  },

  loading: (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
    })
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: Error) => string)
    }
  ) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      },
      {
        position: 'top-right',
        style: {
          padding: '16px',
          borderRadius: '8px',
        },
      }
    )
  },

  info: (message: string) => {
    toast(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#3B82F6',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: 'ℹ️',
    })
  },

  warning: (message: string) => {
    toast(message, {
      duration: 4500,
      position: 'top-right',
      style: {
        background: '#F59E0B',
        color: '#fff',
        padding: '16px',
        borderRadius: '8px',
      },
      icon: '⚠️',
    })
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId)
  },

  dismissAll: () => {
    toast.dismiss()
  },
}
