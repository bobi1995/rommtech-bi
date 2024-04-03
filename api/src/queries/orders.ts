export const getOrderById = (
  order?: string,
  selectedDate?: string,
  item?: string
) => {
  return `SELECT
  [orders].[Document Date] as InvoiceDate
  ,[orders].[Document No_] as OrderNo
  ,[orders].[Item No_] as ItemNo  
  ,[orders].[No_] as EmpNo
  ,[orders].[Description] as EmpName
  ,[orders].[Operation No_] as OpNo
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
  ,[Global Dimension 1 Code] as CCcode
  ,routes.Description as OpDesc
  ,routes.[Run Time] as RunTime
  ,CASE 
    WHEN routes.[Run Time] <> 0 and [Output Quantity] <>0 THEN ([Invoiced Quantity] / [Output Quantity] ) / routes.[Run Time]
    ELSE 0 
  END AS Coef
  FROM (
  SELECT TOP (1000) 
   [Routing No_]
   ,[Version Code]
   ,[Operation No_]
   ,[Description]
   ,[Run Time]
   ,[Unit Cost per]
   ,[Unit Cost for Operation]
   ,[Labor Type]
  FROM [BG1000].[dbo].[Copy_ISS250324$Routing Line]
  WHERE [Routing No_] = (
   SELECT TOP 1 [Routing No_]
   FROM [BG1000].[dbo].[Copy_ISS250324$Capacity Ledger Entry]
   WHERE [Document No_] = N'${order}'
  )
  ) routes
  JOIN [BG1000].[dbo].[Copy_ISS250324$Capacity Ledger Entry] orders
  ON routes.[Operation No_] = orders.[Operation No_]
  WHERE orders.[Document No_] = N'${order}' ${
    selectedDate ? `and [Document Date]=N'${selectedDate}'` : ""
  }`;
};
