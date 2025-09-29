// /src/components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  let baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variantStyles = "";

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
    default:
      variantStyles =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
