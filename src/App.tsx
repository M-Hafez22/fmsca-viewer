/**
 * The main App component that sets up the theme provider and renders the DataTable component with the transformed FMSCA data.
 *
 * The component determines the theme based on the user's system preference for light or dark mode, and then passes the appropriate theme to the ThemeProvider.
 * The FMSCA data is transformed to match the expected TableDataType format before being passed to the DataTable component.
 */
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material"
import { lightTheme, darkTheme } from "./theme"
import DataTable from "./components/DataTable"
import { transformFMSCAData } from "./utils/dataTransform"

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  // Determine the theme based on user preference
  const theme = prefersDarkMode ? darkTheme : lightTheme
  // convert FMSCA_records to match OutputData type
  const tableData = transformFMSCAData()
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
