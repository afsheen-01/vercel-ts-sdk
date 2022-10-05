import { endpointMap } from "./common";
import {
  ListAliasQueryParams,
  ListAliasesResponse,
  DeploymentAliasesResponse,
  Alias,
  NewAlias,
} from "./types";
import { del, get, post } from "./utils/fetch";

export const listAliases = (params?: ListAliasQueryParams) => {
  return get<ListAliasesResponse>(endpointMap.listAliases, {
    ...(params && { query: params }),
  });
};

export const listDeploymentAliases = (params: {
  id: string;
  teamId?: string;
}) => {
  const { id, teamId } = params;
  return get<DeploymentAliasesResponse>(endpointMap.listDeploymentAliases(id), {
    ...(teamId && { query: { teamId } }),
  });
};

export const getAlias = (params: {
  id: string;
  from?: number;
  projectId?: string;
  since?: number;
  teamId?: string;
  until?: number;
}) => {
  const { id, ...rest } = params;
  return get<Alias>(endpointMap.getAlias(id), {
    ...(rest && { query: rest }),
  });
};

export const deleteAlias = (params: { id: string; teamId?: string }) => {
  const { id, teamId } = params;
  return del<{ status: "SUCCESS" }>(endpointMap.deleteAlias(id), {
    ...(teamId && { query: { teamId } }),
  });
};

export const assignAlias = (params: {
  id: string;
  teamId?: string;
  alias?: string;
  redirect?: string;
}) => {
  const { id, teamId, ...data } = params;
  return post<NewAlias>(endpointMap.assignAlias(id), {
    ...(teamId && { query: { teamId } }),
    ...(data && { data }),
  });
};
