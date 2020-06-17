import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const centroid = props => {
  return (
    <div>
      <Button variant="contained" onClick={props.handleCalculateCentroidClick}>
        Calculate Centroid
      </Button>
      <TextField
        id="tag_field"
        label="Radius around centroid"
        type="number"
        onChange={props.handleRadiusChange}
        value={props.maxKDRadius}
      />
      <Button variant="contained" onClick={props.handleNNSearchClick}>
        Search around current centroid
      </Button>
    </div>
  );
};

export default centroid;
