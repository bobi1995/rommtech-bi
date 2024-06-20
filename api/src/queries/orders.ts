export const getOrderQuantities = (order?: string) => {
  return `  SELECT 
  CLR.[Operation No_] as OpNo,
  CLR.Produced,
  R.[Description],
  ITEM.Description as ItemDesc,
  ITEM.Quantity as FinalQuantity
FROM 
  (
     SELECT 
	MAIN.[Production Order No_],
	MAIN.[Routing No_],
     MAIN.[Operation No_],
	 SUM(QUANTITY.Quantity) as Produced
  FROM [BG1000].[dbo].[ISS Original$Operation] MAIN
  JOIN [BG1000].[dbo].[ISS Original$Operation Quantity] QUANTITY on MAIN.[Entry No_] = QUANTITY.[Entry No_]
  where [Production Order No_] = N'${order}'
  group by MAIN.[Operation No_], [Routing No_],[Production Order No_]
  ) CLR
JOIN 
  [BG1000].[dbo].[ISS Original$Routing Line] R
ON 
  CLR.[Routing No_] = R.[Routing No_]
  AND CLR.[Operation No_] = R.[Operation No_]
LEFT JOIN 
  [BG1000].[dbo].[ISS Original$Production Order] ITEM
ON
  CLR.[Routing No_] = ITEM.[Routing No_] and CLR.[Production Order No_]=ITEM.[No_]`;
};
