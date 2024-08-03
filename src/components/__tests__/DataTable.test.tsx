import { render, screen, fireEvent, within } from "@testing-library/react"
import DataTable from "../DataTable"

type TableDataType = {
  created_dt: string
  modified_dt: string
  entity: string
  operating_status: string
  legal_name: string
  dba_name: string
  physical_address: string
  phone: string
  dot: string
  mc_mx_ff: string
  power_units: string
  out_of_service_date: string
}

// Updated sample data with more entries
const sampleData: TableDataType[] = Array.from({ length: 100 }, (_, i) => ({
  created_dt: `2023-01-${i + 1}`,
  modified_dt: `2023-01-${i + 2}`,
  entity: `Entity${i + 1}`,
  operating_status: i % 2 === 0 ? "Active" : "Inactive",
  legal_name: `Legal Name ${i + 1}`,
  dba_name: `DBA Name ${i + 1}`,
  physical_address: `Address ${i + 1}`,
  phone: `${i + 1}${i + 1}${i + 1}-111-1111`,
  dot: `DOT${i + 1}`,
  mc_mx_ff: `MC${i + 1}`,
  power_units: `${i + 1}`,
  out_of_service_date: `2023-01-${i + 3}`,
}))

describe("DataTable Component", () => {
  test("renders without crashing", () => {
    render(<DataTable data={sampleData} />)
  })

  test("displays correct table headers", () => {
    render(<DataTable data={sampleData} />)
    const headers = [
      "created_dt",
      "modified_dt",
      "entity",
      "operating_status",
      "legal_name",
      "dba_name",
      "physical_address",
      "phone",
      "dot",
      "mc_mx_ff",
      "power_units",
      "out_of_service_date",
    ]
    headers.forEach(header => {
      expect(
        screen.getByRole("columnheader", { name: header })
      ).toBeInTheDocument()
    })
  })

  test("filters table data", () => {
    render(<DataTable data={sampleData} />)
    const filterInput = screen.getByLabelText("entity")
    fireEvent.change(filterInput, { target: { value: "Entity1" } })
    expect(screen.getByText("Entity1")).toBeInTheDocument()
    expect(screen.queryByText("Entity2")).toBeNull()
  })

  test("renders filter inputs", () => {
    render(<DataTable data={sampleData} />)
    Object.keys(sampleData[0]).forEach(key => {
      expect(screen.getByLabelText(key)).toBeInTheDocument()
    })
  })

  test("changes page correctly", () => {
    render(<DataTable data={sampleData} />)
    const nextPageButton = screen.getByLabelText("Go to next page")
    fireEvent.click(nextPageButton)
    expect(screen.getByText("Entity11")).toBeInTheDocument()
  })

  test("changes rows per page correctly", () => {
    render(<DataTable data={sampleData} />)
    const rowsPerPageSelect = screen.getByRole("combobox")
    fireEvent.mouseDown(rowsPerPageSelect)
    const listbox = screen.getByRole("listbox", { name: /rows per page/i })
    fireEvent.click(within(listbox).getByText("25"))
    expect(screen.getByText("Entity1")).toBeInTheDocument()
    expect(screen.getByText("Entity2")).toBeInTheDocument()
  })

  test("handles page change", () => {
    render(<DataTable data={sampleData} />)
    const nextPageButton = screen.getByLabelText("Go to next page")
    fireEvent.click(nextPageButton)
    expect(screen.getByText("Entity11")).toBeInTheDocument()
    expect(screen.queryByText("Entity1")).toBeNull()
  })
})
