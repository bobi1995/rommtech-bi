import { useState, useRef, FormEvent } from "react";
import { getOrderById } from "../db/hooks";
import OrderTable from "./OrderPage/OrderTable";
import Loader from "../components/Loader";
import ErrorModal from "../components/Error";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const orderRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getOrderById(
        orderRef.current?.value,
        dateRef.current?.value,
        itemRef.current?.value
      );
      setOrders(response);
    } catch (error) {
      console.log(error);
      setError("Възникна грешка, моля рестартирайте системата.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {loading ? <Loader loading={loading} /> : null}
      {error ? <ErrorModal error={error} /> : null}
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-5 ml-5 mr-5"
        onSubmit={fetchData}
      >
        <div className="flex justify-around">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Осчетоводяване
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              ref={dateRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="order"
            >
              Поръчка
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="order"
              type="text"
              placeholder="Поръчка номер..."
              ref={orderRef}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="item"
            >
              Артикул
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="item"
              type="text"
              placeholder="Артикул номер..."
              ref={itemRef}
            />
          </div>
        </div>
        <div className="text-center">
          <input
            type="submit"
            value="Търси"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
      {orders && orders.length > 0 ? <OrderTable data={orders.flat()} /> : null}
    </div>
  );
};

export default OrderPage;
