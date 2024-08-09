import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material"
import { lightTheme, darkTheme } from "./theme"
import NavBar from "./components/NavBar"
import TableView from "./views/TableView"
import PivotTableView from "./views/PivotTableView"
import data from "./data.json"
function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const theme = prefersDarkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <div style={{ paddingTop: "64px" }}>
          <Routes>
            <Route path="/fmsca-viewer" element={<TableView data={data} />} />
            <Route
              path="/fmsca-viewer/pivot"
              element={<PivotTableView data={data} />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
