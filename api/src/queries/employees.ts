export const getAverageItemTime = (employee?: string) => `WITH Averages AS (
    SELECT 
        [orders].[Item No_] AS ItemNo,
        [item].[Description],
        [routes].[Operation No_] as OpNo,
        [item].[Description 2] AS Description2,
        AVG(CASE 
                WHEN [orders].[Output Quantity] <> 0 THEN [orders].[Invoiced Quantity] / [orders].[Output Quantity] 
                ELSE 0 
            END) AS AverageProductionTime,
        AVG(CASE 
                WHEN routes.[Run Time] <> 0 AND [Output Quantity] <> 0 THEN ([Invoiced Quantity] / [Output Quantity]) / routes.[Run Time]
                ELSE 0 
            END) AS AverageCoef
    FROM [BG1000].[dbo].[ISS Original$Capacity Ledger Entry] orders 
    LEFT JOIN (
        SELECT 
            [Operation No_],
            [Run Time]
        FROM [BG1000].[dbo].[ISS Original$Routing Line]
        WHERE [Routing No_] = (
            SELECT TOP 1 [Routing No_]
            FROM [BG1000].[dbo].[ISS Original$Capacity Ledger Entry]
            WHERE No_ = '${employee}'
        )
    ) routes ON routes.[Operation No_] = orders.[Operation No_]
    LEFT JOIN [BG1000].[dbo].[ISS Original$Item] item ON orders.[Item No_] = item.No_
    WHERE orders.[No_] = '${employee}'    AND CAST(orders.[Posting Date] AS DATE) > '2022-01-01' 
    GROUP BY [orders].[Item No_], [item].[Description], [item].[Description 2],[routes].[Operation No_]
)
SELECT *
FROM Averages
WHERE AverageCoef > 0 and AverageCoef<10
ORDER BY AverageCoef DESC;
`;

export const getAllEmployees = () => `select No_,Name
from [ISS Original$Machine Center]
where Blocked=0
order by No_;`;

export const getEmployeeProduction = (emp: string) => `select 
ORDERS.[Posting Date] as InvoicedDate
,ORDERS.[Document No_] as PrdOrder
,ORDERS.[Item No_] as ItemNumber
,ITEM.[Description] as ItemDesc
,ORDERS.[Operation No_] as OpNo
,ROUTING.[Description] as OpDesc
,ORDERS.[Invoiced Quantity] as OpTime
,ORDERS.[Output Quantity] as ProdQuantity
,CASE 
 WHEN ORDERS.[Output Quantity] <> 0 THEN ORDERS.[Invoiced Quantity] / ORDERS.[Output Quantity] 
 ELSE 0 
END AS Reached
,ROUTING.[Run Time] as SetTime
,CASE 
 WHEN ROUTING.[Run Time] <> 0 and [Output Quantity] <>0 THEN ([Invoiced Quantity] / [Output Quantity] ) / ROUTING.[Run Time]
 ELSE 0 
END AS Coef
FROM [BG1000].[dbo].[ISS Original$Capacity Ledger Entry] ORDERS 
LEFT JOIN [BG1000].[dbo].[ISS Original$Item] ITEM ON ORDERS.[Item No_] = ITEM.No_
LEFT JOIN [BG1000].[dbo].[ISS Original$Routing Line] ROUTING on ROUTING.[Routing No_] = ORDERS.[Routing No_] and ORDERS.[Operation No_]=ROUTING.[Operation No_]
WHERE ORDERS.[No_] = '${emp}'`;
