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
  userTokens: `${BASE_URL}/v5/user/tokens`,
  createToken: `${BASE_URL}/v3/user/tokens`,
  deleteToken: (id: string) => `${BASE_URL}/v3/user/tokens/${id}`,
  getTokenMetadata: `${BASE_URL}/v5/user/tokens`,
  getUser: `${BASE_URL}/v2/user`,
  getUserEvents: `${BASE_URL}/v3/events`,
  deleteUser: `${BASE_URL}/v1/user`,
  deploymentList: `${BASE_URL}/v6/deployments`,
  listAliases: `${BASE_URL}/v4/aliases`,
  listDeploymentAliases: (id: string) =>
    `${BASE_URL}/v2/deployments/${id}/aliases`,
  getAlias: (id: string) => `${BASE_URL}/v4/aliases/${id}`,
  deleteAlias: (id: string) => `${BASE_URL}/v2/aliases/${id}`,
  assignAlias: (id: string) => `${BASE_URL}/v2/deployments/${id}/aliases`,
};

export const nullIfUndefined = (val: any) => {
  if (val === undefined) {
    return null;
  } else {
    return val;
  }
};
