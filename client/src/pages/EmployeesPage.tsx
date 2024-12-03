import { useState, FormEvent, useEffect } from "react";
import { getAverageItemTime, getAllEmployees } from "../db/hooks/employee";
import Loader from "../components/Loader";
import BestItemsTable from "./EmpPage/BestItemsTable";
import { useErrorBoundary } from "react-error-boundary";
import Select from "react-select";

const EmployeesPage = () => {
  const { showBoundary } = useErrorBoundary();

  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState<{ Name: string; No_: string }[]>(
    []
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

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

  const handleEmployeeSelect = (selectedOption: any) => {
    setSelectedEmployee(selectedOption ? selectedOption.value : "");
  };

  const fetchData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await getAverageItemTime(selectedEmployee);
      setItems(response);
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
        <div>
          <BestItemsTable
            data={items.flat().slice(0, 10)}
            title="Най-добри времена"
            type="best"
          />
          <BestItemsTable
            data={items.flat().slice(-10).reverse()}
            title="Най-лоши времена"
            type="worst"
          />
        </div>
      ) : null}
    </div>
  );
};

export default EmployeesPage;
