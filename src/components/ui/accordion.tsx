"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Minimal Accordion (shadcn/ui-compatible API, no radix dependency) */
/* ------------------------------------------------------------------ */

interface AccordionContextValue {
  type: "single" | "multiple"
  collapsible?: boolean
  value: string[]
  onValueChange: (value: string[]) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({
  type: "single",
  collapsible: false,
  value: [],
  onValueChange: () => {},
})

/* ----- Accordion root ----- */

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      collapsible = false,
      defaultValue,
      value: controlledValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(() => {
      if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
      return []
    })

    const value = controlledValue
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : internalValue

    const handleValueChange = React.useCallback(
      (next: string[]) => {
        if (!controlledValue) setInternalValue(next)
        if (onValueChange) {
          onValueChange(type === "single" ? (next[0] ?? "") : next)
        }
      },
      [controlledValue, onValueChange, type],
    )

    return (
      <AccordionContext.Provider value={{ type, collapsible, value, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("divide-y divide-gray-200", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
Accordion.displayName = "Accordion"

/* ----- AccordionItem ----- */

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
  toggle: () => void
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  value: "",
  isOpen: false,
  toggle: () => {},
})

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value: itemValue, className, children, ...props }, ref) => {
    const { type, collapsible, value, onValueChange } = React.useContext(AccordionContext)
    const isOpen = value.includes(itemValue)

    const toggle = React.useCallback(() => {
      if (type === "single") {
        if (isOpen && collapsible) {
          onValueChange([])
        } else if (!isOpen) {
          onValueChange([itemValue])
        }
      } else {
        if (isOpen) {
          onValueChange(value.filter((v) => v !== itemValue))
        } else {
          onValueChange([...value, itemValue])
        }
      }
    }, [type, collapsible, isOpen, itemValue, value, onValueChange])

    return (
      <AccordionItemContext.Provider value={{ value: itemValue, isOpen, toggle }}>
        <div ref={ref} className={cn("border-b", className)} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  },
)
AccordionItem.displayName = "AccordionItem"

/* ----- AccordionTrigger ----- */

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, toggle } = React.useContext(AccordionItemContext)

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={isOpen}
        onClick={toggle}
        className={cn(
          "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&>svg]:transition-transform",
          isOpen && "[&>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    )
  },
)
AccordionTrigger.displayName = "AccordionTrigger"

/* ----- AccordionContent ----- */

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext)
    const contentRef = React.useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden text-sm", className)}
        {...props}
      >
        <div ref={contentRef} className="pb-4 pt-0">
          {children}
        </div>
      </div>
    )
  },
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
