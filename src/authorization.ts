import fetch from "node-fetch";
import { asyncFetchWrapper, config, endpointMap } from "./common";
import { TokensResponse } from "./types/authorization";

type PaginationParameters = {
  next?: number;
  previous?: number;
  limit?: number
}

export const getUserTokens = (paginationParameters?: PaginationParameters) => {

  let url = endpointMap.userTokens;
  if (paginationParameters) {
    const { limit, next, previous } = paginationParameters
    if (limit) {
      url = url + `?limit=${limit}`
    }
    if (next) {
      url = url + `?until=${next}`
    } else if (previous) {
      url = url + `until=${previous}`
    }
  }
  return asyncFetchWrapper<TokensResponse>(() =>

    fetch(url, {
      method: "get",
      headers: {
        ...config,
      },
    })
  );
};
