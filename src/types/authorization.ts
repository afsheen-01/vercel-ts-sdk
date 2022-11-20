import { Pagination } from "./pagination";

/** Authentication token metadata. */
interface AuthToken {
  /** The unique identifier of the token. */
  id: string;
  /** The human-readable name of the token. */
  name: string;
  /** The type of the token. */
  type: string;
  /** The origin of how the token was created. */
  origin?: string;
  /** The access scopes granted to the token. */
  scopes?: (
    | {
        type: "user";
        origin: "saml" | "github" | "gitlab" | "bitbucket" | "email" | "manual";
        createdAt: number;
        expiresAt?: number;
      }
    | {
        type: "team";
        teamId: string;
        origin: "saml" | "github" | "gitlab" | "bitbucket" | "email" | "manual";
        createdAt: number;
        expiresAt?: number;
      }
  )[];
  /** Timestamp (in milliseconds) of when the token expires. */
  expiresAt?: number;
  /** Timestamp (in milliseconds) of when the token was most recently used. */
  activeAt: number;
  /** Timestamp (in milliseconds) of when the token was created. */
  createdAt: number;
}

export type TokensResponse = {
  tokens: AuthToken[];
  testingToken: AuthToken;
  pagination: Pagination;
};

export type CreateAuthTokenResponse = {
  token: AuthToken;
  bearerToken: string;
};

export type GetUserTokenParams = {};
export type CreateAuthTokenParams = {
  name: string;
  expiresAt?: number;
  params?: { teamId: string };
};

export type DeleteTokenParams = { tokenId: string };
export type GetTokenMetadataParams = { tokenId: string };

export type ListAuthTokensResponse = {
  tokens: AuthToken[];
  testingToken: AuthToken;
  pagination: Pagination;
};

export type LoginWithEmailParams = {
  email: string;
  tokenName?: string;
};

export type LoginWithEmailResponse = {
  token: string;
  securityCode: string;
};

export type VerifyLoginRequestParams = {
  token: string;
  email?: string;
  ssoUserId?: string;
  tokenName?: string;
};

export type VerifyLoginRequestResponse = {
  token: string;
  email: string;
  teamId?: string;
};
