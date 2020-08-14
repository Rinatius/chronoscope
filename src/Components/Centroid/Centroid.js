import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { kdSearch } from "../../slices/searchAroundCentroid";
import { useDispatch, useSelector } from "react-redux";


const centroid = (props) => {

    const dispatch = useDispatch()
    const kdTree = useSelector(state => state.kdTree);
    const centroid = useSelector(state => state.centroid);
    const maxKDRadius = useSelector(state => state.maxKDRadius);
    const data = useSelector(state => state.data);
    const tagModeEnabled = useSelector(state => state.tagModeEnabled);
    const excludeTagNegtag = useSelector(state => state.excludeTagNegtag);


    const searchCentroidClick = () => {
        dispatch(kdSearch(kdTree, centroid, maxKDRadius, data, tagModeEnabled, excludeTagNegtag))
        //props.handleDownloadDataClick()
      }
    

    return(
        <div>
            <Button
                variant="contained"
                onClick={props.handleCalculateCentroidClick}>
                Calculate Centroid
            </Button>
            <TextField
                id="tag_field"
                label="Radius around centroid"
                type="number"
                onChange={props.handleRadiusChange}
                value={props.maxKDRadius} />
            <Button
                variant="contained"
                onClick={searchCentroidClick}>
                Search around current centroid
            </Button>
        </div>
      
    )
}

export default centroid