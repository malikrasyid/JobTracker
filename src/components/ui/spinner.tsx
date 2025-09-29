interface SpinnerProps {
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function Spinner({ size = "md" }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-600 ${sizeClasses[size]}`}
    />
  )
}
Spinner.displayName = "Spinner"