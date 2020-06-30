import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Grid,
  Divider,
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

const downloadData = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} component="form" className={classes.root}>
        <TextField
          className={classes.input}
          required
          id="tsv_address"
          label="TSV Address"
          onChange={props.handleDataUrlChange}
          value={props.data_url}
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
          id="embeddings_address"
          label="Embeddings Address"
          onChange={props.handleEmbedsUrlChange}
          value={props.embeds_url}
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
        <Button
          variant="outlined"
          color="primary"
          size="small"
          align="center"
          onClick={props.handleDownloadDataClick}
        >
          Download data
        </Button>
      </Grid>
    </div>
  );
};

export default downloadData;
