import {
  DeleteIntegrationConfigParams,
  GetIntegrationConfigParams,
  GetIntegrationConfigResponse,
  ListGitNamespacesParams,
  ListGitNamespacesResponse,
  ListGitReposParams,
  ListGitReposResponse,
  ListIntegrationConfigsParams,
  ListIntegrationConfigsResponse,
} from "./types/integrations";
import { endpointMap } from "./utils/common";
import { del, get } from "./utils/fetch";

export const deleteIntegrationConfig = (
  params: DeleteIntegrationConfigParams
) => {
  const { integrationId, teamId } = params;
  return del<{}>(endpointMap.deleteIntegrationConfig(integrationId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const listIntegrationConfigs = (
  params: ListIntegrationConfigsParams
) => {
  return get<ListIntegrationConfigsResponse>(
    endpointMap.listIntegrationConfigs,
    {
      query: params,
    }
  );
};

export const listGitNamespaces = (params: ListGitNamespacesParams) => {
  return get<ListGitNamespacesResponse>(endpointMap.listGitNamespaces, {
    query: params,
  });
};

export const listGitRepos = (params: ListGitReposParams) => {
  return get<ListGitReposResponse>(endpointMap.listGitRepos, {
    query: params,
  });
};

export const getIntegrationConfig = (params: GetIntegrationConfigParams) => {
  const { integrationId, teamId } = params;
  return get<GetIntegrationConfigResponse>(
    endpointMap.getIntegrationConfig(integrationId),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};
