import { get } from "./utils/fetch";
import { endpointMap } from "./common";
import { DeploymentList } from "./types/deployment";

type ListDeploymentsParams = {
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

export const listDeployments = (params?: ListDeploymentsParams) => {
  return get<DeploymentList>(endpointMap.listDeployments, {
    query: params,
  });
};
