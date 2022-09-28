import fetch from "node-fetch";
import { asyncFetchWrapper, config, endpointMap } from "./common";
import { TokensResponse } from "./types/authorization";

export const getUserTokens = () => {
  const url = endpointMap.userTokens;
  return asyncFetchWrapper<TokensResponse>(() =>
    fetch(url, {
      method: "get",
      headers: {
        ...config,
      },
    })
  );
};
