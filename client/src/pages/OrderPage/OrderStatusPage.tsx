import { useState, useRef, FormEvent } from "react";
import { getOrderQuantities } from "../../db/hooks/order";
import ErrorModal from "../../components/Error";
import Loader from "../../components/Loader";
import OrderStatusTable from "./OrderStatusPage/OrderStatusTable";

const OrderStatusPage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const orderRef = useRef<HTMLInputElement>(null);
  const [orders, setOrders] = useState([]);

  const fetchData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getOrderQuantities(orderRef.current?.value);
      setOrders(response);
    } catch (error) {
      setError("Възникна грешка, моля рестартирайте системата.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Loader loading={loading} /> : null}
      {error ? <ErrorModal error={error} /> : null}
      <form onSubmit={fetchData}>
        <div>
          <div className="mb-4 text-center">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 mr-5"
              htmlFor="item"
            >
              Поръчка
            </label>
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="item"
              type="text"
              placeholder="Поръчка номер..."
              ref={orderRef}
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Търси"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </form>

      {orders && orders.length > 0 ? (
        <>
          <OrderStatusTable data={orders.flat()} />
        </>
      ) : null}
    </div>
  );
};

export default OrderStatusPage;
