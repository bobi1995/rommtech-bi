export const getItemById = (itemId?: string) => `select
[orders].[Routing No_] as Routing
,[orders].[Posting Date] as InvoicedDate
,[orders].[Document No_] as OrderNo
,[orders].[Item No_] as ItemNo  
,[orders].[No_] as EmpNo
,[orders].[Description] as EmpName
,[orders].[Operation No_] as OpNo
,[orders].[Global Dimension 1 Code] as CC_code   
,[orders].[Invoiced Quantity] as InvQuantity
,[orders].[Output Quantity] as OutputQuantity
, CASE 
 WHEN [orders].[Output Quantity] <> 0 THEN [orders].[Invoiced Quantity] / [orders].[Output Quantity] 
 ELSE 0 
 END AS ProductionTime
,[orders].[Unit Cost per Minute] as UCpM
,[orders].[Unit Cost for Operation] UCfO
,[orders].[Labor Type] as LaborType
,[orders].[Defect Quantity] as Defect
,[orders].[Defect Code] as DefectCode
,[orders].[Scrap Quantity] as Scrap
,[orders].[Scrap Code] as ScrapCode
,[item].[Description]
,[item].[Description 2] as Description2
,routing.[Description] AS OpDesc
,routing.[Run Time] AS RunTime
,CASE 
  WHEN routing.[Run Time] <> 0 and [Output Quantity] <>0 THEN ([Invoiced Quantity] / [Output Quantity] ) / routing.[Run Time]
  ELSE 0 
END AS Coef
FROM [BG1000].[dbo].[ISS Original$Capacity Ledger Entry] orders
LEFT JOIN [BG1000].[dbo].[ISS Original$Item] item on orders.[Item No_]=item.No_
LEFT JOIN [BG1000].[dbo].[ISS Original$Routing Line] routing ON orders.[Routing No_] = routing.[Routing No_] AND orders.[Operation No_] = routing.[Operation No_]
where  [Item No_]=N'${itemId}' 
order by [Posting Date] desc
`;
