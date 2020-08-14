import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { tagOnChange } from "../../slices/sliceTag";
import { useDispatch, useSelector } from "react-redux";

const tagData = (props) => {
  
  const tag = useSelector(state => state.sliceTag);
  const dispatch = useDispatch()
  console.log(2)
  console.log(props.tag)
    return(
        <div> 
          <TextField
            id="tag_field"
            label="Tag"
            //onChange={() => {dispatch(tagOnChange(props.tag))}}
            //value={props.tag} 
            />
          <Button
            variant="contained"
            onClick={props.handleTagClick}>
            Tag
          </Button>
          <FormControlLabel
            control={<Switch checked={props.tagModeEnabled}
                             onChange={props.handleTagModeChange}/>}
            label="Exclude tag and negtag"
          />
        </div>

    )
}

export default tagData