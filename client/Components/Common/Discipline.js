import React from "react";
import DisciplineIcon from "./DisciplineIcon";

const getName = (disciplineName) => {
  return disciplineName[0].toUpperCase() + disciplineName.substr(1);
}

const Discipline = ({ value }) => (
  <span>
    <DisciplineIcon value={value} />
    { getName(value) }
  </span>
);

export default Discipline;