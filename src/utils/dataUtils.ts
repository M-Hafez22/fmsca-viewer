/**
 * Groups the provided table data by month based on the `out_of_service_date` field.
 *
 * @param data - An array of `TableDataType` objects to be grouped.
 * @returns An object where the keys are the year-month strings (e.g. "2023-04") and the values are the counts of data points for that month.
 */
import { TableDataType } from "../types"

// Group data by month for the chart
export const groupDataByMonth = (data: TableDataType[]) => {
  const groupedData = data.reduce((acc, curr) => {
    if (!curr.out_of_service_date) {
      return acc
    }
    const month = new Date(curr.out_of_service_date).getMonth() + 1
    const year = new Date(curr.out_of_service_date).getFullYear()
    const key = `${year}-${month < 10 ? `0${month}` : month}`
    if (!acc[key]) {
      acc[key] = 0
    }
    acc[key]++
    return acc
  }, {} as Record<string, number>)
  return groupedData
}
