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
  // alias
  listAliases: `/v4/aliases`,
  listDeploymentAliases: (id: string) => `/v2/deployments/${id}/aliases`,
  getAlias: (id: string) => `/v4/aliases/${id}`,
  deleteAlias: (id: string) => `/v2/aliases/${id}`,
  assignAlias: (id: string) => `/v2/deployments/${id}/aliases`,

  // artifacts
  checkArtifactExists: (hash: string) => `/v8/artifacts/${hash}`,
  downloadCacheArtifact: (hash: string) => `/v8/artifacts/${hash}`,
  getRemoteCachingStatus: `/v8/artifacts/status`,
  recordCacheUsageEvent: `/v8/artifacts/events`,
  uploadCacheArtifact: (hash: string) => `/v8/artifacts/${hash}`,

  // authentication
  listUserTokens: `/v5/user/tokens`,
  createAuthToken: `/v3/user/tokens`,
  deleteToken: (id: string) => `/v3/user/tokens/${id}`,
  getTokenMetadata: (tokenId: string) => `/v5/user/tokens/${tokenId}`,
  listAuthTokens: `/v5/user/tokens`,
  loginWithEmail: `/registration`,
  verifyLoginRequest: `/registration/verify`,

  // certs
  uploadCert: `/v7/certs`,
  getCert: (certId: string) => `/v7/certs/${certId}`,
  deleteCert: (certId: string) => `/v7/certs/${certId}`,
  issueCert: `/v7/certs`,

  // checks
  createNewCheck: (deploymentId: string) =>
    `/v1/deployments/${deploymentId}/checks`,
  getCheck: (params: { deploymentId: string; checkId: string }) =>
    `/v1/deployments/${params.deploymentId}/checks/${params.checkId}`,
  reRequestCheck: (params: { deploymentId: string; checkId: string }) =>
    `/v1/deployments/${params.deploymentId}/checks/${params.checkId}/rerequest`,
  listChecks: (deploymentId: string) =>
    `/v1/deployments/${deploymentId}/checks`,
  updateCheck: (params: { deploymentId: string; checkId: string }) =>
    `/v1/deployments/${params.deploymentId}/checks/${params.checkId}`,

  // deployments TODO
  listDeployments: `/v6/deployments`,

  // dns
  createDNSRecord: (domain: string) => `/v2/domains/${domain}/records`,
  deleteDNSRecord: (params: { domain: string; recordId: string }) =>
    `/v2/domains/${params.domain}/records/${params.recordId}`,
  listDNSRecords: (domain: string) => `/v4/domains/${domain}/records`,

  // domains
  checkDomainAvailability: `/v4/domains/status`,
  checkDomainPrice: `/v4/domains/price`,
  getDomainInfo: (domain: string) => `/v5/domains/${domain}`,
  getDomainConfig: (domain: string) => `/v6/domains/${domain}/config`,
  listDomains: `/v5/domains`,
  purchaseDomain: `/v4/domains/buy`,
  registerOrTransferDomain: `/v4/domains`,
  removeDomain: (domain: string) => `/v6/domains/${domain}`,

  // integrations
  deleteIntegrationConfig: (integrationId: string) =>
    `/v1/integrations/configuration/${integrationId}`,
  listIntegrationConfigs: `/v1/integrations/configurations`,
  listGitNamespaces: `/v1/integrations/git-namespaces`,
  listGitRepos: `/v1/integrations/search-repo`,
  getIntegrationConfig: (integrationId: string) =>
    `/v1/integrations/configuration/${integrationId}`,

  // log drains
  // TODO

  // projects
  addDomainToProject: (idOrName: string) => `/v9/projects/${idOrName}/domains`,
  createNewProject: `/v9/projects`,
  createEnvVars: (projectId: string) => `/v9/projects/${projectId}/env`,
  deleteProject: (projectId: string) => `/v9/projects/${projectId}`,
  editEnvVar: (params: { projectId: string; envId: string }) =>
    `/v9/projects/${params.projectId}/env/${params.envId}`,
  findProjectById: (projectId: string) => `/v9/projects/${projectId}`,
  getProjectDomain: (params: { projectId: string; domain: string }) =>
    `/v9/projects/${params.projectId}/domains/${params.domain}`,
  removeProjectDomain: (params: { projectId: string; domain: string }) =>
    `/v9/projects/${params.projectId}/domains/${params.domain}`,
  removeEnvVar: (params: { projectId: string; envKeyOrId: string }) =>
    `/v9/projects/${params.projectId}/env/${params.envKeyOrId}`,
  listProjects: `/v9/projects`,
  listProjectDomains: (projectId: string) =>
    `/v9/projects/${projectId}/domains`,
  getEnvVarValue: (params: { projectId: string; envId: string }) =>
    `/v1/projects/${params.projectId}/env/${params.envId}`,
  listEnvVars: (projectId: string) => `/v9/projects/${projectId}/env`,
  updateProjectDomain: (params: { projectId: string; domain: string }) =>
    `/v9/projects/${params.projectId}/domains/${params.domain}`,
  updateProject: (projectId: string) => `/v9/projects/${projectId}`,
  verifyProjectDomain: (params: { projectId: string; domain: string }) =>
    `/v9/projects/${params.projectId}/domains/${params.domain}/verify`,

  // teams
  listTeams: `/v2/teams`,
  createTeam: `/v1/teams`,
  deleteTeam: (teamId: string) => `/v1/teams/${teamId}`,
  deleteTeamInviteCode: (params: { teamId: string; inviteId: string }) =>
    `/v1/teams/${params.teamId}/invites/${params.inviteId}`,
  getTeam: (teamId: string) => `/v2/teams/${teamId}`,
  getAccessRequestStatus: (params: { teamId: string; userId?: string }) =>
    `/v1/teams/${params.teamId}/request/${params?.userId || ""}`,
  inviteUser: (teamId: string) => `/v1/teams/${teamId}/members`,
  joinTeam: (teamId: string) => `/v1/teams/${teamId}/members/teams/join`,
  listTeamMembers: (teamId: string) => `/v2/teams/${teamId}/members`,
  removeTeamMember: (params: { teamId: string; userId: string }) =>
    `/v1/teams/${params.teamId}/members/${params.userId}`,
  updateTeamMember: (params: { teamId: string; userId: string }) =>
    `/v1/teams/${params.teamId}/members/${params.userId}`,
  requestAccessToTeam: (teamId: string) => `/v1/teams/${teamId}/request`,
  updateTeam: (teamId: string) => `/v2/teams/${teamId}`,

  // users
  getUser: `/v2/user`,
  getUserEvents: `/v3/events`,
  deleteUser: `/v1/user`,
};

export const nullIfUndefined = (val: any) => {
  if (val === undefined) {
    return null;
  } else {
    return val;
  }
};
