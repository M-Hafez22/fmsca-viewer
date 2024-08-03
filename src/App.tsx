/**
 * The main App component that sets up the theme provider and renders the DataTable component with the transformed FMSCA data.
 *
 * The component determines the theme based on the user's system preference for light or dark mode, and then passes the appropriate theme to the ThemeProvider.
 * The FMSCA data is transformed to match the expected TableDataType format before being passed to the DataTable component.
 */
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material"
import { lightTheme, darkTheme } from "./theme"
import DataTable from "./components/DataTable"
import FMSCAData from "./data.json"
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
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  // Determine the theme based on user preference
  const theme = prefersDarkMode ? darkTheme : lightTheme
  // convert FMSCA_records to match OutputData type
  const tableData: TableDataType[] = FMSCAData.map(record => ({
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
  console.log("tableData", tableData)
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Apply baseline styles for the theme */}
        <DataTable data={tableData} />
      </ThemeProvider>
    </>
  )
}

export default App
