import _ from "lodash";

export const lgFilter = ["swim", "bike", "run", "caloric"];

export const smFilter = ["swim", "bike", "run"];

export function mapFilter(disciplines) {
  return lgFilter.map(f => _.find(disciplines, x => x.name === f));
}

export function getClassName(disc){
  const result = _.some(smFilter, x => x === disc);
  return result ? "" : "d-none d-sm-table-cell"; 
}