import { Pagination } from "./common";

export type ListTeamsResponse = {
  teams: (Team | TeamLimited)[];
  pagination: Pagination;
};

export type DeleteTeamReasons = {
  description: string;
  slug: string;
};

export interface Team {
  [key: string]: unknown;
}

/** A limited form of data representing a Team, due to the authentication token missing privileges to read the full Team data. */
interface TeamLimited {
  /** Property indicating that this Team data contains only limited information, due to the authentication token missing privileges to read the full Team data. Re-login with the Team's configured SAML Single Sign-On provider in order to upgrade the authentication token with the necessary privileges. */
  limited: boolean;
  /** When "Single Sign-On (SAML)" is configured, this object contains information that allows the client-side to identify whether or not this Team has SAML enforced. */
  saml?: {
    /** Information for the SAML Single Sign-On configuration. */
    connection?: {
      /** The Identity Provider "type", for example Okta. */
      type: string;
      /** Current status of the connection. */
      status: string;
      /** Current state of the connection. */
      state: string;
      /** Timestamp (in milliseconds) of when the configuration was connected. */
      connectedAt: number;
    };
    /** When `true`, interactions with the Team **must** be done with an authentication token that has been authenticated with the Team's SAML Single Sign-On provider. */
    enforced: boolean;
  };
  /** The Team's unique identifier. */
  id: string;
  /** The Team's slug, which is unique across the Vercel platform. */
  slug: string;
  /** Name associated with the Team account, or `null` if none has been provided. */
  name: string | null;
  /** The ID of the file used as avatar for this Team. */
  avatar: string | null;
  membership:
    | {
        confirmed: boolean;
        confirmedAt: number;
        accessRequestedAt?: number;
        role: "OWNER" | "MEMBER" | "VIEWER" | "DEVELOPER" | "BILLING";
        teamId?: string;
        uid: string;
        createdAt: number;
        created: number;
        joinedFrom?: {
          origin:
            | "import"
            | "mail"
            | "link"
            | "teams"
            | "github"
            | "gitlab"
            | "bitbucket"
            | "saml"
            | "dsync"
            | "feedback";
          commitId?: string;
          repoId?: string;
          repoPath?: string;
          gitUserId?: string | number;
          gitUserLogin?: string;
          ssoUserId?: string;
          ssoConnectedAt?: number;
          idpUserId?: string;
          dsyncUserId?: string;
          dsyncConnectedAt?: number;
        };
      }
    | {
        confirmed: boolean;
        confirmedAt?: number;
        accessRequestedAt: number;
        role: "OWNER" | "MEMBER" | "VIEWER" | "DEVELOPER" | "BILLING";
        teamId?: string;
        uid: string;
        createdAt: number;
        created: number;
        joinedFrom?: {
          origin:
            | "import"
            | "mail"
            | "link"
            | "teams"
            | "github"
            | "gitlab"
            | "bitbucket"
            | "saml"
            | "dsync"
            | "feedback";
          commitId?: string;
          repoId?: string;
          repoPath?: string;
          gitUserId?: string | number;
          gitUserLogin?: string;
          ssoUserId?: string;
          ssoConnectedAt?: number;
          idpUserId?: string;
          dsyncUserId?: string;
          dsyncConnectedAt?: number;
        };
      };
  /** Will remain undocumented. Remove in v3 API. */
  created: string;
  /** UNIX timestamp (in milliseconds) when the Team was created. */
  createdAt: number;
}

export interface AccessRequestResponse {
  /** The slug of the team. */
  teamSlug: string;
  /** The name of the team. */
  teamName: string;
  /** Current status of the membership. Will be `true` if confirmed, if pending it'll be `false`. */
  confirmed: boolean;
  /** A map that describes the origin from where the user joined. */
  joinedFrom: {
    origin:
      | "import"
      | "mail"
      | "link"
      | "teams"
      | "github"
      | "gitlab"
      | "bitbucket"
      | "saml"
      | "dsync"
      | "feedback";
    commitId?: string;
    repoId?: string;
    repoPath?: string;
    gitUserId?: string | number;
    gitUserLogin?: string;
    ssoUserId?: string;
    ssoConnectedAt?: number;
    idpUserId?: string;
    dsyncUserId?: string;
    dsyncConnectedAt?: number;
  };
  /** Timestamp in milliseconds when the user requested access to the team. */
  accessRequestedAt: number;
  /** Map of the connected GitHub account. */
  github: {
    login?: string;
  } | null;
  /** Map of the connected GitLab account. */
  gitlab: {
    login?: string;
  } | null;
  /** Map of the connected Bitbucket account. */
  bitbucket: {
    login?: string;
  } | null;
}

export type InviteUserResponse = {
  /** The ID of the invited user */
  uid: string;
  /** The username of the invited user */
  username: string;
  /** The email of the invited user */
  email: string;
  /** The role used for the invitation */
  role: string;
};
