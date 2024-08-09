import { TableDataType } from "../types"

// Helper function to transform and validate data
function transformData(inputData: any[]): TableDataType[] {
  return inputData.map(item => ({
    created_dt: item.created_dt,
    data_source_modified_dt: item.data_source_modified_dt,
    entity_type: item.entity_type,
    operating_status: item.operating_status || "Unknown", // Provide default if missing
    legal_name: item.legal_name,
    dba_name: item.dba_name || "", // Provide default if missing
    physical_address: item.physical_address,
    p_street: item.p_street,
    p_city: item.p_city,
    p_state: item.p_state,
    p_zip_code: Number(item.p_zip_code), // Ensure it's a number
    phone: item.phone,
    mailing_address: item.mailing_address,
    m_street: item.m_street,
    m_city: item.m_city,
    m_state: item.m_state,
    m_zip_code: Number(item.m_zip_code), // Ensure it's a number
    usdot_number: item.usdot_number,
    mc_mx_ff_number: item.mc_mx_ff_number || "", // Provide default if missing
    power_units: item.power_units,
    mcs_150_form_date: item.mcs_150_form_date,
    drivers: item.drivers,
    mcs_150_mileage_year: item.mcs_150_mileage_year,
    id: item.id,
    credit_score: item.credit_score !== "NULL" ? item.credit_score : null, // Handle NULL as null
    out_of_service_date: item.out_of_service_date || "", // Provide default if missing
  }))
}

export default transformData
