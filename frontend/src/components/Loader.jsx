import React from 'react';

const Loader = ({ message = "Connecting to Server, Please Wait..." }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex flex-col items-center justify-center transition-opacity duration-300">
      <div className="w-12 h-12 border-[5px] border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3.5 text-xl text-gray-800">{message}</p>
    </div>
  );
};

export default Loader;