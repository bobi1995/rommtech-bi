import React, { useState } from "react";
interface TableRowProps {
  field: string;
  value: string | number;
}
const RowComponent = ({ row }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Order details */}
      <div onClick={openModal} className="cursor-pointer text-blue-500">
        Отвори
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-md mx-auto my-6">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-8">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal content */}
              <h2 className="text-2xl font-semibold mb-4">Детайли</h2>
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-800">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="border border-gray-600 px-4 py-2">Поле</th>
                      <th className="border border-gray-600 px-4 py-2">
                        Стойност
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow field="Име Служител" value={row.EmpName} />
                    <TableRow field="Ед. цена операция" value={row.UCpM} />
                    <TableRow field="Ед. цена минута" value={row.UCfO} />
                    <TableRow field="Тип труд" value={row.LaborType} />
                    <TableRow field="Описание оп." value={row.OpDesc} />
                    <TableRow field="Скрап" value={row.Scrap} />
                    <TableRow field="Скрап Код" value={row.ScrapCode} />
                    <TableRow field="Дефект" value={row.Defect} />
                    <TableRow field="Дефект Код" value={row.DefectCode} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TableRow: React.FC<TableRowProps> = ({ field, value }) => {
  return (
    <tr>
      <td className="border border-gray-600 px-4 py-2">{field}</td>
      <td className="border border-gray-600 px-4 py-2">{value}</td>
    </tr>
  );
};

export default RowComponent;
