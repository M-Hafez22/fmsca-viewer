import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
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

  return (
    <Paper>
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
            {data
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default DataTable
