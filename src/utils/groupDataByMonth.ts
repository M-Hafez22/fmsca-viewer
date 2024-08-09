/**
 * Groups the provided table data by month based on the `out_of_service_date` field.
 *
 * @param data - An array of `TableDataType` objects to be grouped by month.
 * @returns An object where the keys are the year-month strings (e.g. "2023-04") and the values are the counts of the number of items for that month.
 */
import { TableDataType } from "../types"

// Helper function to check if a date is valid
const isValidDate = (date: Date) => !isNaN(date.getTime())

// Group data by month for the chart
export const groupDataByMonth = (data: TableDataType[]) => {
  const groupedData = data.reduce((acc, curr) => {
    if (!curr.out_of_service_date) {
      return acc
    }

    const date = new Date(curr.out_of_service_date)

    // Skip invalid dates
    if (!isValidDate(date)) {
      return acc
    }

    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const key = `${year}-${month < 10 ? `0${month}` : month}`

    if (!acc[key]) {
      acc[key] = 0
    }

    acc[key]++
    return acc
  }, {} as Record<string, number>)

  return groupedData
}
