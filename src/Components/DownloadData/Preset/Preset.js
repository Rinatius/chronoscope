import React from 'react'
import Grid from '@material-ui/core/Grid'

import Card from '../Card'
import { fetchTable } from "../../../slices/initData";
import { useDispatch } from "react-redux";

const Preset = (props) => {
  const dispatch = useDispatch()
  const onCardClick = (url) => {
    dispatch(fetchTable(url))
    //props.handleDownloadDataClick()
  }
  
  return (
    <Grid container display="flex" justify="center">
      {props.listOfUrls.map((r, i) => <Grid item key={i}><Card key={i} handleClick={() => onCardClick(r.tsv)} title={r.title} width={"200px"} image={'/static/images/grid-list/breakfast.jpg'} /></Grid>)}
    </Grid>
  )
};

export default Preset