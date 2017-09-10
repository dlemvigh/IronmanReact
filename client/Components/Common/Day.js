import React from "react";
import moment from "moment";

export default ({value}) => {
  return <span>{moment(value).format("dddd")}</span>;
};