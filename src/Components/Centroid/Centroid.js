import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, TextField } from '@material-ui/core';

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

const centroid = props => {
  const classes = useStyles();

  const radiusInputProps = {
    min: 0,
    step: 0.1
  };

  return (
    <div>
      <Grid item xs={12} component="form" className={classes.root}>
        <TextField
          className={classes.input}
          id="tag_field"
          width="5"
          label="Centroid radius"
          type="number"
          inputProps={radiusInputProps}
          onChange={props.handleRadiusChange}
          value={props.maxKDRadius}
        />
        <Button
          variant="outlined"
          color="primary"
          size="small"
          align="center"
          onClick={props.handleNNSearchClick}
        >
          Search around current centroid
        </Button>
      </Grid>
      {/* <Button variant="contained" onClick={props.handleCalculateCentroidClick}>
        Calculate Centroid
      </Button> */}
    </div>
  );
};

export default centroid;
