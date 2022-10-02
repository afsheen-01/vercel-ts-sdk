import { config, endpointMap, debugMode } from "./common";
import { CreateAuthTokenResponse, TokensResponse } from "./types/authorization";
import { asyncFetchWrapper, CustomError, del, get, post } from "./utils/fetch";
import {
  constructPaginationString,
  PaginationParameters,
} from "./utils/pagination";

export const getUserTokens = (paginationParameters?: PaginationParameters) => {
  return get<TokensResponse>(
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
  return post<CreateAuthTokenResponse>(endpointMap.createToken, {
    query: params,
    data: { name, expiresAt },
  });
};

export const deleteToken = ({ tokenId }: { tokenId: string }) => {
  if (!tokenId)
    throw new CustomError({
      message: "`tokenId` cannot be empty",
    });
  return del<Pick<CreateAuthTokenResponse, "token">>(
    `${endpointMap.deleteToken}/${tokenId}`
  );
};
