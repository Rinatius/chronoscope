import React from 'react';
import {useSelector} from 'react-redux';
import Mapping from './SingleMappingComponent';

const MappingsComponent = () => {
  const mappings = useSelector(state => state.mappings);

  let output = <div></div>

  if (Object.keys(mappings).length !== 0 && mappings.constructor === Object) {
    output = Object.keys(mappings).map(m =>
      <Mapping key={m} mappingName={m}/>)
  }
  return output
};

export default MappingsComponent;