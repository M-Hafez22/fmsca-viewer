/**
 * Renders a pivot table.
 *
 * The pivot table displays counts of records grouped by entity type and state.
 *
 * @param {PivotTableProps} props - The properties for the pivot table component.
 * @returns A JSX element representing the pivot table.
 */

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"

type PivotDataType = {
  entity_type: string
  p_state: string
  count: number
}

type PivotTableProps = {
  data: PivotDataType[]
}

const PivotTable: React.FC<PivotTableProps> = ({ data }) => {
  const entities = Array.from(new Set(data.map(item => item.entity_type)))
  const states = Array.from(new Set(data.map(item => item.p_state)))

  const getCount = (entity: string, state: string) => {
    const record = data.find(
      item => item.entity_type === entity && item.p_state === state
    )
    return record ? record.count : 0
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity Type</TableCell>
              {states.map(state => (
                <TableCell key={state}>{state}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map(entity => (
              <TableRow key={entity}>
                <TableCell>{entity}</TableCell>
                {states.map(state => (
                  <TableCell key={state}>{getCount(entity, state)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PivotTable
