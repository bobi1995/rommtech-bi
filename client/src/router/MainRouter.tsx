import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import OrderPage from "../pages/OrderPage";

const AppLayout = () => {
  return (
    <div className="flex ">
      <div>
        <MenuBar />
      </div>
      <div className="m-auto mt-5 w-full">
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
        path: "/",
        element: <OrderPage />,
      },
    ],
  },
]);
const router = () => <RouterProvider router={mainRouter} />;
export default router;
