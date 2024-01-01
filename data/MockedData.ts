//csv file with headers
const dataWithHeader = 
[["State", "Data Type", "Average Weekly Earnings", "Number of Workers", "Earnings Disparity", "Employed Percent"],
["RI", "White",	"$1,058.47", "395773.6521", "$1.00", "75%"],
["RI",	"Black", "$770.26", "30424.80376", "$0.73",	"6%"],
["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]]

//csv file without headers
const dataWithoutHeader = 
[["RI", "White", "$1,058.47", "395773.6521", "$1.00", "75%"],
["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"],
["RI", "Native American/American Indian", "$471.07", "2315.505646", "$0.45", "0%"],
["RI", "Asian-Pacific Islander", "$1,080.09", "18956.71657", "$1.02", "4%"],
["RI", "Hispanic/Latino", "$673.14", "74596.18851", "$0.64", "14%"],
["RI", "Multiracial", "$971.89", "8883.049171", "$0.92", "2%"]]

//small csv file
const smallDataset =
[["Name", "Fruits", "Veggies"],
["Amy", "Apple", "Broccoli"],
["Ben", "Mango", "Celery"],
["Cara", "Mango", "Eggplant"]]

//search results of 1 row
const oneRowResult = 
[["RI", "Black", "$770.26", "30424.80376", "$0.73", "6%"]]

//search result without headers 
const multipleRowsResult =
[["Ben", "Mango", "Celery"],
["Cara", "Mango", "Eggplant"]]

//blank csv file to test edge case
const blankDataset = [[]]

//mock map to get mock csv by [filename].csv
export const mockMap = new Map<string, string[][]>();
mockMap.set("dataWithHeader.csv", dataWithHeader);
mockMap.set("dataWithoutHeader.csv", dataWithoutHeader);
mockMap.set("smallDataset.csv", smallDataset);
mockMap.set("blankDataset.csv", blankDataset);

//mock map to get mock search by index results by commandString
export const searchByIndex = new Map<string, string[][]>();
searchByIndex.set("search 1 Mango", multipleRowsResult);
searchByIndex.set("search 0 RI", dataWithoutHeader);
searchByIndex.set("search 2 $770.26", oneRowResult)

//mock map to get mock search by column name results by commandString
export const searchByColName = new Map<string, string[][]>();
searchByColName.set("search Fruits Mango", multipleRowsResult);
searchByColName.set("search State RI", dataWithoutHeader);
