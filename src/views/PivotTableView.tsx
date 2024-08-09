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
    const filteredData = applyFilters(pivotState, data)
    return aggregateData(
      filteredData,
      pivotState.rows,
      "out_of_service_date",
      "month"
    )
  }, [pivotState, data])

  // Function to apply filters from the pivot table state
  function applyFilters(pivotState: any, data: TableDataType[]) {
    return data.filter(row => {
      return Object.keys(pivotState.filters || {}).every(filterKey => {
        const filterValues = pivotState.filters[filterKey]
        return filterValues.includes(row[filterKey as keyof TableDataType])
      })
    })
  }

  // Function to aggregate data by the chosen time period
  function aggregateData<K extends keyof TableDataType>(
    data: TableDataType[],
    groupByFields: string[] = [],
    dateField: K,
    period: "month" | "year" | "week"
  ) {
    const aggregated: Record<string, { period: string; count: number }> = {}

    data.forEach(item => {
      const dateValue = item[dateField]
      if (!dateValue) return

      const date = new Date(dateValue as string)
      const key =
        period === "month"
          ? `${date.getFullYear()}-${date.getMonth() + 1}`
          : date.getFullYear().toString()

      const groupByKey = groupByFields
        .map(field => item[field as keyof TableDataType])
        .join(" - ")

      const finalKey = `${key}-${groupByKey}`

      if (aggregated[finalKey]) {
        aggregated[finalKey].count += 1
      } else {
        aggregated[finalKey] = { period: key, count: 1 }
      }
    })

    return Object.values(aggregated)
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
