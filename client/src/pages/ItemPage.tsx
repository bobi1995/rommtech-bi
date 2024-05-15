import { useState, useRef, FormEvent } from "react";
import { getItemById } from "../db/hooks/item";
import Loader from "../components/Loader";
import ErrorModal from "../components/Error";
import ItemDisplayComponent from "../components/Item/ItemDisplayComponent";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const itemRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getItemById(itemRef.current?.value);
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
      <form onSubmit={fetchData}>
        <div>
          <div className="mb-4 text-center">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 mr-5"
              htmlFor="item"
            >
              Артикул
            </label>
            <input
              className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="item"
              type="text"
              placeholder="Артикул номер..."
              ref={itemRef}
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
          <ItemDisplayComponent data={orders.flat()} />
        </>
      ) : null}
    </div>
  );
};

export default OrderPage;
