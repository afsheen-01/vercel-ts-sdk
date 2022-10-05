import { get } from "./utils/fetch";
import { endpointMap } from "./common";
import { DeploymentList } from "./types/deployment";

export const getDeploymentsList = () => {
  return get<DeploymentList>(endpointMap.listDeployment);
};
