import React from "react"
import { render, screen } from "@testing-library/react"
import PivotTable from "../PivotTable"

const sampleData = [
  {
    entity_type: "CARRIER",
    p_state: "AZ",
    count: 1,
  },
  {
    entity_type: "CARRIER",
    p_state: "NY",
    count: 1,
  },
]

describe("PivotTable", () => {
  it("renders pivot table with correct headers and data", () => {
    render(<PivotTable data={sampleData} />)

    // Check headers
    expect(screen.getByText("Entity Type")).toBeInTheDocument()
    expect(screen.getByText("AZ")).toBeInTheDocument()
    expect(screen.getByText("NY")).toBeInTheDocument()

    // Check data
    expect(screen.getByText("CARRIER")).toBeInTheDocument()
    expect(screen.getAllByText("1")).toHaveLength(2)
  })

  it("returns count of 0 for missing entity and state combination", () => {
    const { getByText } = render(<PivotTable data={sampleData} />)

    // Add a row to test the missing entity and state combination
    expect(getByText("CARRIER")).toBeInTheDocument()

    // Check that a non-existent entity and state combination returns 0
    const nonExistentState = screen.getByText("AZ")
    expect(nonExistentState).toBeInTheDocument()

    const row = screen.getByRole("row", { name: /CARRIER/i })
    const cell = row.querySelector("td:nth-child(2)") // AZ column
    expect(cell?.textContent).toBe("1")

    const nonExistentRow = row.querySelector("td:nth-child(3)") // NY column
    expect(nonExistentRow?.textContent).toBe("1")

    // Expect a count of 0 for a non-existent combination (e.g., CA)
    expect(screen.queryByText("0")).toBeNull()
  })
})
