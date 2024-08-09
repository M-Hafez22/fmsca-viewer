import React, { useState, useMemo } from "react"
import PivotTableUI from "react-pivottable/PivotTableUI"
import "react-pivottable/pivottable.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { TableDataType } from "../types"

type Props = {
  data: TableDataType[]
}

const PivotTableView: React.FC<Props> = ({ data }) => {
  const [pivotState, setPivotState] = useState<any>({})

  const chartData = useMemo(() => {
    const filteredData = applyFilters(pivotState, data) // Apply filters based on pivot state
    return aggregateData(filteredData, "out_of_service_date", "month") // Aggregate by month
  }, [pivotState, data])

  // Function to apply filters from the pivot table state
  function applyFilters(pivotState: any, data: TableDataType[]) {
    // Implement your filtering logic here
    // E.g., filter by entity_type or other criteria selected in the pivot table
    return data
  }

  // Function to aggregate data by the chosen time period
  function aggregateData<K extends keyof TableDataType>(
    data: TableDataType[],
    dateField: K, // Ensure dateField is a key of TableDataType
    period: "month" | "year" | "week"
  ) {
    const aggregated: { period: string; count: number }[] = []
    // Aggregate logic based on period
    data.forEach(item => {
      const dateValue = item[dateField]
      if (!dateValue) {
        return
      }
      const date = new Date(dateValue as string) // Cast to string assuming it's a date string
      const key =
        period === "month"
          ? `${date.getFullYear()}-${date.getMonth() + 1}`
          : date.getFullYear().toString()
      const found = aggregated.find(entry => entry.period === key)
      if (found) {
        found.count += 1
      } else {
        aggregated.push({ period: key, count: 1 })
      }
    })
    return aggregated
  }

  return (
    <div>
      <PivotTableUI
        data={data}
        onChange={s => setPivotState(s)}
        {...pivotState}
      />
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  )
}

export default PivotTableView
