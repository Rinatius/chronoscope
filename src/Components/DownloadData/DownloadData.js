import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const downloadData = (props) => {
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
            onClick={props.handleDownloadDataClick}>
            Download data
          </Button>
        </div>

    )
}

export default downloadData