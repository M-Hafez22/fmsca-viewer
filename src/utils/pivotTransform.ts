/**
 * Transforms FMSCA data into a pivot table format.
 *
 * The pivot table format groups data by entity type and state,
 * and counts the number of records for each combination.
 *
 * @returns An array of `PivotDataType` objects, where each object represents a row in the pivot table.
 */
import FMSCAData from "../data.json"

type PivotDataType = {
  entity_type: string
  p_state: string
  count: number
}

export const transformFMSCAPivotData = (): PivotDataType[] => {
  const pivotData: { [key: string]: { [key: string]: number } } = {}

  FMSCAData.forEach(record => {
    const entity = record.entity_type
    const state = record.p_state

    if (!pivotData[entity]) {
      pivotData[entity] = {}
    }
    if (!pivotData[entity][state]) {
      pivotData[entity][state] = 0
    }

    pivotData[entity][state]++
  })

  const transformedData: PivotDataType[] = []

  Object.keys(pivotData).forEach(entity => {
    Object.keys(pivotData[entity]).forEach(state => {
      transformedData.push({
        entity_type: entity,
        p_state: state,
        count: pivotData[entity][state],
      })
    })
  })

  return transformedData
}
