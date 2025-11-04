import { useState, useCallback, useRef } from 'react'

interface OptimisticListItem<T> {
  data: T
  id: string
  isOptimistic: boolean
  isPending: boolean
  error: Error | null
}

interface OptimisticListOptions {
  onSuccess?: (item: any) => void
  onError?: (error: Error, item: any) => void
}

/**
 * Custom hook for managing optimistic list updates
 * Handles adding, removing, and updating items with instant feedback
 *
 * @example
 * const { items, addItem, removeItem, updateItem } = useOptimisticList(initialItems)
 *
 * // Add item optimistically
 * await addItem(newItem, async () => api.createItem(newItem))
 */
export function useOptimisticList<T extends { id?: string }>(
  initialItems: T[] = [],
  options: OptimisticListOptions = {}
) {
  const [items, setItems] = useState<OptimisticListItem<T>[]>(
    initialItems.map((item) => ({
      data: item,
      id: item.id || generateTempId(),
      isOptimistic: false,
      isPending: false,
      error: null,
    }))
  )

  const serverItemsRef = useRef<Map<string, T>>(new Map())

  const addItem = useCallback(
    async (item: T, serverCreate: (item: T) => Promise<T>): Promise<string | undefined> => {
      const tempId = generateTempId()
      const optimisticItem: OptimisticListItem<T> = {
        data: item,
        id: tempId,
        isOptimistic: true,
        isPending: true,
        error: null,
      }

      // Add optimistically at the beginning of the list
      setItems((current) => [optimisticItem, ...current])

      try {
        // Create on server
        const serverItem = await serverCreate(item)
        const serverId = serverItem.id || tempId

        // Replace optimistic item with server response
        setItems((current) =>
          current.map((i) =>
            i.id === tempId
              ? {
                  data: serverItem,
                  id: serverId,
                  isOptimistic: false,
                  isPending: false,
                  error: null,
                }
              : i
          )
        )

        serverItemsRef.current.set(serverId, serverItem)
        options.onSuccess?.(serverItem)

        return serverId
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to create item')

        // Mark item as failed
        setItems((current) =>
          current.map((i) =>
            i.id === tempId ? { ...i, isOptimistic: false, isPending: false, error: err } : i
          )
        )

        options.onError?.(err, item)
        throw err
      }
    },
    [options]
  )

  const removeItem = useCallback(
    async (id: string, serverDelete: (id: string) => Promise<void>) => {
      const itemToRemove = items.find((i) => i.id === id)
      if (!itemToRemove) return

      // Store for potential rollback
      serverItemsRef.current.set(id, itemToRemove.data)

      // Remove optimistically
      setItems((current) => current.filter((i) => i.id !== id))

      try {
        // Delete on server
        await serverDelete(id)

        // Remove from server cache
        serverItemsRef.current.delete(id)
        options.onSuccess?.({ id })
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to delete item')

        // Rollback: restore the item
        const restoredItem = serverItemsRef.current.get(id)
        if (restoredItem) {
          setItems((current) => [
            {
              data: restoredItem,
              id,
              isOptimistic: false,
              isPending: false,
              error: err,
            },
            ...current,
          ])
        }

        options.onError?.(err, { id })
        throw err
      }
    },
    [items, options]
  )

  const updateItem = useCallback(
    async (
      id: string,
      updates: Partial<T>,
      serverUpdate: (id: string, updates: Partial<T>) => Promise<T>
    ) => {
      const itemIndex = items.findIndex((i) => i.id === id)
      if (itemIndex === -1) return

      const originalItem = items[itemIndex]
      serverItemsRef.current.set(id, originalItem.data)

      // Update optimistically
      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                data: { ...item.data, ...updates },
                isOptimistic: true,
                isPending: true,
              }
            : item
        )
      )

      try {
        // Update on server
        const serverItem = await serverUpdate(id, updates)

        // Replace with server response
        setItems((current) =>
          current.map((item) =>
            item.id === id
              ? {
                  data: serverItem,
                  id,
                  isOptimistic: false,
                  isPending: false,
                  error: null,
                }
              : item
          )
        )

        serverItemsRef.current.set(id, serverItem)
        options.onSuccess?.(serverItem)

        return serverItem
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to update item')

        // Rollback to original
        const originalData = serverItemsRef.current.get(id)
        if (originalData) {
          setItems((current) =>
            current.map((item) =>
              item.id === id
                ? {
                    data: originalData,
                    id,
                    isOptimistic: false,
                    isPending: false,
                    error: err,
                  }
                : item
            )
          )
        }

        options.onError?.(err, { id, updates })
        throw err
      }
    },
    [items, options]
  )

  const clearError = useCallback((id: string) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, error: null } : item)))
  }, [])

  const retryItem = useCallback(
    async (id: string) => {
      const item = items.find((i) => i.id === id)
      if (!item || !item.error) return

      // For now, just clear the error
      // In a real implementation, you'd retry the failed operation
      clearError(id)
    },
    [items, clearError]
  )

  return {
    items: items.map((item) => item.data),
    rawItems: items,
    addItem,
    removeItem,
    updateItem,
    clearError,
    retryItem,
  }
}

function generateTempId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
