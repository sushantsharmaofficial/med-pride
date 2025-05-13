"use client";

import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  fullPage?: boolean;
  text?: string;
  type?: "spinner" | "pulse" | "medical";
}

export const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  variant = "primary",
  fullPage = false,
  text,
  type = "medical",
}) => {
  // Size mapping
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  // Color mapping based on theme
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
  };

  // Render different loader types
  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <div
            className={`${sizeClasses[size]} border-4 ${
              variant === "primary" ? "border-primary/20 border-t-primary" : "border-secondary/20 border-t-secondary"
            } rounded-full animate-spin`}
            role="status"
            aria-label="Loading"
          />
        );
      case "pulse":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${variant === "primary" ? "bg-primary" : "bg-secondary"} rounded-full animate-pulse`}
                style={{
                  width: size === "small" ? "0.5rem" : size === "medium" ? "0.75rem" : "1rem",
                  height: size === "small" ? "0.5rem" : size === "medium" ? "0.75rem" : "1rem",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        );
      case "medical":
      default:
        return (
          <div className={`relative ${sizeClasses[size]}`}>
            {/* Medical cross with pulse effect */}
            <div
              className={`absolute inset-0 ${
                variant === "primary" ? "bg-primary" : "bg-secondary"
              } rounded-md opacity-20 animate-ping`}
              style={{ clipPath: "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)" }}
            />
            
            {/* Medical cross solid */}
            <div
              className={`absolute inset-0 ${
                variant === "primary" ? "bg-primary" : "bg-secondary"
              } rounded-md`}
              style={{ clipPath: "polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)" }}
            />
            
            {/* Circular pulse */}
            <div
              className={`absolute inset-0 border-4 ${
                variant === "primary" ? "border-primary/30" : "border-secondary/30"
              } rounded-full animate-ping`}
              style={{ animationDuration: "2s" }}
            />
            
            {/* Inner circle */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                variant === "primary" ? "bg-primary" : "bg-secondary"
              } rounded-full w-1/3 h-1/3`}
            />
          </div>
        );
    }
  };

  // If fullPage is true, render the loader centered on the page
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
        {renderLoader()}
        {text && (
          <p className={`mt-6 font-medium ${colorClasses[variant]}`}>{text}</p>
        )}
      </div>
    );
  }

  // Regular loader with optional text
  return (
    <div className="flex flex-col items-center justify-center py-6">
      {renderLoader()}
      {text && (
        <p className={`mt-4 font-medium ${colorClasses[variant]}`}>{text}</p>
      )}
    </div>
  );
};

export const FullPageLoader: React.FC<Omit<LoaderProps, "fullPage">> = (props) => {
  return <Loader {...props} fullPage={true} />;
};

export default Loader; 