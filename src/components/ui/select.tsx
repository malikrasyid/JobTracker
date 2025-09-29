import * as React from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
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
