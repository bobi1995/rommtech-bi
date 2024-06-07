import { useState, FormEvent } from "react";
import { getMappedValue, mapping } from "../../components/access";
import { createUser } from "../../db/hooks/auth";
import { useErrorBoundary } from "react-error-boundary";
const AddUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedModules, setSelectedModules] = useState<number[]>([]);
  const { showBoundary } = useErrorBoundary();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(
      "Username:",
      username,
      "Password:",
      password,
      "modules",
      selectedModules
    );
    try {
      await createUser(username, password, selectedModules.join(","));
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
        className=" bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Добави
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
                    Добави Потребител
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
                        <label className="block text-m font-medium text-gray-700">
                          Парола
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-m font-medium text-gray-700 mt-5 mb-3">
                          Достъп
                        </label>{" "}
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

export default AddUser;
