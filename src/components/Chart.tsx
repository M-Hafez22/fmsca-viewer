/**
 * Renders a bar chart component that displays the number of companies out of service per month.
 *
 * The component fetches the data from the `data` prop, which is an array of `TableDataType` objects.
 * It then groups the data by month using the `groupDataByMonth` utility function, and sets the chart data
 * in the component's state.
 *
 * The chart is rendered using the `Bar` component from the `react-chartjs-2` library, with options
 * that configure the chart's appearance and behavior.
 *
 * The component also saves the chart data to localStorage, and loads it from localStorage on mount
 * if it exists.
 *
 * @param {ChartProps} props - The component's props, which include the `data` array.
 * @returns {JSX.Element} - The rendered bar chart component.
 */
import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { TableDataType } from "../types"
import { groupDataByMonth } from "../utils/dataUtils"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type ChartProps = {
  data: TableDataType[]
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }>({ labels: [], datasets: [] })

  useEffect(() => {
    const groupedData = groupDataByMonth(data)
    const labels = Object.keys(groupedData)
    const values = Object.values(groupedData)

    const newChartData = {
      labels,
      datasets: [
        {
          label: "Out of Service",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    }

    setChartData(newChartData)
    localStorage.setItem("chartData", JSON.stringify(newChartData))
  }, [data])

  useEffect(() => {
    const savedChartData = localStorage.getItem("chartData")
    if (savedChartData) {
      setChartData(JSON.parse(savedChartData))
    }
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Companies Out of Service per Month",
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default Chart
