import { connectionDefinitions } from "graphql-relay";
import activityType from "./activity"

export default connectionDefinitions({
    name: 'Activity',
    nodeType: activityType
});
