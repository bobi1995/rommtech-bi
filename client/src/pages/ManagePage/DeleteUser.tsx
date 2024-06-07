import { useState, FormEvent } from "react";
import { deleteUser } from "../../db/hooks/auth";
import { useErrorBoundary } from "react-error-boundary";

const DeleteUser = ({ id, username }: { id: string; username: string }) => {
  const [showPassModal, setShowPassModal] = useState(false);

  const { showBoundary } = useErrorBoundary();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await deleteUser(id);
      window.location.reload();
    } catch (error) {
      showBoundary(error);
    }
    setShowPassModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowPassModal(true)}
        className="inline-flex justify-center items-center bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
          <line x1="12" y1="2" x2="12" y2="12"></line>
        </svg>
      </button>

      {showPassModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Изтрий Потребител
                  </h3>
                  <div className="mt-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <p>
                        Сигурни ли сте, че искате да изтриете потребител{" "}
                        {username}
                      </p>
                      <div className="sm:flex sm:flex-row-reverse sm:space-x-reverse sm:space-x-3 justify-center">
                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:text-sm"
                        >
                          Да
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPassModal(false)}
                          className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:text-sm"
                        >
                          Не
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
