import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { fetchTable } from "./initData";
import { useDispatch } from "react-redux";
import Mappings from "../MapData/MappingsComponent"

const DownloadData = (props) => {
  const dispatch = useDispatch()
  const onDownClick = () => {
    dispatch(fetchTable("https://firebasestorage.googleapis.com/v0/b/newagent-b0720.appspot.com/o/chronosope%2Fimp_bots_comments.tsv?alt=media&token=1ce5767a-cc5a-4beb-b218-ac68dfe2486e"))
    //props.handleDownloadDataClick()
  }
    return(
        <div>
          <Mappings />
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