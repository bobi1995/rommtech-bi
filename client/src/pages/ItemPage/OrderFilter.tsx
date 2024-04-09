import { useRef, FormEvent } from "react";
import moment from "moment";

const OrderFilter = ({
  orders,
  setFiltered,
}: {
  orders: any[];
  setFiltered: any;
}) => {
  const orderRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const opRef = useRef<HTMLInputElement>(null);
  const empRef = useRef<HTMLInputElement>(null);

  const filterOrders = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = orderRef.current?.value;
    const invoicedDate = dateRef.current?.value;
    const opno = opRef.current?.value;
    const emp = empRef.current?.value;
    let filteredOrders = orders;
    if (order || invoicedDate || opno || emp) {
      if (order) {
        filteredOrders = filteredOrders.filter((row: any) =>
          row.OrderNo.includes(order)
        );
      }
      if (invoicedDate) {
        filteredOrders = filteredOrders.filter(
          (row: any) =>
            new Date(row.InvoicedDate).getTime() ===
            new Date(invoicedDate).getTime()
        );
      }
      if (opno) {
        filteredOrders = filteredOrders.filter((row: any) => row.OpNo === opno);
      }
      if (emp) {
        filteredOrders = filteredOrders.filter((row: any) => row.EmpNo === emp);
      }

      return setFiltered(filteredOrders);
    }
  };
  return (
    <form
      className="bg-white rounded px-8 pt-6 pb-8 mb-4 mt-5 ml-5 mr-5  border-2 shadow-md"
      onSubmit={filterOrders}
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
            htmlFor="date"
          >
            Операция No
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="opno"
            type="text"
            placeholder="Операция номер..."
            ref={opRef}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Служител
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emp"
            type="text"
            placeholder="Служител номер..."
            ref={empRef}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center mr-1">
          <input
            type="submit"
            value="Филтрирай"
            className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
          />
        </div>
        <div className="text-center ml-1">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
            onClick={() => {
              if (orderRef.current) orderRef.current.value = "";
              if (dateRef.current) dateRef.current.value = "";
              if (opRef.current) opRef.current.value = "";
              if (empRef.current) empRef.current.value = "";

              setFiltered(orders);
            }}
          >
            Изчисти
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderFilter;
