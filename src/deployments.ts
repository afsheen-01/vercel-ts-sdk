import { get } from "./utils/fetch";
import { endpointMap } from "./utils/common";
import { DeploymentList, ListDeploymentsParams } from "./types/deployment";

export const listDeployments = (params?: ListDeploymentsParams) => {
  return get<DeploymentList>(endpointMap.listDeployments, {
    query: params,
  });
};
