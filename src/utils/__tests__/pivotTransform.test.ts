import { transformFMSCAPivotData } from "../pivotTransform"
// import FMSCAData from "../data.json"

describe("transformFMSCAPivotData", () => {
  it("should transform FMSCA data into pivot table format", () => {
    const result = transformFMSCAPivotData()
    const expected = [
      {
        entity_type: "CARRIER",
        p_state: "AZ",
        count: 3,
      },
      {
        entity_type: "CARRIER",
        p_state: "NY",
        count: 5,
      },
    ]

    expect(result).toEqual(expect.arrayContaining(expected))
  })
})
