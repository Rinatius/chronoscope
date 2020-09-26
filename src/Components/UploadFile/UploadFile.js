import React from 'react'
import Button from '@material-ui/core/Button'

const UploadFile = (props) => (
    <Button
      variant="contained"
      component="label"
      >
      Upload File
      <input
        type="file"
        style={{ display: "none" }}
        onChange={props.handleChange}
      />
    </Button>
)

export default UploadFile
