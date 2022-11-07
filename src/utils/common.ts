export let debugMode = process.env?.DEBUG === "true";

export let config: {
  [key: string]: string;
} = {
  "Content-Type": "application/json",
};

export const setVercelToken = (token: string) => {
  config = {
    ...config,
    Authorization: `Bearer ${token}`,
  };
};

export const BASE_URL = "https://api.vercel.com";

export const endpointMap = {
  getUserTokens: `${BASE_URL}/v5/user/tokens`,
  createAuthToken: `${BASE_URL}/v3/user/tokens`,
  deleteToken: (id: string) => `${BASE_URL}/v3/user/tokens/${id}`,
  getTokenMetadata: (tokenId: string) =>
    `${BASE_URL}/v5/user/tokens/${tokenId}`,
  getUser: `${BASE_URL}/v2/user`,
  getUserEvents: `${BASE_URL}/v3/events`,
  deleteUser: `${BASE_URL}/v1/user`,
  listDeployments: `${BASE_URL}/v6/deployments`,
  listAliases: `${BASE_URL}/v4/aliases`,
  listDeploymentAliases: (id: string) =>
    `${BASE_URL}/v2/deployments/${id}/aliases`,
  getAlias: (id: string) => `${BASE_URL}/v4/aliases/${id}`,
  deleteAlias: (id: string) => `${BASE_URL}/v2/aliases/${id}`,
  assignAlias: (id: string) => `${BASE_URL}/v2/deployments/${id}/aliases`,
  listTeams: `${BASE_URL}/v2/teams`,
  createTeam: `${BASE_URL}/v1/teams`,
  deleteTeam: (teamId: string) => `${BASE_URL}/v1/teams/${teamId}`,
  deleteTeamInviteCode: (params: { teamId: string; inviteId: string }) =>
    `${BASE_URL}/v1/teams/${params.teamId}/invites/${params.inviteId}`,
  getTeam: (teamId: string) => `${BASE_URL}/v2/teams/${teamId}`,
  getAccessRequestStatus: (params: { teamId: string; userId: string }) =>
    `${BASE_URL}/v1/teams/${params.teamId}/request/${params.userId}`,
  inviteUser: (teamId: string) => `${BASE_URL}/v1/teams/${teamId}/members`,
  joinTeam: (teamId: string) =>
    `${BASE_URL}/v1/teams/${teamId}/members/teams/join`,
  listTeamMembers: (teamId: string) => `${BASE_URL}/v2/teams/${teamId}/members`,
  removeTeamMember: (params: { teamId: string; userId: string }) =>
    `${BASE_URL}/v1/teams/${params.teamId}/members/${params.userId}`,
  updateTeamMember: (params: { teamId: string; userId: string }) =>
    `${BASE_URL}/v1/teams/${params.teamId}/members/${params.userId}`,
  requestAccessToTeam: (teamId: string) =>
    `${BASE_URL}/v1/teams/${teamId}/request`,
  updateTeam: (teamId: string) => `${BASE_URL}/v2/teams/${teamId}`,
  uploadCert: `${BASE_URL}/v7/certs`,
  getCert: (certId: string) => `${BASE_URL}/v7/certs/${certId}`,
  deleteCert: (certId: string) => `${BASE_URL}/v7/certs/${certId}`,
  issueCert: `${BASE_URL}/v7/certs`,
  addDomainToProject: (idOrName: string) =>
    `${BASE_URL}/v9/projects/${idOrName}/domains`,
  createNewProject: `${BASE_URL}/v9/projects`,
  createEnvVars: (projectId: string) =>
    `${BASE_URL}/v9/projects/${projectId}/env`,
  deleteProject: (projectId: string) => `${BASE_URL}/v9/projects/${projectId}`,
  editEnvVar: (params: { projectId: string; envId: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/env/${params.envId}`,
  findProjectById: (projectId: string) =>
    `${BASE_URL}/v9/projects/${projectId}`,
  getProjectDomain: (params: { projectId: string; domain: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/domains/${params.domain}`,
  removeProjectDomain: (params: { projectId: string; domain: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/domains/${params.domain}`,
  removeEnvVar: (params: { projectId: string; envKeyOrId: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/env/${params.envKeyOrId}`,
  listProjects: `${BASE_URL}/v9/projects`,
  listProjectDomains: (projectId: string) =>
    `${BASE_URL}/v9/projects/${projectId}/domains`,
  getEnvVarValue: (params: { projectId: string; envId: string }) =>
    `${BASE_URL}/v1/projects/${params.projectId}/env/${params.envId}`,
  listtEnvVars: (projectId: string) =>
    `${BASE_URL}/v9/projects/${projectId}/env`,
  updateProjectDomain: (params: { projectId: string; domain: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/domains/${params.domain}`,
  updateProject: (projectId: string) => `${BASE_URL}/v9/projects/${projectId}`,
  verifyProjectDomain: (params: { projectId: string; domain: string }) =>
    `${BASE_URL}/v9/projects/${params.projectId}/domains/${params.domain}/verify`,
};

export const nullIfUndefined = (val: any) => {
  if (val === undefined) {
    return null;
  } else {
    return val;
  }
};
