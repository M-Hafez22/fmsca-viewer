import React, { useState, ChangeEvent, useEffect } from "react"
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
  Button,
} from "@mui/material"
import { TableDataType } from "../types"
import { Resizable } from "re-resizable"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Chart from "../components/Chart"
import ShareIcon from "@mui/icons-material/Share"
import ResetIcon from "@mui/icons-material/Restore"

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
  const theme = useTheme()
  const columnsLabels = [
    "created_dt",
    "data_source_modified_dt",
    "entity_type",
    "legal_name",
    "dba_name",
    "physical_address",
    "p_street",
    "p_city",
    "p_state",
    "p_zip_code",
    "phone",
    "mailing_address",
    "m_street",
    "m_city",
    "m_state",
    "m_zip_code",
    "usdot_number",
    "power_units",
    "mcs_150_form_date",
    "out_of_service_date",
    "drivers",
    "mcs_150_mileage_year",
    "id",
    "credit_score",
    "record_status",
  ]

  const defaultColumnWidths = columnsLabels.reduce((acc, key) => {
    acc[key as keyof TableDataType] = 150 // Default width
    return acc
  }, {} as Record<keyof TableDataType, number>)

  const queryParams = new URLSearchParams(window.location.search)

  const parseJSON = <T,>(value: string | null): T | null => {
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  }

  const [page, setPage] = useState(parseInt(queryParams.get("page") || "0", 10))
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(queryParams.get("rowsPerPage") || "10", 10)
  )
  const [filters, setFilters] = useState<Record<keyof TableDataType, string>>(
    parseJSON<Record<keyof TableDataType, string>>(
      queryParams.get("filters")
    ) ||
      columnsLabels.reduce((acc, key) => {
        acc[key as keyof TableDataType] = ""
        return acc
      }, {} as Record<keyof TableDataType, string>)
  )
  const [order, setOrder] = useState<"asc" | "desc">(
    (queryParams.get("order") as "asc" | "desc") || "asc"
  )
  const [orderBy, setOrderBy] = useState<keyof TableDataType>(
    (queryParams.get("orderBy") as keyof TableDataType) || "created_dt"
  )
  const [searchTerm, setSearchTerm] = useState(
    queryParams.get("searchTerm") || ""
  )
  const [visibleColumns, setVisibleColumns] = useState<
    Record<keyof TableDataType, boolean>
  >(
    parseJSON<Record<keyof TableDataType, boolean>>(
      queryParams.get("columns")
    ) ||
      JSON.parse(localStorage.getItem("visibleColumns")!) ||
      columnsLabels.reduce((acc, key) => {
        acc[key as keyof TableDataType] = true
        return acc
      }, {} as Record<keyof TableDataType, boolean>)
  )
  const [columnWidths, setColumnWidths] = useState<
    Record<keyof TableDataType, number>
  >(
    parseJSON<Record<keyof TableDataType, number>>(queryParams.get("widths")) ||
      JSON.parse(localStorage.getItem("columnWidths")!) ||
      defaultColumnWidths
  )
  const [columnOrder, setColumnOrder] = useState<string[]>(
    parseJSON<string[]>(queryParams.get("order")) ||
      JSON.parse(localStorage.getItem("columnOrder")!) ||
      columnsLabels
  )

  // Save visible columns, widths, and order to localStorage
  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns))
    localStorage.setItem("columnWidths", JSON.stringify(columnWidths))
    localStorage.setItem("columnOrder", JSON.stringify(columnOrder))
  }, [visibleColumns, columnWidths, columnOrder])

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

  const handleColumnResize = (column: keyof TableDataType, size: number) => {
    setColumnWidths(prevWidths => ({
      ...prevWidths,
      [column]: size,
    }))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const reorderedColumns = Array.from(columnOrder)
    const [removed] = reorderedColumns.splice(result.source.index, 1)
    reorderedColumns.splice(result.destination.index, 0, removed)
    setColumnOrder(reorderedColumns)
  }

  const handleReset = () => {
    setVisibleColumns(
      columnsLabels.reduce((acc, key) => {
        acc[key as keyof TableDataType] = true
        return acc
      }, {} as Record<keyof TableDataType, boolean>)
    )
    setColumnWidths(defaultColumnWidths)
    setColumnOrder(columnsLabels)
    setFilters(
      columnsLabels.reduce((acc, key) => {
        acc[key as keyof TableDataType] = ""
        return acc
      }, {} as Record<keyof TableDataType, string>)
    )
    setSearchTerm("")
    setOrder("asc")
    setOrderBy("created_dt")
    setPage(0)
    setRowsPerPage(10)
  }

  const generateShareableLink = () => {
    const queryParams = new URLSearchParams({
      columns: JSON.stringify(visibleColumns),
      widths: JSON.stringify(columnWidths),
      order: JSON.stringify(columnOrder),
      filters: JSON.stringify(filters),
      searchTerm,
      orderBy,
      page: page.toString(),
      rowsPerPage: rowsPerPage.toString(),
    })
    const shareableLink = `${window.location.origin}${
      window.location.pathname
    }?${queryParams.toString()}`
    navigator.clipboard.writeText(shareableLink)
    alert(`Shareable link copied to clipboard!`)
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
        <Box
          sx={{
            padding: 2,
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShareIcon />}
            onClick={generateShareableLink}
          >
            Generate Share Link
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ResetIcon />}
            onClick={handleReset}
          >
            Reset Settings
          </Button>
        </Box>
        <TableContainer sx={{ overflowX: "auto", maxWidth: "100vw" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="table-columns" direction="horizontal">
              {provided => (
                <Table {...provided.droppableProps} ref={provided.innerRef}>
                  <TableHead>
                    <TableRow>
                      {columnOrder.map(
                        (key, index) =>
                          visibleColumns[key as keyof TableDataType] && (
                            <Draggable
                              key={key}
                              draggableId={key}
                              index={index}
                            >
                              {provided => (
                                <TableCell
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  sortDirection={
                                    orderBy === key ? order : false
                                  }
                                  sx={{
                                    width:
                                      columnWidths[key as keyof TableDataType],
                                    padding: 1,
                                    position: "relative",
                                    userSelect: "none",
                                  }}
                                >
                                  <Resizable
                                    size={{
                                      width:
                                        columnWidths[
                                          key as keyof TableDataType
                                        ],
                                      height: "auto",
                                    }}
                                    onResizeStop={(e, direction, ref) =>
                                      handleColumnResize(
                                        key as keyof TableDataType,
                                        ref.offsetWidth
                                      )
                                    }
                                    minWidth={50}
                                    maxWidth={500}
                                    enable={{
                                      right: true, // Only allow horizontal resizing
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <TableSortLabel
                                      active={orderBy === key}
                                      direction={
                                        orderBy === key ? order : "asc"
                                      }
                                      onClick={() =>
                                        handleSort(key as keyof TableDataType)
                                      }
                                    >
                                      {key}
                                    </TableSortLabel>
                                    <Box
                                      sx={{
                                        cursor: "col-resize",
                                        width: "5px",
                                        height: "100%",
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                        backgroundColor: "#ddd", // Visible resize controller
                                      }}
                                    />
                                  </Resizable>
                                </TableCell>
                              )}
                            </Draggable>
                          )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <TableRow key={index}>
                          {columnOrder.map(
                            key =>
                              visibleColumns[key as keyof TableDataType] && (
                                <TableCell key={key}>
                                  {key === "phone"
                                    ? formatPhoneNumber(
                                        row[
                                          key as keyof TableDataType
                                        ] as string
                                      )
                                    : key.includes("dt")
                                    ? formatDate(
                                        row[
                                          key as keyof TableDataType
                                        ] as string
                                      )
                                    : key === "p_street"
                                    ? formatAddress(row)
                                    : row[
                                        key as keyof TableDataType
                                      ]?.toString()}
                                </TableCell>
                              )
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                  {provided.placeholder}
                </Table>
              )}
            </Droppable>
          </DragDropContext>
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
      <Chart data={searchedData} />
    </Paper>
  )
}

export default DataTable
