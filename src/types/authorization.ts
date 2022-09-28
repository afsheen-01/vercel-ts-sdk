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

interface Pagination {
  /** Amount of items in the current page. */
  count: number;
  /** Timestamp that must be used to request the next page. */
  next: number | null;
  /** Timestamp that must be used to request the previous page. */
  prev: number | null;
}

export type TokensResponse = {
  tokens: AuthToken[];
  testingToken: AuthToken;
  pagination: Pagination;
};
