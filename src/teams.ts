import { endpointMap } from "./common";
import { PaginationParameters } from "./types/pagination";
import {
  AccessRequestResponse,
  DeleteTeamReasons,
  InviteUserResponse,
  ListTeamsResponse,
  Team,
} from "./types/teams";
import { del, get, post } from "./utils/fetch";

export const listTeams = (
  params?: {
    since?: number;
  } & PaginationParameters
) => {
  return get<ListTeamsResponse>(endpointMap.listTeams, {
    ...(Object.keys(params || {}).length > 0 && { query: params }),
  });
};

export const createTeam = (params: { slug: string; name?: string }) => {
  return post<{ id: string }>(endpointMap.createTeam, {
    data: params,
  });
};

export const deleteTeam = (params: {
  teamId: string;
  reasons?: DeleteTeamReasons[];
}) => {
  const { teamId, reasons } = params;
  return del<{ id: string }>(endpointMap.deleteTeam(teamId), {
    ...(reasons?.length && { data: { reasons } }),
  });
};

export const deleteTeamInviteCode = (params: {
  teamId: string;
  inviteId: string;
}) => {
  return del<{ id: string }>(endpointMap.deleteTeamInviteCode(params));
};

export const getTeam = (params: { teamId: string }) => {
  return get<Team>(endpointMap.getTeam(params.teamId));
};

export const getAccessRequestStatus = (params: {
  teamId: string;
  userId: string;
}) => {
  return get<AccessRequestResponse>(endpointMap.getAccessRequestStatus(params));
};

export const inviteUser = (params: {
  teamId: string;
  email?: string;
  role?: string;
  uid?: string;
}) => {
  const { teamId, ...rest } = params;
  return post<InviteUserResponse>(endpointMap.inviteUser(teamId), {
    ...(Object.keys(rest).length > 0 && { data: rest }),
  });
};
