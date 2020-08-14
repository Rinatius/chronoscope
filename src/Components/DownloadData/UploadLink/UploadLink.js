import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { fetchTable } from "../../../slices/initData";
import { useDispatch } from "react-redux";

 
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
      width: '80%'
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  }));

const UploadLink = (props) => {
  const dispatch = useDispatch()
  const onDownClick = () => {
    dispatch(fetchTable("https://neo4j.kloop.io/html/insta_impichment.tsv"))
    //props.handleDownloadDataClick()
  }
  const classes = useStyles();
  return(
      <Grid container direction="column" justify="center">
        <Grid item>
          <TextField  
            className={classes.margin}
            variant="outlined"
            id="tsv_address"
            label="TSV Address"
            onChange={props.handleDataUrlChange}
            value={props.data_url} />
            
          <TextField 
            className={classes.margin}
            variant="outlined"
            id="embeddings_address"
            label="Embeddings Address"
            onChange={props.handleEmbedsUrlChange}
            value={props.embeds_url} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={onDownClick}>
            Download data
          </Button>
        </Grid>
      </Grid>

  )
}

export default UploadLink