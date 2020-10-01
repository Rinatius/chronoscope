import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Grid} from "@material-ui/core";

const tagData = (props) => {
    return (
        <div>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <TextField
                        id="tag_field"
                        label="Tag"
                        onChange={props.handleTagTextChange}
                        value={props.tag}/>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={props.filter}>
                        Filter
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => props.handleTagClick('tag')}>
                        Tag all
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => props.handleTagClick('negtag')}>
                        Negtag all
                    </Button>
                </Grid>

            </Grid>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item> <FormControlLabel
                    control={<Switch checked={props.tagModeEnabled}
                                     onChange={props.handleTagModeChange}/>}
                    label="Hide (neg)tagged"
                /></Grid>
                <Grid item> <FormControlLabel
                    control={<Switch checked={props.autoDiscoveryMode}
                                     onChange={props.handleAutoDiscoveryModeChange}/>}
                    label="Auto discovery"
                /></Grid>
                <Grid item> <FormControlLabel
                    control={<Switch />}
                    label="Auto tagging"
                /></Grid>
            </Grid>
        </div>

    )
}

export default tagData