import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SortIcon from '@material-ui/icons/Sort';

import {
  Paper,
  Button,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Divider,
  InputLabel,
  Switch,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    display: 'flex',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    width: 450
  },
  paper: {
    padding: 20,
    marginBottom: 10,
    marginTop: 10
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10,
    alignItems: 'center'
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function InsertData() {
  const classes = useStyles();
  const [tags, setTags] = React.useState('');

  const handleChange = event => {
    setTags(event.target.value);
  };

  const inputProps = {
    min: 0,
    step: 0.1
  };

  const [exclude, setExclude] = React.useState({
    tagsChecked: false
  });

  const handleTagNegtag = e => {
    setExclude({ ...exclude, [e.target.name]: e.target.checked });
  };

  return (
    <Paper>
      <Grid container spacing={3} component="form" className={classes.root}>
        <Grid item xs={12} component="form" className={classes.root}>
          <TextField
            className={classes.input}
            required
            id="fileLocation"
            name="fileLocation"
            size="small"
            label="Insert or Upload a TSV File"
          />
          <Divider className={classes.divider} orientation="vertical" />
          <Button
            component="label"
            color="primary"
            className={classes.iconButton}
            variant="text"
            startIcon={<CloudUploadIcon />}
          >
            <input type="file" style={{ display: 'none' }} />
          </Button>
        </Grid>

        <Grid item xs={12} component="form" className={classes.root}>
          <TextField
            className={classes.input}
            required
            id="fileLocation"
            name="fileLocation"
            label="Insert or Upload a Embeddings File"
          />
          <Divider className={classes.divider} orientation="vertical" />
          <Button
            component="label"
            color="primary"
            className={classes.iconButton}
            variant="text"
            startIcon={<CloudUploadIcon />}
          >
            <input type="file" style={{ display: 'none' }} />
          </Button>
        </Grid>

        <Grid item xs={12} component="form" className={classes.root}>
          <TextField className={classes.input} label="RegEx Pattern" />
          <FormControl className={classes.input}>
            <InputLabel id="demo-customized-select-label">Tags</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={tags}
              onChange={handleChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={1}>tag one</MenuItem>
              <MenuItem value={2}>tag two</MenuItem>
              <MenuItem value={3}>tag three</MenuItem>
            </Select>
          </FormControl>
          <Button color="primary">
            <SortIcon />
          </Button>
        </Grid>

        <Grid item xs={12} component="form" className={classes.root}>
          <TextField
            className={classes.input}
            width="5"
            label="Centroid radius"
            type="number"
            inputProps={inputProps}
          />
          <TextField className={classes.input} label="Tags" />
          <FormControlLabel
            control={
              <Switch
                checked={exclude.tagsChecked}
                onChange={handleTagNegtag}
                name="tagsChecked"
                color="primary"
              />
            }
            label="tag & negtag"
          />
        </Grid>
        <Grid item xs={12} component="form" className={classes.root}>
          <Button size="medium" variant="outlined" color="primary">
            Generate Data
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
