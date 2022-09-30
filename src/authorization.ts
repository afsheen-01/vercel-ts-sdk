import fetch from "node-fetch";
import { asyncFetchWrapper, config, endpointMap, debugMode } from "./common";
import { TokensResponse } from "./types/authorization";
import {
  constructPaginationString,
  PaginationParameters,
} from "./utils/pagination";

export const getUserTokens = (paginationParameters?: PaginationParameters) => {
  const url = constructPaginationString({
    url: endpointMap.userTokens,
    paginationParameters,
  });
  return asyncFetchWrapper<TokensResponse>(() =>
    fetch(url, {
      method: "get",
      headers: {
        ...config,
      },
    })
  );
};
