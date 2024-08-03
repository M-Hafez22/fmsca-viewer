export type InputData = {
  created_dt: string
  data_source_modified_dt: string
  entity_type: string
  legal_name: string
  dba_name: string
  physical_address: string
  p_street: string
  p_city: string
  p_state: string
  p_zip_code: number
  phone: string
  mailing_address: string
  m_street: string
  m_city: string
  m_state: string
  m_zip_code: number
  usdot_number: number
  power_units: number
  mcs_150_form_date: string
  drivers: number
  mcs_150_mileage_year: string
  id: number
  credit_score: string
  record_status: string
}

export type OutputData = {
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

export function transformData(input: InputData[]): OutputData[] {
  return input.map(item => ({
    created_dt: item.created_dt,
    modified_dt: item.data_source_modified_dt,
    entity: item.entity_type,
    operating_status: item.record_status,
    legal_name: item.legal_name,
    dba_name: item.dba_name,
    physical_address: item.physical_address,
    phone: item.phone,
    dot: item.usdot_number.toString(),
    mc_mx_ff: item.mcs_150_mileage_year,
    power_units: item.power_units.toString(),
    out_of_service_date: item.power_units,
  }))
}
