import fetch, { RequestInit, RequestInfo } from "node-fetch";

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
  deleteToken: `${BASE_URL}/v3/user/tokens`,
};

export const nullIfUndefined = (val: any) => {
  if (val === undefined) {
    return null;
  } else {
    return val;
  }
};
