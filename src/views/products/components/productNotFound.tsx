import Link from 'next/link'
import React from 'react'

export default function productNotFound() {
  return (
    <div className="min-h-auto  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          {/* Medical equipment illustration */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Medical error illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Error folder */}
                <div className="w-32 h-24 bg-gray-200 rounded-lg mx-auto"></div>
                <div className="w-16 h-6 bg-gray-300 rounded-t-lg absolute -top-6 left-1/2 transform -translate-x-1/2"></div>

                {/* Red cross */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 relative">
                    <div className="w-16 h-4 bg-red-500 rounded-full absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                    <div className="w-4 h-16 bg-red-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>

                {/* Pulse animation */}
                <div
                  className="absolute inset-0 border-4 border-secondary/20 rounded-full animate-ping"
                  style={{ animationDuration: "3s" }}
                ></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-secondary font-bold text-primary mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The product you are looking for does not exist or has been removed
            from our catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 bg-secondary text-white rounded-lg hover:bg-primary transition-colors shadow-sm gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Browse All Products
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
  )
}
