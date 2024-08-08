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
  data_source_modified_dt: string
  entity_type: string
  operating_status: string
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
  mc_mx_ff_number: string
  power_units: number
  mcs_150_form_date: string
  drivers: number
  mcs_150_mileage_year: string
  id: number
  credit_score: string | null
}

type DataTableProps = {
  data: TableDataType[]
}

const formatPhoneNumber = (phone: string): string => {
  const cleaned = ("" + phone).replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone
}

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  return new Date(date).toLocaleDateString(undefined, options)
}

const formatAddress = (row: TableDataType): string => {
  return `${row.p_street}, ${row.p_city}, ${row.p_state} ${row.p_zip_code}`
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  console.log(data[0])
  const theme = useTheme()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState<Record<keyof TableDataType, string>>(
    Object.keys(data[0]).reduce((acc, key) => {
      acc[key as keyof TableDataType] = ""
      return acc
    }, {} as Record<keyof TableDataType, string>)
  )
  const [order, setOrder] = useState<"asc" | "desc">("asc")
  const [orderBy, setOrderBy] = useState<keyof TableDataType>("created_dt")
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(data[0]).reduce((acc, key) => {
      acc[key as keyof TableDataType] = true
      return acc
    }, {} as Record<keyof TableDataType, boolean>)
  )

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
    return Object.keys(filters).every(key => {
      const value = row[key as keyof TableDataType]
      return (value?.toString().toLowerCase() || "").includes(
        filters[key as keyof typeof filters].toLowerCase()
      )
    })
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
    return Object.values(row).some(
      value =>
        value &&
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
                {Object.keys(visibleColumns).map(
                  key =>
                    visibleColumns[key as keyof TableDataType] && (
                      <TableCell
                        key={key}
                        sortDirection={orderBy === key ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === key}
                          direction={orderBy === key ? order : "asc"}
                          onClick={() => handleSort(key as keyof TableDataType)}
                        >
                          {key}
                        </TableSortLabel>
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {Object.keys(visibleColumns).map(
                      key =>
                        visibleColumns[key as keyof TableDataType] && (
                          <TableCell key={key}>
                            {key === "phone"
                              ? formatPhoneNumber(
                                  row[key as keyof TableDataType] as string
                                )
                              : key.includes("dt")
                              ? formatDate(
                                  row[key as keyof TableDataType] as string
                                )
                              : key === "p_street"
                              ? formatAddress(row)
                              : row[key as keyof TableDataType]?.toString()}
                          </TableCell>
                        )
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
