import { get } from "./utils/fetch";
import { endpointMap } from "./common";
import {
  DeploymentListResponse,
  GetDeploymentEventParams,
  GetDeploymentEventsResponse,
  GetDeploymentResponse,
  ListDeploymentBuildsResponse,
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

export const listDeploymentBuilds = (params: {
  deploymentId: string;
  teamId?: string;
}) => {
  const { deploymentId, teamId } = params;
  return get<ListDeploymentBuildsResponse>(
    endpointMap.listDeploymentBuilds(deploymentId),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const getDeploymentEvents = (params: GetDeploymentEventParams) => {
  const { deploymentIdOrUrl, ...rest } = params;
  return get<GetDeploymentEventsResponse>(
    endpointMap.getDeploymentEvents(deploymentIdOrUrl),
    {
      ...(rest && { query: rest }),
    }
  );
};

export const getDeployment = (params: {
  deploymentIdOrUrl: string;
  teamId?: string;
}) => {
  const { deploymentIdOrUrl, teamId } = params;
  return get<GetDeploymentResponse>(
    endpointMap.getDeployment(deploymentIdOrUrl),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const getDeploymentFileContents = (params: {
  deploymentId: string;
  fileId: string;
  teamId?: string;
}) => {
  const { deploymentId, fileId, teamId } = params;
  return get<{}>(endpointMap.getDeploymentFileContents(deploymentId, fileId), {
    ...(teamId && { query: { teamId } }),
  });
};
