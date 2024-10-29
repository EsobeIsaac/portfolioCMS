import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className="animate-pulse flex gap-4 items-center">
          <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
          <div className="bg-gray-200 h-16 flex-grow"></div>
        </div>
        <div className="animate-pulse flex gap-4 items-center">
          <div className="bg-gray-200 h-16 w-16"></div>
          <div className="bg-gray-200 h-16 flex-grow "></div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className="animate-pulse flex gap-4 items-center">
          <div className="bg-gray-200 h-16 w-16 rounded-full"></div>
          <div className="bg-gray-200 h-16 flex-grow"></div>
        </div>
        <div className="animate-pulse flex gap-4 items-center">
          <div className="bg-gray-200 h-16 w-16"></div>
          <div className="bg-gray-200 h-16 flex-grow "></div>
        </div>
      </div>

    </div>
  );
};

export default LoadingSkeleton;
