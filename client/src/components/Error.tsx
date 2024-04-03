import React, { useState } from "react";

const ErrorModal = ({ error }: { error: string }) => {
  const [open, setOpen] = useState(true);
  return open ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg relative">
        <div className="absolute top-0 right-0">
          <button className="px-3 py-2 text-gray-700 hover:text-gray-900 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    </div>
  ) : null;
};

export default ErrorModal;
