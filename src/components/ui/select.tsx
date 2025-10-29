import * as React from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, value, onValueChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onValueChange?.(e.target.value);
      onChange?.(e);
    };

    return (
      <select
        ref={ref}
        value={value}
        onChange={handleChange}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`flex items-center justify-between w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)
SelectTrigger.displayName = "SelectTrigger"

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}
const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className = "", children, placeholder = "Select...", ...props }, ref) => (
    <span
      ref={ref}
      className={`truncate text-sm text-gray-700 ${className}`}
      {...props}
    >
      {children ?? placeholder}
    </span>
  )
)
SelectValue.displayName = "SelectValue"

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`mt-1 w-full rounded-md border border-gray-200 bg-white shadow-sm overflow-auto max-h-60 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
SelectContent.displayName = "SelectContent"

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}
const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
