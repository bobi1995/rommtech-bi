import moment from "moment";
import numeral from "numeral";
import PaginationBar from "../../components/PagginationBar";

import { useState } from "react";

const TableEmpItem = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <div>Няма данни.</div>;
  }

  const [sortedColumn, setSortedColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.flat().length);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  const handleSort = (columnName: string) => {
    console.log(columnName);
    if (columnName === sortedColumn) {
      toggleSortDirection();
    } else {
      setSortedColumn(columnName);
      setSortDirection("desc");
    }
  };

  const renderArrow = (columnName: string) => {
    if (columnName === sortedColumn) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const sortedData = data.slice().sort((a: any, b: any) => {
    let x = a[sortedColumn];
    let y = b[sortedColumn];
    if (sortedColumn === "InvoicedDate") {
      x = moment(a[sortedColumn]).unix();
      y = moment(b[sortedColumn]).unix();
    }
    if (sortedColumn === "OpNo") {
      // Check if x and y are numeric
      const xIsNumeric = !isNaN(parseFloat(x));
      const yIsNumeric = !isNaN(parseFloat(y));

      if (xIsNumeric && yIsNumeric) {
        x = parseFloat(x);
        y = parseFloat(y);
        return sortDirection === "asc" ? x - y : y - x;
      } else if (xIsNumeric && !yIsNumeric) {
        return sortDirection === "asc" ? -1 : 1; // Numeric values come before strings in ascending order
      } else if (!xIsNumeric && yIsNumeric) {
        return sortDirection === "asc" ? 1 : -1; // Strings come after numeric values in ascending order
      } else {
        return 0; // If both are strings, they are considered equal
      }
    }
    if (sortDirection === "asc") {
      return x - y;
    } else {
      return y - x;
    }
  });

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table-auto border-collapse border border-gray-800 text-xs m-auto">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th
                className="bg-gray-500 border border-gray-600 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("InvoicedDate")}
              >
                Дата {renderArrow("InvoicedDate")}
              </th>
              <th className="border border-gray-600 px-4 py-2">Поръчка</th>
              <th className="border border-gray-600 px-4 py-2">Изделие №</th>
              <th className="border border-gray-600 px-4 py-2">Изделие име</th>

              <th
                className="bg-gray-500 border border-gray-600 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("OpNo")}
              >
                Операция {renderArrow("OpNo")}
              </th>
              <th className="border border-gray-600 px-4 py-2">Описание Оп.</th>
              <th
                className="border border-gray-600 px-4 py-2"
                onClick={() => handleSort("InvQuantity")}
              >
                Оперативно време
              </th>
              <th
                className="border border-gray-600 px-4 py-2"
                onClick={() => handleSort("OutputQuantity")}
              >
                Количество продукция
              </th>
              <th className="border border-gray-600 px-4 py-2 ">Постигнато</th>
              <th className="border border-gray-600 px-4 py-2 ">Заложено</th>
              <th className="border border-gray-600 px-4 py-2 ">Норма</th>
            </tr>
          </thead>
          <tbody>
            {sortedData
              .slice(startIndex, endIndex)
              .map((row: any, index: any) => (
                <tr
                  key={index + row.PrdOrder + row.Coef}
                  className={
                    row.Coef < 0.8
                      ? "bg-orange-300"
                      : row.Coef > 1.2
                      ? "bg-red-500"
                      : ""
                  }
                >
                  <td className="border border-gray-600 px-4 py-2">
                    {moment.utc(row.InvoicedDate).format("DD-MM-YYYY HH:mm")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.PrdOrder}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.ItemNumber}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.ItemDesc}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.OpNo}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.OpDesc}
                  </td>

                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.OpTime).format("0,0")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.ProdQuantity).format("0,0")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.Reached).format("0,0.00")}
                  </td>

                  <td className="border border-gray-600 px-4 py-2">
                    {row.SetTime}
                  </td>

                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.Coef * 100).format("0,0")}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PaginationBar
        currentPage={page}
        totalPages={Math.ceil(data.flat().length / pageSize)}
        onPageChange={setPage}
      />
    </>
  );
};

export default TableEmpItem;
