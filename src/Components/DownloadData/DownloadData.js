import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { fetchTable } from "../../slices/initData";
import { useDispatch } from "react-redux";

const DownloadData = (props) => {
  const dispatch = useDispatch()
  const onDownClick = () => {
    dispatch(fetchTable("https://neo4j.kloop.io/html/insta_impichment.tsv"))
    //props.handleDownloadDataClick()
  }
    return(
        <div>
          <TextField
            id="tsv_address"
            label="TSV Address"
            onChange={props.handleDataUrlChange}
            value={props.data_url} />
          <TextField
            id="embeddings_address"
            label="Embeddings Address"
            onChange={props.handleEmbedsUrlChange}
            value={props.embeds_url} />
          <Button
            variant="contained"
            onClick={onDownClick}>
            Download data
          </Button>
        </div>

    )
}

export default DownloadData