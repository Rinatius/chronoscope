import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

import Card from './Card'
import UploadFile from './UploadFile/UploadFile'
import Preset from './Preset/Preset'
import UploadLink from './UploadLink/UploadLink'

const images = [
  {
    url: '/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    width: '200px',
  },
  {
    url: '/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    width: '200px',
  },
  {
    url: '/static/images/grid-list/camera.jpg',
    title: 'Camera',
    width: '200px ',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
}));

const UploadData = (props) => {
  const classes = useStyles();
  const [mainState, setMainState] = useState("initial")

  const renderInitialState = event => {
    return (
      <Grid container display="flex" justify="center">
        <Grid item>
          <Card handleClick={handleGalleryClick} image={'/static/images/grid-list/breakfast.jpg'} title={"Gallery"} width={"200px"} />
        </Grid>
        <Grid item>
          <Card handleClick={handleFileClick} image={'/static/images/grid-list/breakfast.jpg'} title={"File"} width={"200px"} />
        </Grid>
        <Grid item>
          <Card handleClick={handleURLClick} image={'/static/images/grid-list/breakfast.jpg'} title={"Link"} width={"200px"} />
        </Grid>
    </Grid>
    )
  }

  const renderGalleryState = event => {
    return (
      <Preset listOfUrls={props.listOfUrls} handlePresetClick={props.handlePresetClick} />
    )
  }

  const renderURLState = event => {
    return (
      <UploadLink 
        data_url={props.data_url}
        embeds_url={props.embeds_url}
        handleDataUrlChange={props.handleDataUrlChange}
        handleEmbedsUrlChange={props.handleEmbedsUrlChange}
        handleDownloadDataClick={props.handleDownloadDataClick}
      />
    )
  }

  const renderFileState = event => {
    return (
      <UploadFile parseEmbed={props.parseEmbed} parseCsv={props.parseCsv} />
    )
  }

  const handleURLClick = event => {
    setMainState("url")
    console.log('url')
  };

  const handleGalleryClick = event => {
    setMainState("gallery")
    console.log('gallery')
  };

  const handleFileClick = event => {
    console.log('file')
    setMainState("file")
  };

  return (
    <div>
    { (mainState === "initial" && renderInitialState()) ||
      (mainState === "url" && renderURLState()) ||
      (mainState === "gallery" && renderGalleryState()) ||
      (mainState === "file" && renderFileState()) }
    </div>
  )
}

export default UploadData