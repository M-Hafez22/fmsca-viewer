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
  useTheme,
  TableSortLabel,
  Checkbox,
  FormControlLabel,
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
  const theme = useTheme()
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
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [orderBy, setOrderBy] = useState<keyof TableDataType>("created_dt")
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleColumns, setVisibleColumns] = useState({
    created_dt: true,
    modified_dt: true,
    entity: true,
    operating_status: true,
    legal_name: true,
    dba_name: true,
    physical_address: true,
    phone: true,
    dot: true,
    mc_mx_ff: true,
    power_units: true,
    out_of_service_date: true,
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

  const handleSort = (property: keyof TableDataType) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleColumnVisibilityChange = (column: keyof TableDataType) => {
    setVisibleColumns(prevState => ({
      ...prevState,
      [column]: !prevState[column],
    }))
  }

  const filteredData = data.filter(row => {
    return Object.keys(filters).every(key =>
      row[key as keyof TableDataType]
        .toString()
        .toLowerCase()
        .includes(filters[key as keyof typeof filters].toLowerCase())
    )
  })

  const sortedData = filteredData.sort((a, b) => {
    const valueA = a[orderBy] as string | number
    const valueB = b[orderBy] as string | number
    if (order === "asc") {
      return valueA < valueB ? -1 : 1
    } else {
      return valueA > valueB ? -1 : 1
    }
  })

  const searchedData = sortedData.filter(row => {
    return Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <Paper>
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: theme.palette.background.paper,
            zIndex: 1,
            padding: 2,
            marginBottom: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            width: "100vw",
            borderRadius: 2,
          }}
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
        <Box sx={{ padding: 2, marginBottom: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
          />
        </Box>
        <Box sx={{ padding: 2, marginBottom: 2 }}>
          {Object.keys(visibleColumns).map(key => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={visibleColumns[key as keyof TableDataType]}
                  onChange={() =>
                    handleColumnVisibilityChange(key as keyof TableDataType)
                  }
                />
              }
              label={key}
            />
          ))}
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {visibleColumns.created_dt && (
                  <TableCell
                    sortDirection={orderBy === "created_dt" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "created_dt"}
                      direction={orderBy === "created_dt" ? order : "asc"}
                      onClick={() => handleSort("created_dt")}
                    >
                      Created Date
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.modified_dt && (
                  <TableCell
                    sortDirection={orderBy === "modified_dt" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "modified_dt"}
                      direction={orderBy === "modified_dt" ? order : "asc"}
                      onClick={() => handleSort("modified_dt")}
                    >
                      Modified Date
                    </TableSortLabel>
                  </TableCell>
                )}
                {visibleColumns.entity && (
                  <TableCell
                    sortDirection={orderBy === "entity" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "entity"}
                      direction={orderBy === "entity" ? order : "asc"}
                      onClick={() => handleSort("entity")}
                    >
                      Entity
                    </TableSortLabel>
                  </TableCell>
                )}
                {/* Render remaining columns similarly */}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {visibleColumns.created_dt && (
                      <TableCell>{row.created_dt}</TableCell>
                    )}
                    {visibleColumns.modified_dt && (
                      <TableCell>{row.modified_dt}</TableCell>
                    )}
                    {visibleColumns.entity && (
                      <TableCell>{row.entity}</TableCell>
                    )}
                    {visibleColumns.operating_status && (
                      <TableCell>{row.operating_status}</TableCell>
                    )}
                    {visibleColumns.legal_name && (
                      <TableCell>{row.legal_name}</TableCell>
                    )}
                    {visibleColumns.dba_name && (
                      <TableCell>{row.dba_name}</TableCell>
                    )}
                    {visibleColumns.physical_address && (
                      <TableCell>{row.physical_address}</TableCell>
                    )}
                    {visibleColumns.phone && <TableCell>{row.phone}</TableCell>}
                    {visibleColumns.dot && <TableCell>{row.dot}</TableCell>}
                    {visibleColumns.mc_mx_ff && (
                      <TableCell>{row.mc_mx_ff}</TableCell>
                    )}
                    {visibleColumns.power_units && (
                      <TableCell>{row.power_units}</TableCell>
                    )}
                    {visibleColumns.out_of_service_date && (
                      <TableCell>{row.out_of_service_date}</TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={searchedData.length}
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
