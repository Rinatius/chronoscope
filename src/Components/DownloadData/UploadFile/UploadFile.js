import React, { useState } from 'react'
import Dropzone from './Dropzone/Dropzone'

const UploadFile = (props) => {
  return (
    <Dropzone parseEmbed={props.parseEmbed} parseCsv={props.parseCsv} />
  )
}

export default UploadFile