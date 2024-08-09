import React, { useState, useMemo } from "react"
import PivotTableUI from "react-pivottable/PivotTableUI"
import "react-pivottable/pivottable.css" // Base styles
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
import { useTheme } from "@mui/material/styles"
import { Box } from "@mui/material"

type Props = {
  data: TableDataType[]
}

const PivotTableView: React.FC<Props> = ({ data }) => {
  const [pivotState, setPivotState] = useState<any>({})
  const theme = useTheme()

  const chartData = useMemo(() => {
    const filteredData = applyFilters(pivotState, data)
    return aggregateData(
      filteredData,
      pivotState.rows,
      "out_of_service_date",
      "month"
    )
  }, [pivotState, data])

  function applyFilters(pivotState: any, data: TableDataType[]) {
    return data.filter(row => {
      return Object.keys(pivotState.filters || {}).every(filterKey => {
        const filterValues = pivotState.filters[filterKey]
        return filterValues.includes(row[filterKey as keyof TableDataType])
      })
    })
  }

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
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 2,
        ".pvtUi": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
          borderColor: "inherit !important",
        },
        ".pvtUi select, .pvtUi input": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
          borderColor: "inherit !important",
        },
        ".pvtTable thead tr th": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
        ".pvtTable tbody tr td": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
        ".pvtAxisContainer, .pvtVals": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
        "table.pvtTable thead tr th, table.pvtTable tbody tr th": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
        ".pvtDropdownCurrent": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
        ".pvtAxisContainer li span.pvtAttr": {
          backgroundColor: "inherit !important",
          color: "inherit !important",
        },
      }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <PivotTableUI
          data={data}
          onChange={s => setPivotState(s)}
          {...pivotState}
        />
      </Box>
      <Box>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={theme.palette.primary.main} />
        </BarChart>
      </Box>
    </Box>
  )
}

export default PivotTableView
