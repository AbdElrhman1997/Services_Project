import React from "react";

export const CardSceleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 Skeleton */}
      <div className="card shadow-xl rounded-2xl relative overflow-hidden animate-pulse">
        <div className="w-full h-60 bg-gray-300 rounded-t-2xl"></div>
        <div className="px-6 py-4">
          <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-2/3"></div>
        </div>
        <div className="px-6 py-4">
          <div className="h-10 bg-gray-300 rounded-full w-full"></div>
        </div>
      </div>

      {/* Card 2 Skeleton */}
      <div className="card shadow-xl rounded-2xl relative overflow-hidden animate-pulse">
        <div className="w-full h-60 bg-gray-300 rounded-t-2xl"></div>
        <div className="px-6 py-4">
          <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-2/3"></div>
        </div>
        <div className="px-6 py-4">
          <div className="h-10 bg-gray-300 rounded-full w-full"></div>
        </div>
      </div>

      {/* Card 3 Skeleton */}
      <div className="card shadow-xl rounded-2xl relative overflow-hidden animate-pulse">
        <div className="w-full h-60 bg-gray-300 rounded-t-2xl"></div>
        <div className="px-6 py-4">
          <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded-md mb-4 w-2/3"></div>
        </div>
        <div className="px-6 py-4">
          <div className="h-10 bg-gray-300 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};
