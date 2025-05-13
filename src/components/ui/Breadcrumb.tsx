import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <div className={`bg-white border-b border-gray-100 ${className}`}>
      <div className="container mx-auto px-4 py-3 flex justify-start">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex flex-wrap items-center justify-center text-sm">
            {items.map((item, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-2" />
                )}
                
                {item.isCurrent ? (
                  <span 
                    className="text-secondary font-medium truncate max-w-xs"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-500">
                      {item.label}
                    </span>
                  )
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb; 