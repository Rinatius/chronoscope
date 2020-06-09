import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const filterData = (props) => {
    return(
        <div>
            <TextField
                id="regex_field"
                label="RegEx Pattern"
                onChange={props.handleRegexTextChange}
                value={props.regex} />
            <TextField
                id="tag_selector_field"
                label="Tags"
                onChange={props.handleTagSelectorTextChange}
                value={props.tagSelector} />
            <Button
                variant="contained"
                onClick={props.handleFilterClick}>
            Filter
            </Button>
        </div>
    )
}

export default filterData