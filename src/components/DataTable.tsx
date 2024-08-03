/**
 * The `DataTable` component is a reusable React component that displays a table of data with pagination and filtering functionality.
 *
 * The component accepts a `data` prop of type `TableDataType[]`, which is an array of objects representing the data to be displayed in the table.
 *
 * The component provides the following features:
 * - Pagination: The table can be paginated, with the user able to select the number of rows to display per page.
 * - Filtering: The table can be filtered by any of the properties of the `TableDataType` object, with the user able to enter filter values in text fields.
 * - Responsive design: The table and filter controls are designed to be responsive and adapt to different screen sizes.
 *
 * The component uses the `@mui/material` library for the table and pagination controls, and the `useState` and `ChangeEvent` hooks from React to manage the state of the component.
 */
// src/DataTable.tsx
import React, { useState, ChangeEvent } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Box,
} from "@mui/material"

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

type DataTableProps = {
  data: TableDataType[]
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    created_dt: "",
    modified_dt: "",
    entity: "",
    operating_status: "",
    legal_name: "",
    dba_name: "",
    physical_address: "",
    phone: "",
    dot: "",
    mc_mx_ff: "",
    power_units: "",
    out_of_service_date: "",
  })

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    })
  }

  // Filter data based on the filter criteria
  const filteredData = data.filter(row => {
    return Object.keys(filters).every(key =>
      row[key as keyof TableDataType]
        .toLowerCase()
        .includes(filters[key as keyof typeof filters].toLowerCase())
    )
  })

  return (
    <Paper>
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{ marginBottom: 2, display: "flex", flexWrap: "wrap", gap: 2 }}
        >
          {Object.keys(filters).map(key => (
            <TextField
              key={key}
              name={key}
              label={key}
              variant="outlined"
              size="small"
              value={filters[key as keyof typeof filters]}
              onChange={handleFilterChange}
            />
          ))}
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>created_dt</TableCell>
                <TableCell>modified_dt</TableCell>
                <TableCell>entity</TableCell>
                <TableCell>operating_status</TableCell>
                <TableCell>legal_name</TableCell>
                <TableCell>dba_name</TableCell>
                <TableCell>physical_address</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>dot</TableCell>
                <TableCell>mc_mx_ff</TableCell>
                <TableCell>power_units</TableCell>
                <TableCell>out_of_service_date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.created_dt}</TableCell>
                    <TableCell>{row.modified_dt}</TableCell>
                    <TableCell>{row.entity}</TableCell>
                    <TableCell>{row.operating_status}</TableCell>
                    <TableCell>{row.legal_name}</TableCell>
                    <TableCell>{row.dba_name}</TableCell>
                    <TableCell>{row.physical_address}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.dot}</TableCell>
                    <TableCell>{row.mc_mx_ff}</TableCell>
                    <TableCell>{row.power_units}</TableCell>
                    <TableCell>{row.out_of_service_date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  )
}

export default DataTable
