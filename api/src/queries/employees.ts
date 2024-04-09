export const getAverageItemTime = (employee?: string) => `WITH Averages AS (
    SELECT 
        [orders].[Item No_] AS ItemNo,
        [item].[Description],
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
    GROUP BY [orders].[Item No_], [item].[Description], [item].[Description 2]
)
SELECT *
FROM Averages
WHERE AverageCoef > 0 and AverageCoef<10
ORDER BY AverageCoef DESC;
`;

export const getAllEmployees = () => `select No_,Name
from [Copy_ISS250324$Machine Center]
where Blocked=0
order by Name;`;
