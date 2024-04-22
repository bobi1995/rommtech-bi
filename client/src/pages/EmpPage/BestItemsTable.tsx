import numeral from "numeral";
import BestChart from "./BestChart";

const BestItemsTable = ({ data, title, type }: any) => {
  if (!data || data.length === 0) {
    return <div>Няма данни.</div>;
  }
  console.log(data);
  return (
    <div className="mt-10">
      <h2 className="text-center font-bold text-lg">{title}</h2>
      <div className="flex justify-around">
        <div className="w-6/12 flex justify-center items-center">
          <table className="table-auto border-collapse border border-gray-800 text-xs m-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-600 px-4 py-2">Артикул</th>
                <th className="border border-gray-600 px-4 py-2">Оп.</th>

                <th className="border border-gray-600 px-4 py-2">Описание</th>
                <th className="border border-gray-600 px-4 py-2">Описание 2</th>

                <th className="border border-gray-600 px-4 py-2">
                  Средно прод. време
                </th>
                <th className="border border-gray-600 px-4 py-2">
                  Средна норма
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any) => (
                <tr key={row.ItemNo}>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.ItemNo}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.OpNo}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.Description}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {row.Description2}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.AverageProductionTime).format("0,0.00")}
                  </td>
                  <td className="border border-gray-600 px-4 py-2">
                    {numeral(row.AverageCoef * 100).format("0,0")}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <BestChart data={data} type={type} />
        </div>
      </div>
    </div>
  );
};

export default BestItemsTable;
