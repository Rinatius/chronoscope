import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
    display: 'flex',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    width: 450
  }
}));

const ModifiedData = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} component="form" className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          align="center"
          onClick={this.handleGetDataClick}
        >
          Download Modified Data
        </Button>
      </Grid>
    </div>
  );
};

export default ModifiedData;
