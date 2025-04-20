"use client";

import React from "react";

export function Loader() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 dark:border-blue-900 animate-spin"></div>
        {/* Inner circle */}
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 dark:border-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Center dot */}
        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-75 flex items-center justify-center z-50">
      <Loader />
    </div>
  );
}
