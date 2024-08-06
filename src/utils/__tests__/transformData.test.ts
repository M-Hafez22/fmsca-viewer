import { transformFMSCAData } from "../dataTransform"
import FMSCAData from "../../data.json"

describe("transformFMSCAData", () => {
  it("should transform FMSCA data to match TableDataType format", () => {
    const result = transformFMSCAData()
    expect(result).toBeDefined()
    expect(result).toHaveLength(FMSCAData.length)

    result.forEach((item, index) => {
      expect(item.created_dt).toEqual(FMSCAData[index].created_dt)
      expect(item.modified_dt).toEqual(FMSCAData[index].data_source_modified_dt)
      expect(item.entity).toEqual(FMSCAData[index].entity_type)
      expect(item.operating_status).toEqual(
        FMSCAData[index].operating_status || ""
      )
      expect(item.legal_name).toEqual(FMSCAData[index].legal_name)
      expect(item.dba_name).toEqual(FMSCAData[index].dba_name || "")
      expect(item.physical_address).toEqual(FMSCAData[index].physical_address)
      expect(item.phone).toEqual(FMSCAData[index].phone)
      expect(item.dot).toEqual(FMSCAData[index].usdot_number.toString())
      expect(item.mc_mx_ff).toEqual(FMSCAData[index].mc_mx_ff_number || "")
      expect(item.power_units).toEqual(FMSCAData[index].power_units.toString())
      expect(item.out_of_service_date).toEqual(
        FMSCAData[index].out_of_service_date || ""
      )
    })
  })
})
