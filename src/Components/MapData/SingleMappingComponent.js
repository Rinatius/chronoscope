import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as columnTypes from "./columnTypes"
import { mappingColumnTypeEdited } from "./MappingsSlice"

const SingleMappingComponent = (props) => {
  const mappings = useSelector(state => state.mappings[props.mappingName]);
  const dispatch = useDispatch()

  const handleColumnTypeChange = (event, column) => {
    dispatch(mappingColumnTypeEdited({
      mappingName: props.mappingName,
      column: column,
      type: event.target.value
    }))
  }

  return Object.keys(mappings.columns).map(col =>
    <div key={col}>
      {col + ": "}
      <Select id={"select-" + col + "-column-type"}
              label="Type"
              value={mappings.columns[col].type}
              onChange={e => handleColumnTypeChange(e, col)}>
        {Object.keys(columnTypes).map(colType =>
          <MenuItem key={colType} value={columnTypes[colType]}>
            {columnTypes[colType]}
          </MenuItem>)}
      </Select>
    </div>)
}

export default SingleMappingComponent