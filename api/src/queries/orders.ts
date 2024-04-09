export const getOrderQuantities = (order?: string) => {
  return `SELECT 
  CLR.[Operation No_] as OpNo,
  CLR.Produced,
  R.[Description]
FROM 
  (
      SELECT  
          [Operation No_],
          SUM([Output Quantity]) as Produced,
          [Routing No_]
      FROM 
          [BG1000].[dbo].[ISS Original$Capacity Ledger Entry]
      WHERE 
          [Document No_] = N'${order}'
      GROUP BY 
          [Operation No_], [Routing No_]
  ) CLR
JOIN 
  [BG1000].[dbo].[ISS Original$Routing Line] R
ON 
  CLR.[Routing No_] = R.[Routing No_]
  AND CLR.[Operation No_] = R.[Operation No_];
`;
};
