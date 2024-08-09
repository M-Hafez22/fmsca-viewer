import transformData from "../transformData"
import { TableDataType } from "../../types"

describe("transformData", () => {
  it("should correctly transform the input data into TableDataType format", () => {
    const inputData = [
      {
        created_dt: "2023-11-16 12:00:05+00",
        data_source_modified_dt: "2024-07-23 01:47:50+00",
        entity_type: "CARRIER",
        legal_name: "THOMAS WALDRUM",
        dba_name: "SOUTH MOUNTAIN TRUCKING",
        physical_address: "1176 MOUNTAIN ROAD AMITY, AR 71921",
        p_street: "1176 MOUNTAIN ROAD",
        p_city: "AMITY",
        p_state: "AR",
        p_zip_code: "71921",
        phone: "(870) 828-2056",
        mailing_address: "1176 MOUNTAIN ROAD AMITY, AR 71921",
        m_street: "1176 MOUNTAIN ROAD",
        m_city: "AMITY",
        m_state: "AR",
        m_zip_code: "71921",
        usdot_number: 729700,
        power_units: 1,
        mcs_150_form_date: "11/08/2023",
        out_of_service_date: "02/03/2024",
        drivers: 1,
        mcs_150_mileage_year: "15,000 (2022)",
        id: 2304561,
        credit_score: "NULL",
        record_status: "active",
      },
    ]

    const expectedOutput: TableDataType[] = [
      {
        created_dt: "2023-11-16 12:00:05+00",
        data_source_modified_dt: "2024-07-23 01:47:50+00",
        entity_type: "CARRIER",
        operating_status: "Unknown", // Default value
        legal_name: "THOMAS WALDRUM",
        dba_name: "SOUTH MOUNTAIN TRUCKING",
        physical_address: "1176 MOUNTAIN ROAD AMITY, AR 71921",
        p_street: "1176 MOUNTAIN ROAD",
        p_city: "AMITY",
        p_state: "AR",
        p_zip_code: 71921, // Converted to number
        phone: "(870) 828-2056",
        mailing_address: "1176 MOUNTAIN ROAD AMITY, AR 71921",
        m_street: "1176 MOUNTAIN ROAD",
        m_city: "AMITY",
        m_state: "AR",
        m_zip_code: 71921, // Converted to number
        usdot_number: 729700,
        mc_mx_ff_number: "", // Default value
        power_units: 1,
        mcs_150_form_date: "11/08/2023",
        drivers: 1,
        mcs_150_mileage_year: "15,000 (2022)",
        id: 2304561,
        credit_score: null, // Converted "NULL" to null
        out_of_service_date: "02/03/2024",
        record_status: "active", // Ensure this field is included
      },
    ]

    expect(transformData(inputData)).toEqual(expectedOutput)
  })

  it("should provide default values for missing fields", () => {
    const inputData = [
      {
        created_dt: "2023-11-16 12:00:05+00",
        entity_type: "CARRIER",
        legal_name: "THOMAS WALDRUM",
        // missing fields
      },
    ]

    const expectedOutput: TableDataType[] = [
      {
        created_dt: "2023-11-16 12:00:05+00",
        data_source_modified_dt: undefined,
        entity_type: "CARRIER",
        operating_status: "Unknown", // Default value
        legal_name: "THOMAS WALDRUM",
        dba_name: "", // Default value
        physical_address: undefined,
        p_street: undefined,
        p_city: undefined,
        p_state: undefined,
        p_zip_code: NaN, // Convert undefined to NaN as Number(undefined)
        phone: undefined,
        mailing_address: undefined,
        m_street: undefined,
        m_city: undefined,
        m_state: undefined,
        m_zip_code: NaN, // Convert undefined to NaN as Number(undefined)
        usdot_number: undefined,
        mc_mx_ff_number: "", // Default value
        power_units: undefined,
        mcs_150_form_date: undefined,
        drivers: undefined,
        mcs_150_mileage_year: undefined,
        id: undefined,
        credit_score: null, // Default value should be null
        out_of_service_date: "", // Default value
        record_status: undefined,
      },
    ]

    expect(transformData(inputData)).toEqual(expectedOutput)
  })

  it("should handle invalid input types gracefully", () => {
    const inputData = [
      {
        created_dt: 123456, // Invalid date format
        p_zip_code: "not-a-number", // Invalid number
        credit_score: "NULL", // Should be converted to null
      },
    ]

    const expectedOutput: TableDataType[] = [
      {
        created_dt: "123456", // Transformed to string
        data_source_modified_dt: undefined,
        entity_type: undefined,
        operating_status: "Unknown", // Default value
        legal_name: undefined,
        dba_name: "", // Default value
        physical_address: undefined,
        p_street: undefined,
        p_city: undefined,
        p_state: undefined,
        p_zip_code: NaN, // Invalid string results in NaN
        phone: undefined,
        mailing_address: undefined,
        m_street: undefined,
        m_city: undefined,
        m_state: undefined,
        m_zip_code: NaN, // Invalid string results in NaN
        usdot_number: undefined,
        mc_mx_ff_number: "", // Default value
        power_units: undefined,
        mcs_150_form_date: undefined,
        drivers: undefined,
        mcs_150_mileage_year: undefined,
        id: undefined,
        credit_score: null, // Correctly converted to null
        out_of_service_date: "", // Default value
        record_status: undefined,
      },
    ]

    expect(transformData(inputData)).toEqual(expectedOutput)
  })
})
