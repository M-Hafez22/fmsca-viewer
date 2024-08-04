/**
 * Transforms FMSCA data into a format suitable for a table.
 *
 * @returns An array of `TableDataType` objects, where each object represents a row in the table.
 */
import FMSCAData from "../data.json"

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

export const transformFMSCAData = (): TableDataType[] => {
  return FMSCAData.map(record => ({
    created_dt: record.created_dt,
    modified_dt: record.data_source_modified_dt,
    entity: record.entity_type,
    operating_status: record.operating_status || "",
    legal_name: record.legal_name,
    dba_name: record.dba_name || "",
    physical_address: record.physical_address,
    phone: record.phone,
    dot: record.usdot_number.toString(),
    mc_mx_ff: record.mc_mx_ff_number || "",
    power_units: record.power_units.toString(),
    out_of_service_date: "",
  }))
}
