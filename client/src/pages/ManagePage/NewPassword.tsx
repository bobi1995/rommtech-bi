import { useState, FormEvent } from "react";
import { updatePassword } from "../../db/hooks/auth";
import { useErrorBoundary } from "react-error-boundary";

const NewPassword = ({ id }: { id: string }) => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [newpass, setNewpass] = useState("");

  const { showBoundary } = useErrorBoundary();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updatePassword(id, newpass);
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
        className="inline-flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
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
                    Нова Парола
                  </h3>
                  <div className="mt-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-m font-medium text-gray-700">
                          Парола
                        </label>
                        <input
                          type="password"
                          value={newpass}
                          onChange={(e) => setNewpass(e.target.value)}
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="sm:flex sm:flex-row-reverse sm:space-x-reverse sm:space-x-3 justify-center">
                        <button
                          type="submit"
                          className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:text-sm"
                        >
                          Запази
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPassModal(false)}
                          className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:text-sm"
                        >
                          Затвори
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

export default NewPassword;
