import { useState } from "react";
import { getLogin } from "../db/hooks/auth";
import Loader from "../components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import { useAuth } from "../context/AuthContext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { showBoundary } = useErrorBoundary();
  const { setAuthInfo, token } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await getLogin(username, password);
      if (response.response && response.response.status === 401) {
        throw new Error("Грешен потребител или парола");
      }
      localStorage.setItem("user", response.username);
      localStorage.setItem("token", response.token);
      localStorage.setItem("access", response.access);
      setAuthInfo(response.token, response.username, response.access);
    } catch (error) {
      console.log(error);
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {token ? (
        <div>Добре дошъл, {localStorage.getItem("user")}</div>
      ) : (
        <>
          <div className="text-4xl font-bold text-gray-800 mb-4">Влез</div>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm"
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Потребител
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Парола
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Влез
              </button>
            </div>
          </form>
        </>
      )}
      {loading ? <Loader loading={loading} /> : null}
    </div>
  );
};

export default LoginPage;
