import React from 'react';
import { Grid } from '@material-ui/core';

import InputData from './InputData';
import ShowTable from './ShowTable';

const styles = {
  Paper: { padding: 20, marginBottom: 10, marginTop: 10 }
};

export default props => (
  <Grid container spacing={3} direction="row">
    <Grid item sm zeroMinWidth>
      <InputData styles={styles} />
    </Grid>
    <Grid item sm zeroMinWidth>
      <ShowTable styles={styles} />
    </Grid>
  </Grid>
);
