import { endpointMap } from "./common";
import {
  AccessRequestResponse,
  CreateTeamParams,
  DeleteTeamInviteCodeParams,
  DeleteTeamParams,
  GetAccessRequestStatusParams,
  GetTeamParams,
  InviteUserParams,
  InviteUserResponse,
  JoinTeamParams,
  JoinTeamResponse,
  ListTeamMembersParams,
  ListTeamMembersResponse,
  ListTeamsParams,
  ListTeamsResponse,
  RemoveTeamMemberParams,
  RequestAccessResponse,
  RequestAccessToTeamParams,
  Team,
  UpdateTeamMemberParams,
  UpdateTeamParams,
} from "./types/teams";
import { del, get, patch, post } from "./utils/fetch";

export const listTeams = (params?: ListTeamsParams) => {
  return get<ListTeamsResponse>(endpointMap.listTeams, {
    ...(Object.keys(params || {}).length > 0 && { query: params }),
  });
};

export const createTeam = (params: CreateTeamParams) => {
  return post<{ id: string }>(endpointMap.createTeam, {
    data: params,
  });
};

export const deleteTeam = (params: DeleteTeamParams) => {
  const { teamId, reasons } = params;
  return del<{ id: string }>(endpointMap.deleteTeam(teamId), {
    ...(reasons?.length && { data: { reasons } }),
  });
};

export const deleteTeamInviteCode = (params: DeleteTeamInviteCodeParams) => {
  return del<{ id: string }>(endpointMap.deleteTeamInviteCode(params));
};

export const getTeam = (params: GetTeamParams) => {
  return get<Team>(endpointMap.getTeam(params.teamId));
};

export const getAccessRequestStatus = (
  params: GetAccessRequestStatusParams
) => {
  return get<AccessRequestResponse>(endpointMap.getAccessRequestStatus(params));
};

export const inviteUser = (params: InviteUserParams) => {
  const { teamId, ...rest } = params;
  return post<InviteUserResponse>(endpointMap.inviteUser(teamId), {
    ...(Object.keys(rest).length > 0 && { data: rest }),
  });
};

export const joinTeam = (params: JoinTeamParams) => {
  const { teamId, inviteCode } = params;
  return post<JoinTeamResponse>(endpointMap.joinTeam(teamId), {
    ...(inviteCode && { data: { teamId, inviteCode } }),
  });
};

export const listTeamMembers = (params: ListTeamMembersParams) => {
  const { teamId, ...rest } = params;
  return get<ListTeamMembersResponse>(endpointMap.listTeamMembers(teamId), {
    ...(Object.keys(rest).length && { query: rest }),
  });
};

export const removeTeamMember = (params: RemoveTeamMemberParams) => {
  const { teamId, userId } = params;
  return del<{ id: string }>(
    endpointMap.removeTeamMember({
      teamId,
      userId,
    })
  );
};

export const requestAccessToTeam = (params: RequestAccessToTeamParams) => {
  return post<RequestAccessResponse>(
    endpointMap.requestAccessToTeam(params.teamId),
    {
      data: { joinedFrom: params?.joinedFrom },
    }
  );
};

export const updateTeam = (params: UpdateTeamParams) => {
  const { teamId, ...rest } = params;
  return patch<Team>(endpointMap.updateTeam(teamId), {
    ...(Object.keys(rest).length && { data: rest }),
  });
};

export const updateTeamMember = (params: UpdateTeamMemberParams) => {
  const { teamId, userId, ...rest } = params;
  return patch<{ id: string }>(
    endpointMap.updateTeamMember({ teamId, userId }),
    {
      ...(Object.keys(rest).length && { data: rest }),
    }
  );
};
