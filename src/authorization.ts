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
  if (debugMode) console.log("call made to url", url);
  return asyncFetchWrapper<TokensResponse>(() =>
    fetch(url, {
      method: "get",
      headers: {
        ...config,
      },
    })
  );
};

/* 
getUserTokens()
getUserTokens({ limit })
getUserTokens({ limit, next })
getUserTokens({ limit, prev })
getUserTokens({ prev })
getUserTokens({ next })
*/
