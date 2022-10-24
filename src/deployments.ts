import { get } from "./utils/fetch";
import { endpointMap } from "./common";
import {
  DeploymentListResponse,
  ListDeploymentFilesResponse,
  ListDeploymentsParams,
} from "./types/deployment";

export const listDeployments = (params?: ListDeploymentsParams) => {
  return get<DeploymentListResponse>(endpointMap.listDeployments, {
    query: params,
  });
};

export const listDeploymentFiles = (params: {
  deploymentId: string;
  teamId?: string;
}) => {
  const { deploymentId, teamId } = params;
  return get<ListDeploymentFilesResponse>(
    endpointMap.listDeploymentFiles(deploymentId),
    { ...(teamId && { query: { teamId } }) }
  );
};
