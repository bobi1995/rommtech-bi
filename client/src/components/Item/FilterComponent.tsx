import { useState, useRef, FormEvent } from "react";

const FilterComponent = ({
  orders,
  setFiltered,
}: {
  orders: any[];
  setFiltered: any;
}) => {
  const orderRef = useRef<HTMLInputElement>(null);
  const invoicedDateFromRef = useRef<HTMLInputElement>(null); // Ref for start date
  const invoicedDateToRef = useRef<HTMLInputElement>(null); // Ref for end date
  const opRef = useRef<HTMLInputElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const getUniqueValuesForKey = (array: any[]) => {
    const uniqueValues: { [key: string]: any } = {};

    array.forEach((item: any) => {
      if (!(item["EmpNo"] in uniqueValues)) {
        uniqueValues[item["EmpNo"]] = item["EmpName"];
      }
    });

    const result = Object.keys(uniqueValues).map((empNo) => ({
      EmpNo: empNo,
      EmpName: uniqueValues[empNo],
    }));

    return result;
  };

  const uniqueEmployees = getUniqueValuesForKey(orders);
  console.log(uniqueEmployees);

  const filterOrders = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = orderRef.current?.value;
    const invoicedDateFrom = invoicedDateFromRef.current?.value;
    const invoicedDateTo = invoicedDateToRef.current?.value;
    const opno = opRef.current?.value;
    let filteredOrders = orders;

    if (
      order ||
      invoicedDateFrom ||
      invoicedDateTo ||
      opno ||
      selectedEmployee
    ) {
      if (order) {
        filteredOrders = filteredOrders.filter((row: any) =>
          row.OrderNo.includes(order.toUpperCase())
        );
      }
      if (invoicedDateFrom && invoicedDateTo) {
        filteredOrders = filteredOrders.filter((row: any) => {
          const invoicedDate = new Date(row.InvoicedDate);
          const fromDate = new Date(invoicedDateFrom);
          const toDate = new Date(invoicedDateTo);
          return invoicedDate >= fromDate && invoicedDate <= toDate;
        });
      }
      if (opno) {
        filteredOrders = filteredOrders.filter((row: any) => row.OpNo === opno);
      }
      if (selectedEmployee) {
        filteredOrders = filteredOrders.filter(
          (row: any) => row.EmpNo === selectedEmployee
        );
      }

      return setFiltered(filteredOrders);
    }
  };

  const handleEmployeeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEmployee(event.target.value);
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
            htmlFor="dateFrom"
          >
            Осчетоводяване От
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateFrom"
            type="date"
            ref={invoicedDateFromRef}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateTo"
          >
            Осчетоводяване До
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateTo"
            type="date"
            ref={invoicedDateToRef}
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
            htmlFor="opno"
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
        <div className="mb-4 text-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 mr-5"
            htmlFor="item"
          >
            Служител
          </label>
          <select
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="employee"
            onChange={handleEmployeeSelect}
            value={selectedEmployee}
          >
            <option value="">Избери служител</option>
            {uniqueEmployees.map((employee, index) => (
              <option key={index} value={employee.EmpNo}>
                {employee.EmpNo} / {employee.EmpName}
              </option>
            ))}
          </select>
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
              if (invoicedDateFromRef.current)
                invoicedDateFromRef.current.value = "";
              if (invoicedDateToRef.current)
                invoicedDateToRef.current.value = "";
              if (opRef.current) opRef.current.value = "";
              if (selectedEmployee) setSelectedEmployee("");

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

export default FilterComponent;
