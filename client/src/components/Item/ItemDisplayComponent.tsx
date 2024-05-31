import { useState } from "react";
import FilterComponent from "./FilterComponent";
import TableComponent from "./TableComponent";
const ItemDisplayComponent = ({ data }: any) => {
  const [filtered, setFiltered] = useState(data);

  return (
    <div>
      <FilterComponent setFiltered={setFiltered} orders={data} />
      <TableComponent data={filtered} orders={data} />
    </div>
  );
};

export default ItemDisplayComponent;
