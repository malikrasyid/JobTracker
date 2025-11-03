// /src/components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  let sizeStyles = "";
  let variantStyles = "";

  switch (size) {
    case "sm":
      sizeStyles = "px-2 py-1 text-sm";
      break;
    case "lg":
      sizeStyles = "px-6 py-3 text-base";
      break;
    case "md":
    default:
      sizeStyles = "px-4 py-2 text-sm";
      break;
  }

  switch (variant) {
    case "primary":
      variantStyles =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case "secondary":
      variantStyles =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";
      break;
    case "outline":
      variantStyles =
        "border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400";
      break;
    case "ghost":
      variantStyles =
        "bg-transparent text-gray-800 hover:bg-gray-50 focus:ring-gray-300";
      break;
    default:
      variantStyles =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
