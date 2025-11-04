import { useRef, useCallback } from 'react'

interface LongPressOptions {
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void
  onClick?: (event: React.TouchEvent | React.MouseEvent) => void
  threshold?: number
  onStart?: (event: React.TouchEvent | React.MouseEvent) => void
  onFinish?: (event: React.TouchEvent | React.MouseEvent) => void
  onCancel?: (event: React.TouchEvent | React.MouseEvent) => void
}

interface LongPressHandlers {
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: (e: React.MouseEvent) => void
  onMouseLeave: (e: React.MouseEvent) => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

export function useLongPress(options: LongPressOptions): LongPressHandlers {
  const { onLongPress, onClick, threshold = 500, onStart, onFinish, onCancel } = options

  const isLongPress = useRef(false)
  const timerId = useRef<NodeJS.Timeout | null>(null)
  const target = useRef<EventTarget | null>(null)

  const start = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (onStart) {
        onStart(event)
      }

      isLongPress.current = false
      target.current = event.target

      timerId.current = setTimeout(() => {
        isLongPress.current = true
        onLongPress(event)

        if ('vibrate' in navigator) {
          navigator.vibrate([10, 50, 10])
        }

        if (onFinish) {
          onFinish(event)
        }
      }, threshold)
    },
    [onLongPress, onStart, onFinish, threshold]
  )

  const clear = useCallback(
    (event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
      if (timerId.current) {
        clearTimeout(timerId.current)
        timerId.current = null
      }

      if (shouldTriggerClick && !isLongPress.current && onClick) {
        onClick(event)
      }

      if (isLongPress.current && onFinish) {
        onFinish(event)
      }

      isLongPress.current = false
      target.current = null
    },
    [onClick, onFinish]
  )

  const cancel = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      if (timerId.current) {
        clearTimeout(timerId.current)
        timerId.current = null
      }

      if (onCancel) {
        onCancel(event)
      }

      isLongPress.current = false
      target.current = null
    },
    [onCancel]
  )

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => cancel(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  }
}
