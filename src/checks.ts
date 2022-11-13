import {
  CreateNewCheckParams,
  CreateNewCheckResponse,
  GetCheckParams,
  GetCheckResponse,
} from "./types/checks";
import { endpointMap } from "./utils/common";
import { get, post } from "./utils/fetch";

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
