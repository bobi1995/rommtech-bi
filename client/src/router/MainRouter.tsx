import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import ItemPage from "../pages/ItemPage";
import OrderStatusPage from "../pages/OrderPage/OrderStatusPage";
import EmployeesPage from "../pages/EmployeesPage";
import ExitPage from "../pages/ExitPage";
import LoginPage from "../pages/LoginPage";
import EmpItemPage from "../pages/EmpItemPage";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import ManagePage from "../pages/ManagePage";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(error);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Възникна проблем!</h2>
        <pre className="text-red-500 mb-4">{error.message}</pre>
        <button
          onClick={resetErrorBoundary}
          className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Затвори
        </button>
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="flex ">
      <ErrorBoundary
        FallbackComponent={Fallback}
        onError={() => console.log("error happened")}
      >
        <div>
          <MenuBar />
        </div>
        <div className="m-auto mt-5 w-full ml-64">
          <Outlet />
        </div>
      </ErrorBoundary>
    </div>
  );
};

const mainRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/item",
        element: <ItemPage />,
      },
      {
        path: "/",
        element: <ItemPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <ExitPage />,
      },

      {
        path: "/emp",
        children: [
          {
            path: "time",
            element: <EmployeesPage />,
            index: true,
          },
          {
            path: "stats",
            element: <EmpItemPage />,
          },
        ],
      },
      {
        path: "/order",
        element: <OrderStatusPage />,
      },
      {
        path: "/manage",
        element: <ManagePage />,
      },
    ],
  },
]);
const router = () => <RouterProvider router={mainRouter} />;
export default router;
