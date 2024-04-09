export const getItemById = (itemId?: string) => `SELECT
[orders].[Posting Date] as InvoicedDate
,[orders].[Document No_] as OrderNo
  ,[orders].[Item No_] as ItemNo  
  ,[item].[Description]
	  ,[item].[Description 2] as Description2
  ,[orders].[No_] as EmpNo
  ,[orders].[Description] as EmpName
  ,[orders].[Operation No_] as OpNo
,[orders].[Global Dimension 1 Code] as CC_code   
,[orders].[Invoiced Quantity] as InvQuantity
,[orders].[Output Quantity] as OutputQuantity
,CASE 
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
,routes.Description as OpDesc
,routes.[Run Time] as RunTime
,CASE 
  WHEN routes.[Run Time] <> 0 and [Output Quantity] <>0 THEN ([Invoiced Quantity] / [Output Quantity] ) / routes.[Run Time]
  ELSE 0 
END AS Coef
FROM (
SELECT 
 [Routing No_]
 ,[Version Code]
 ,[Operation No_]
 ,[Description]
 ,[Run Time]
 ,[Unit Cost per]
 ,[Unit Cost for Operation]
 ,[Labor Type]
FROM [BG1000].[dbo].[ISS Original$Routing Line]
WHERE [Routing No_] = (
 SELECT TOP 1 [Routing No_]
 FROM [BG1000].[dbo].[ISS Original$Capacity Ledger Entry]
 WHERE  [Item No_]=N'${itemId}'
)
) routes
JOIN [BG1000].[dbo].[ISS Original$Capacity Ledger Entry] orders ON routes.[Operation No_] = orders.[Operation No_]
LEFT JOIN [BG1000].[dbo].[ISS Original$Item] item on orders.[Item No_]=item.No_
WHERE orders.[Item No_]=N'${itemId}'
order by [Posting Date] desc
`;
