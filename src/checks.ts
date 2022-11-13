import {
  CreateNewCheckParams,
  CreateNewCheckResponse,
  GetCheckParams,
  GetCheckResponse,
  ListChecksParams,
  ListChecksResponse,
  ReRequestCheckParams,
  ReRequestCheckResponse,
  UpdateCheckParams,
  UpdateCheckResponse,
} from "./types/checks";
import { endpointMap } from "./utils/common";
import { get, patch, post } from "./utils/fetch";

export const createNewCheck = (params: CreateNewCheckParams) => {
  const { deploymentId, teamId, ...rest } = params;
  return post<CreateNewCheckResponse>(
    endpointMap.createNewCheck(deploymentId),
    {
      ...(teamId && { query: { teamId } }),
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};

export const getCheck = (params: GetCheckParams) => {
  const { deploymentId, checkId, teamId } = params;
  return get<GetCheckResponse>(
    endpointMap.getCheck({
      deploymentId,
      checkId,
    }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const reRequestCheck = (params: ReRequestCheckParams) => {
  const { deploymentId, checkId, teamId } = params;
  return post<ReRequestCheckResponse>(
    endpointMap.reRequestCheck({
      deploymentId,
      checkId,
    }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const listChecks = (params: ListChecksParams) => {
  const { deploymentId, teamId } = params;
  return get<ListChecksResponse>(endpointMap.listChecks(deploymentId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const updateCheck = (params: UpdateCheckParams) => {
  const { deploymentId, checkId, teamId, ...rest } = params;
  return patch<UpdateCheckResponse>(
    endpointMap.updateCheck({
      deploymentId,
      checkId,
    }),
    {
      ...(teamId && { query: { teamId } }),
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};
