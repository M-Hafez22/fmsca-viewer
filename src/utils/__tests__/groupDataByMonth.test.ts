import { groupDataByMonth } from "../groupDataByMonth"
import { TableDataType } from "../../types"

describe("groupDataByMonth", () => {
  it("should correctly group data by month", () => {
    const inputData: TableDataType[] = [
      { out_of_service_date: "2023-04-15" },
      { out_of_service_date: "2023-04-20" },
      { out_of_service_date: "2023-05-05" },
    ]

    const expectedOutput = {
      "2023-04": 2,
      "2023-05": 1,
    }

    expect(groupDataByMonth(inputData)).toEqual(expectedOutput)
  })

  it("should skip entries with missing out_of_service_date", () => {
    const inputData: TableDataType[] = [
      { out_of_service_date: "2023-04-15" },
      { out_of_service_date: undefined },
      { out_of_service_date: "2023-05-05" },
      { out_of_service_date: "" }, // Empty string should be skipped
    ]

    const expectedOutput = {
      "2023-04": 1,
      "2023-05": 1,
    }

    expect(groupDataByMonth(inputData)).toEqual(expectedOutput)
  })

  it("should handle data from different years but the same month separately", () => {
    const inputData: TableDataType[] = [
      { out_of_service_date: "2023-04-15" },
      { out_of_service_date: "2024-04-20" },
    ]

    const expectedOutput = {
      "2023-04": 1,
      "2024-04": 1,
    }

    expect(groupDataByMonth(inputData)).toEqual(expectedOutput)
  })

  it("should handle invalid dates gracefully", () => {
    const inputData: TableDataType[] = [
      { out_of_service_date: "Invalid-Date" },
      { out_of_service_date: "2023-04-15" },
    ]

    const expectedOutput = {
      "2023-04": 1, // Only valid date should be counted
    }

    expect(groupDataByMonth(inputData)).toEqual(expectedOutput)
  })
})
