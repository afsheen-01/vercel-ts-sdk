import { endpointMap } from "./common";
import {
  ListAliasQueryParams,
  ListAliasesResponse,
  DeploymentAliasesResponse,
  GetAliasResponse,
  NewAliasResponse,
} from "./types/alias";
import {
  AssignAliasParams,
  DeleteAliasParams,
  GetAliasParams,
  ListDeploymentAliasesParams,
} from "./types/alias";
import { del, get, post } from "./utils/fetch";

export const listAliases = (params?: ListAliasQueryParams) => {
  return get<ListAliasesResponse>(endpointMap.listAliases, {
    ...(params && { query: params }),
  });
};

export const listDeploymentAliases = (params: ListDeploymentAliasesParams) => {
  const { deploymentId, teamId } = params;
  return get<DeploymentAliasesResponse>(
    endpointMap.listDeploymentAliases(deploymentId),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const getAlias = (params: GetAliasParams) => {
  const { aliasId, ...rest } = params;
  return get<GetAliasResponse>(endpointMap.getAlias(aliasId), {
    ...(rest && { query: rest }),
  });
};

export const deleteAlias = (params: DeleteAliasParams) => {
  const { aliasId, teamId } = params;
  return del<{ status: "SUCCESS" }>(endpointMap.deleteAlias(aliasId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const assignAlias = (params: AssignAliasParams) => {
  const { aliasId, teamId, ...data } = params;
  return post<NewAliasResponse>(endpointMap.assignAlias(aliasId), {
    ...(teamId && { query: { teamId } }),
    ...(data && { data }),
  });
};
