import { endpointMap } from "./utils/common";
import { CreateAuthTokenResponse, TokensResponse } from "./types/authorization";
import {
  CreateAuthTokenParams,
  DeleteTokenParams,
  GetTokenMetadataParams,
} from "./types/authorization";
import { PaginationParameters } from "./types/pagination";
import { del, get, post } from "./utils/fetch";

export const listUserTokens = (paginationParameters?: PaginationParameters) => {
  return get<TokensResponse>(endpointMap.listUserTokens, {
    ...(paginationParameters && { query: paginationParameters }),
  });
};

export const createAuthToken = ({
  name,
  expiresAt,
  params,
}: CreateAuthTokenParams) => {
  return post<CreateAuthTokenResponse>(endpointMap.createAuthToken, {
    query: params,
    data: { name, expiresAt },
  });
};

export const deleteToken = ({ tokenId }: DeleteTokenParams) => {
  return del<Pick<CreateAuthTokenResponse, "token">>(
    `${endpointMap.deleteToken(tokenId)}`
  );
};

export const getTokenMetadata = ({ tokenId }: GetTokenMetadataParams) => {
  return get<Pick<CreateAuthTokenResponse, "token">>(
    `${endpointMap.getTokenMetadata(tokenId)}`
  );
};
