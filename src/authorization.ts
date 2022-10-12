import { endpointMap } from "./common";
import { CreateAuthTokenResponse, TokensResponse } from "./types";
import { PaginationParameters } from "./types/pagination";
import { CustomError, del, get, post } from "./utils/fetch";

export const getUserTokens = (paginationParameters?: PaginationParameters) => {
  return get<TokensResponse>(endpointMap.userTokens, {
    ...(paginationParameters && { query: paginationParameters }),
  });
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
    `${endpointMap.deleteToken(tokenId)}`
  );
};

export const getTokenMetadata = ({ tokenId }: { tokenId: string }) => {
  if (!tokenId)
    throw new CustomError({
      message: "`tokenId` cannot be empty",
    });
  return get<Pick<CreateAuthTokenResponse, "token">>(
    `${endpointMap.getTokenMetadata}/${tokenId}`
  );
};
