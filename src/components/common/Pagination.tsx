import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Current page range with neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pages.push("ellipsis-start");
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      } else {
        pages.push(i);
      }
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Remove duplicates
    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 rounded-md border text-sm font-medium transition-colors
            ${currentPage === 1 
              ? "border-gray-200 text-gray-400 cursor-not-allowed" 
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex space-x-2">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span 
                  key={`ellipsis-${index}`} 
                  className="flex items-center justify-center w-10 h-10 rounded-md text-gray-500"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </span>
              );
            }
            
            const isActive = page === currentPage;
            
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-secondary text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                aria-label={`Page ${page}`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 rounded-md border text-sm font-medium transition-colors
            ${currentPage === totalPages 
              ? "border-gray-200 text-gray-400 cursor-not-allowed" 
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 