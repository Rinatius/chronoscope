import React from "react";

const bigTable = (props) => {
  return (props.children);
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.bigArray === nextProps.bigArray;
}
export default React.memo(bigTable, areEqual);