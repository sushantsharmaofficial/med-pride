"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  value: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

interface TabContentProps {
  value: string;
  activeTab: string;
  className?: string;
  children: React.ReactNode;
}

export const Tabs = ({ children, className }: TabsProps) => {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="flex space-x-1 border-b border-gray-200">{children}</div>
    </div>
  );
};

export const Tab = ({
  label,
  active,
  onClick,
  className,
}: Omit<TabProps, "value">) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-all duration-200",
        "border-b-2 -mb-px",
        active
          ? "border-secondary text-secondary"
          : "border-transparent text-gray-500 hover:text-primary hover:border-primary/30",
        className
      )}
    >
      {label}
    </button>
  );
};

export const TabContent = ({
  value,
  activeTab,
  children,
  className,
}: TabContentProps) => {
  return activeTab === value ? (
    <div className={cn("py-4", className)}>{children}</div>
  ) : null;
};

export const TabsContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>;
};
