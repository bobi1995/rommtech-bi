import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import ItemPage from "../pages/ItemPage";
import OrderStatusPage from "../pages/OrderPage/OrderStatusPage";
import EmployeesPage from "../pages/EmployeesPage";
import ExitPage from "../pages/ExitPage";
import LoginPage from "../pages/LoginPage";
import OnTimePage from "../pages/OnTimePage";
const AppLayout = () => {
  return (
    <div className="flex ">
      <div>
        <MenuBar />
      </div>
      <div className="m-auto mt-5 w-full ml-64">
        <Outlet />
      </div>
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
        path: "/order",
        children: [
          {
            path: "status",
            element: <OrderStatusPage />,
            index: true,
          },
          {
            path: "ontime",
            element: <OnTimePage />,
          },
        ],
      },
      {
        path: "/emp",
        element: <EmployeesPage />,
      },
    ],
  },
]);
const router = () => <RouterProvider router={mainRouter} />;
export default router;
