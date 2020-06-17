import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default props => (
  <AppBar position="static" color="primary">
    <Toolbar variant="dense">
      <Typography variant="headline" color="inherit">
        Data on Covid-19 in Kyrgyzstan
      </Typography>
    </Toolbar>
  </AppBar>
);
