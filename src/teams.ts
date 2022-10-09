import { endpointMap } from "./common";
import { PaginationParameters } from "./types/pagination";
import {
  AccessRequestResponse,
  DeleteTeamReasons,
  InviteUserResponse,
  JoinedFrom,
  JoinTeamResponse,
  ListTeamMembersResponse,
  ListTeamsResponse,
  RequestAccessResponse,
  Role,
  Team,
  UpdateTeamRequestBody,
} from "./types/teams";
import { del, get, patch, post } from "./utils/fetch";

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
  role?: Role;
  uid?: string;
}) => {
  const { teamId, ...rest } = params;
  return post<InviteUserResponse>(endpointMap.inviteUser(teamId), {
    ...(Object.keys(rest).length > 0 && { data: rest }),
  });
};

export const joinTeam = (params: { teamId: string; inviteCode?: string }) => {
  const { teamId, inviteCode } = params;
  return post<JoinTeamResponse>(endpointMap.joinTeam(teamId), {
    ...(inviteCode && { data: { teamId, inviteCode } }),
  });
};

export const listTeamMembers = (
  params: {
    teamId: string;
    excludeProject?: string;
    role?: Role;
    search?: string;
    since?: number;
  } & PaginationParameters
) => {
  const { teamId, ...rest } = params;
  return get<ListTeamMembersResponse>(endpointMap.listTeamMembers(teamId), {
    ...(Object.keys(rest).length && { query: rest }),
  });
};

export const removeTeamMember = (params: {
  teamId: string;
  userId: string;
}) => {
  const { teamId, userId } = params;
  return del<{ id: string }>(
    endpointMap.removeTeamMember({
      teamId,
      userId,
    })
  );
};

export const requestAccessToTeam = (params: {
  teamId: string;
  joinedFrom: Pick<
    JoinedFrom,
    "origin" | "commitId" | "gitUserId" | "gitUserLogin" | "repoId" | "repoPath"
  >;
}) => {
  return post<RequestAccessResponse>(
    endpointMap.requestAccessToTeam(params.teamId)
  );
};

export const updateTeam = (
  params: {
    teamId: string;
  } & UpdateTeamRequestBody
) => {
  const { teamId, ...rest } = params;
  return patch<Team>(endpointMap.updateTeam(teamId), {
    ...(Object.keys(rest).length && { data: rest }),
  });
};

export const updateTeamMember = (params: {
  teamId: string;
  userId: string;
  confirmed?: boolean;
  joinedFrom?: Pick<JoinedFrom, "ssoUserId">;
  role?: Role;
}) => {
  const { teamId, userId, ...rest } = params;
  return patch<{ id: string }>(
    endpointMap.updateTeamMember({ teamId, userId }),
    {
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};
