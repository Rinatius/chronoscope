import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const tagData = (props) => {
    return (
        <div>
            <TextField
                id="tag_field"
                label="Tag"
                onChange={props.handleTagTextChange}
                value={props.tag}/>
            <Button
                variant="contained"
                onClick={() => props.handleTagClick('tag')}>
                Tag
            </Button>
            <Button
                variant="contained"
                onClick={() => props.handleTagClick('negtag')}>
                Negtag
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