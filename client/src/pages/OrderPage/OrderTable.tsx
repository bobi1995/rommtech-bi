import moment from "moment";
import numeral from "numeral";
import OrderRow from "./OrderRow";

const OrderTable = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <div>Няма данни.</div>;
  }

  return (
    <div className="overflow-x-auto ">
      <table className="table-auto border-collapse border border-gray-800 text-xs m-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-600 px-4 py-2">Отвори</th>

            <th className="border border-gray-600 px-4 py-2">Осчетоводено</th>
            <th className="border border-gray-600 px-4 py-2">Поръчка</th>
            <th className="border border-gray-600 px-4 py-2">Артикул</th>
            <th className="border border-gray-600 px-4 py-2">Операция</th>
            <th className="border border-gray-600 px-4 py-2">Служител</th>
            <th className="border border-gray-600 px-4 py-2">
              Оперативно време
            </th>
            <th className="border border-gray-600 px-4 py-2">
              Количество продукция
            </th>
            <th className="border border-gray-600 px-4 py-2">
              Оп.време/кол.прод.
            </th>
            <th className="border border-gray-600 px-4 py-2">Описание Оп.</th>

            <th className="border border-gray-600 px-4 py-2">Оп.време</th>
            <th className="border border-gray-600 px-4 py-2">Коефициент</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: any) => (
            <tr key={index}>
              <td className="border border-gray-600 px-4 py-2">
                <OrderRow row={row} />
              </td>

              <td className="border border-gray-600 px-4 py-2">
                {moment.utc(row.InvoiceDate).format("DD-MM-YYYY HH:mm")}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {row.OrderNo}
              </td>
              <td className="border border-gray-600 px-4 py-2">{row.ItemNo}</td>
              <td className="border border-gray-600 px-4 py-2">{row.OpNo}</td>
              <td className="border border-gray-600 px-4 py-2">{row.EmpNo}</td>

              <td className="border border-gray-600 px-4 py-2">
                {numeral(row.InvQuantity).format("0,0.00")}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {numeral(row.OutputQuantity).format("0,0.00")}
              </td>
              <td className="border border-gray-600 px-4 py-2">
                {numeral(row.ProductionTime).format("0,0.00")}
              </td>

              <td className="border border-gray-600 px-4 py-2">{row.OpDesc}</td>
              <td className="border border-gray-600 px-4 py-2">
                {row.RunTime}
              </td>

              <td className="border border-gray-600 px-4 py-2">
                {numeral(row.Coef).format("0.00")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
