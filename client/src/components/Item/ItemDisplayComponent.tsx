import { useState } from "react";
import FilterComponent from "./FilterComponent";
import TableComponent from "./TableComponent";
const ItemDisplayComponent = ({ data }: any) => {
  const [orders, setOrders] = useState(data);
  const [filtered, setFiltered] = useState(data);

  return (
    <div>
      <FilterComponent setFiltered={setFiltered} orders={orders} />
      <TableComponent data={filtered} orders={orders} />
    </div>
  );
};

export default ItemDisplayComponent;
