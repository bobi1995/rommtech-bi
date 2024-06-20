import numeral from "numeral";

const OrderStatusTable = ({ data }: any) => {
  if (!data || data.length === 0) {
    return <div>Няма данни.</div>;
  }
  return (
    <div className="overflow-x-auto mt-5">
      <div className="m-auto flex justify-center gap-16 mb-5 ">
        <p>
          Изделие: <b>{data[0].ItemDesc}</b>
        </p>
        <p>
          Количество на поръчката:<b>{data[0].FinalQuantity}</b>
        </p>
      </div>
      <table className="table-auto border-collapse border border-gray-800 text-xs m-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-600 px-4 py-2">Операция</th>

            <th className="border border-gray-600 px-4 py-2">Описание</th>
            <th className="border border-gray-600 px-4 py-2">Произведено</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: any) => (
            <tr key={index + row.OpNo}>
              <td className="border border-gray-600 px-4 py-2">{row.OpNo}</td>

              <td className="border border-gray-600 px-4 py-2">
                {row.Description}
              </td>

              <td className="border border-gray-600 px-4 py-2">
                {numeral(row.Produced).format("0,0")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatusTable;
