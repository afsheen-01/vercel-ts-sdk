import { get } from "./utils/fetch";
import { endpointMap } from "./common";
import { DeploymentList } from "./types/deployment";

type listDeploymentParams = {
  app?: string;
  from?: number;
  limit?: number;
  projectId?: string;
  rollbackCandidate: boolean;
  since?: number;
  state?:
    | "BUILDING"
    | " ERROR"
    | "INITIALIZING"
    | " QUEUED"
    | "READY"
    | "CANCELED";
  target?: string;
  teamId?: string;
  to?: number;
  until?: number;
  users?: string;
};

export const listDeployment = (params?: listDeploymentParams) => {
  return get<DeploymentList>(endpointMap.deploymentList, {
    query: params,
  });
};
