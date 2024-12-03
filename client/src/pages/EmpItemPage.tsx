import { useState, FormEvent, useEffect } from "react";
import { getAllEmployees, getEmpItems } from "../db/hooks/employee";
import Loader from "../components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import TableEmpItem from "./EmpItemPage/TableEmpItem";
import Select from "react-select";

interface Item {
  PrdOrder: string;
  InvoicedDate: string;
  OpNo: string;
  ItemDesc: string;
  ItemNumber: string;
  OpDesc: string;
  OpTime: number;
  Coef: number;
  Reached: number;
  setTime: number;
}

const filterOrders = (
  items: Item[],
  order: string,
  from: string,
  due: string,
  opNo: string,
  itemDesc: string
): Item[] => {
  let filteredOrders = items;

  if (order || from || due || opNo || itemDesc) {
    if (itemDesc) {
      filteredOrders = filteredOrders.filter((row: any) =>
        row.ItemDesc.toUpperCase().includes(itemDesc.toUpperCase())
      );
    }
    if (order) {
      filteredOrders = filteredOrders.filter((row: any) =>
        row.PrdOrder.includes(order.toUpperCase())
      );
    }

    if (from && due) {
      filteredOrders = filteredOrders.filter((row: any) => {
        const invoicedDate = new Date(row.InvoicedDate);
        const fromDate = new Date(from);
        const toDate = new Date(due);
        return invoicedDate >= fromDate && invoicedDate <= toDate;
      });
    }
    if (opNo) {
      filteredOrders = filteredOrders.filter(
        (row: any) => row.OpNo.toUpperCase() === opNo.toUpperCase()
      );
    }
  }
  return filteredOrders;
};

const EmpItemPage = () => {
  const { showBoundary } = useErrorBoundary();

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [employees, setEmployees] = useState<{ Name: string; No_: string }[]>(
    []
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [filtered, setFiltered] = useState<Item[]>([]);

  //filter props
  const [order, setOrder] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [due, setDue] = useState<string>("");
  const [opNo, setOpNo] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getAllEmployees();
        if (employeeData.response && employeeData.response.status === 401) {
          showBoundary(new Error("Неуторизиран достъп"));
          return;
        }
        setEmployees(employeeData.flat());
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const results = filterOrders(items, order, from, due, opNo, itemName);
    setFiltered(results);
  }, [from, due, order, opNo, itemName]);

  const handleEmployeeSelect = (selectedOption: any) => {
    setSelectedEmployee(selectedOption ? selectedOption.value : "");
  };

  const fetchData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setOrder("");
    setDue("");
    setFrom("");
    setOpNo("");
    setItemName("");

    try {
      const response = await getEmpItems(selectedEmployee);
      setItems(response.flat());
      setFiltered(response.flat());
    } catch (error) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };

  const employeeOptions = employees.map((employee) => ({
    value: employee.No_,
    label: `${employee.No_} / ${employee.Name}`,
  }));

  const selectedOption = employeeOptions.find(
    (option) => option.value === selectedEmployee
  );

  return (
    <div>
      {loading ? <Loader loading={loading} /> : null}

      <form onSubmit={fetchData}>
        <div>
          <div className="mb-4 text-center">
            <label
              className="block text-gray-700 text-lg font-bold mb-2 mr-5"
              htmlFor="item"
            >
              Служител
            </label>
            <Select
              className="w-96 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-auto"
              id="employee"
              onChange={handleEmployeeSelect}
              value={selectedOption}
              options={employeeOptions}
              placeholder="Избери служител"
              isClearable
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

      {items && items.length > 0 ? (
        <>
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
                onChange={(e) => setFrom(e.target.value)}
                value={from}
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
                onChange={(e) => setDue(e.target.value)}
                value={due}
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
                onChange={(e) => setOrder(e.target.value)}
                value={order}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="order"
              >
                Изделие
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="order"
                type="text"
                placeholder="Изделие име..."
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
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
                value={opNo}
                onChange={(e) => setOpNo(e.target.value)}
              />
            </div>
          </div>
          <TableEmpItem data={filtered} />
        </>
      ) : null}
    </div>
  );
};

export default EmpItemPage;
