import _ from "lodash";

export const lgFilter = ["run", "bike", "swim", "caloric"]

export const smFilter = ["run", "bike", "swim"]

export function mapFilter(disciplines) {
  return lgFilter.map(f => _.find(disciplines, x => x.name === f));
}

export function getClassName(disc){
  const result = _.some(smFilter, x => x === disc);
  return result ? "" : "hidden-xs"; 
}