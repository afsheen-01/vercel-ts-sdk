import fetch from "node-fetch";
import { asyncFetchWrapper, config, endpointMap, debugMode } from "./common";
import { TokensResponse } from "./types/authorization";
import {
  constructPaginationString,
  PaginationParameters,
} from "./utils/pagination";
import { constructQueryString } from "./utils/url";

export const getUserTokens = (paginationParameters?: PaginationParameters) => {
  const url = constructPaginationString({
    url: endpointMap.userTokens,
    paginationParameters,
  });
  return asyncFetchWrapper<TokensResponse>(url, {
    method: "get",
    headers: {
      ...config,
    },
  });
};

export const createAuthToken = (params?: { teamId: string }) => {
  const url = constructQueryString(endpointMap.createToken, params);
  return asyncFetchWrapper<TokensResponse>(url, {
    method: "post",
    headers: {
      ...config,
    },
    body: JSON.stringify({name: "test"}),
  });
};
