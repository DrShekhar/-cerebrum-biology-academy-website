'use client'

export function FocusVisibleStyles() {
  return (
    <style jsx global>{`
      /* Enhanced focus indicators for accessibility */
      *:focus-visible {
        outline: 3px solid #3b82f6;
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Specific focus styles for interactive elements */
      button:focus-visible,
      a:focus-visible,
      input:focus-visible,
      select:focus-visible,
      textarea:focus-visible,
      [role='button']:focus-visible,
      [role='link']:focus-visible,
      [role='tab']:focus-visible {
        outline: 3px solid #3b82f6;
        outline-offset: 2px;
      }

      /* Focus within for composite widgets */
      [role='tablist']:focus-within,
      [role='menu']:focus-within,
      [role='menubar']:focus-within {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }

      /* Remove default outlines since we're using focus-visible */
      *:focus:not(:focus-visible) {
        outline: none;
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        *:focus-visible {
          outline-width: 4px;
          outline-color: currentColor;
        }
      }
    `}</style>
  )
}
