import { useState, FormEvent } from "react";
import { getMappedValue, mapping } from "../../components/access";
import { updateUser } from "../../db/hooks/auth";
import { useErrorBoundary } from "react-error-boundary";
import { UserInterface } from "../../db/interface/user";

const EditUser = ({ user }: { user: UserInterface }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [selectedModules, setSelectedModules] = useState<number[]>(
    user.access.split(",").map((el) => parseInt(el))
  );
  const { showBoundary } = useErrorBoundary();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(user.id.toString(), username, selectedModules.join(","));
      window.location.reload();
    } catch (error) {
      showBoundary(error);
    }
    setShowModal(false);
  };

  const handleModuleChange = (value: number) => {
    if (selectedModules.includes(value)) {
      setSelectedModules(selectedModules.filter((module) => module !== value));
    } else {
      setSelectedModules([...selectedModules, value]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center "
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
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {showModal && (
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
                    Редактирай Потребител
                  </h3>
                  <div className="mt-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-m font-medium text-gray-700">
                          Потребителско име
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-m font-medium text-gray-700 mt-5 mb-3">
                          Достъп
                        </label>
                        {Object.keys(mapping).map((key) => (
                          <label
                            key={key}
                            className="inline-flex items-center mr-5"
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600"
                              value={key}
                              onChange={() => handleModuleChange(parseInt(key))}
                              checked={selectedModules.includes(parseInt(key))}
                            />
                            <span className="ml-2 text-gray-700">
                              {getMappedValue(parseInt(key))}
                            </span>
                          </label>
                        ))}
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
                          onClick={() => setShowModal(false)}
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

export default EditUser;
