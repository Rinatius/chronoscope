import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField
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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}));

const filterData = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} component="form" className={classes.root}>
        <TextField
          className={classes.input}
          id="regex_field"
          label="RegEx Pattern"
          onChange={props.handleRegexTextChange}
          value={props.regex}
        />
        <FormControl className={classes.input}>
          <InputLabel id="demo-customized-select-label">Tags</InputLabel>
          <Select
            labelId="Tags"
            id="tag_selector_field"
            onChange={props.handleTagSelectorTextChange}
            value={props.tagSelector}
          >
            <MenuItem value={props.tagSelector}>All</MenuItem>
            <MenuItem value={1}>tag one</MenuItem>
            <MenuItem value={2}>tag two</MenuItem>
            <MenuItem value={3}>tag three</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          align="center"
          onClick={props.handleFilterClick}
        >
          Filter
        </Button>
      </Grid>
    </div>
  );
};

export default filterData;
