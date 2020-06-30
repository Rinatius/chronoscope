import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const tagData = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} component="form" className={classes.root}>
        <TextField
          className={classes.input}
          id="tag_field"
          label="Tag"
          onChange={props.handleTagTextChange}
          value={props.tag}
        />

        <Button
          variant="outlined"
          color="primary"
          size="small"
          align="center"
          onClick={props.handleTagClick}
        >
          Tag
        </Button>
        <Divider className={classes.divider} orientation="vertical" />
        <FormControlLabel
          control={
            <Switch
              checked={props.tagModeEnabled}
              onChange={props.handleTagModeChange}
              name="tagsChecked"
              color="primary"
            />
          }
          label="Exclude tag and negtag"
        />
      </Grid>
    </div>
  );
};

export default tagData;
