export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'published':
      return 'text-green-600 bg-green-100'
    case 'draft':
      return 'text-gray-600 bg-gray-100'
    case 'scheduled':
      return 'text-blue-600 bg-blue-100'
    case 'archived':
      return 'text-yellow-600 bg-yellow-100'
    case 'practice':
      return 'text-purple-600 bg-purple-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}
