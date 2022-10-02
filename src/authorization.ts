import { config, endpointMap, debugMode } from "./common";
import { TokensResponse } from "./types/authorization";
import { asyncFetchWrapper, CustomError, get, post } from "./utils/fetch";
import {
  constructPaginationString,
  PaginationParameters,
} from "./utils/pagination";

export const getUserTokens = (paginationParameters?: PaginationParameters) => {
  return get(
    constructPaginationString({
      url: endpointMap.userTokens,
      paginationParameters,
    })
  );
};

export const createAuthToken = ({
  name,
  expiresAt,
  params,
}: {
  name: string;
  expiresAt?: number;
  params?: { teamId: string };
}) => {
  if (!name)
    throw new CustomError({
      message: "`name` cannot be empty",
    });
  return post(endpointMap.createToken, {
    query: params,
    data: { name, expiresAt },
  });
};
