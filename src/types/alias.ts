import { Pagination } from "./common";

export type ListAliasQueryParams = {
  domain?: string;
  from?: number;
  limit?: number;
  projectId?: string;
  rollbackDeploymentId?: string;
  since?: number;
  teamId?: string;
  until?: number;
};
export interface Alias {
  /** The alias name, it could be a `.vercel.app` subdomain or a custom domain */
  alias: string;
  /** The date when the alias was created */
  created: string;
  /** The date when the alias was created in milliseconds since the UNIX epoch */
  createdAt?: number;
  /** Information of the user who created the alias */
  creator?: {
    /** ID of the user who created the alias */
    uid: string;
    /** Email of the user who created the alias */
    email: string;
    /** Username of the user who created the alias */
    username: string;
  };
  /** The date when the alias was deleted in milliseconds since the UNIX epoch */
  deletedAt?: number;
  /** A map with the deployment ID, URL and metadata */
  deployment?: {
    /** The deployment unique identifier */
    id: string;
    /** The deployment unique URL */
    url: string;
    /** The deployment metadata */
    meta?: string;
  };
  /** The deployment ID */
  deploymentId: string | null;
  /** The unique identifier of the project */
  projectId: string | null;
  /** Target destination domain for redirect when the alias is a redirect */
  redirect?: string | null;
  /** Status code to be used on redirect */
  redirectStatusCode?: (301 | 302 | 307 | 308) | null;
  /** The unique identifier of the alias */
  uid: string;
  /** The date when the alias was updated in milliseconds since the UNIX epoch */
  updatedAt?: number;
}

export interface ListAliasesResponse {
  aliases: Alias[];
  pagination: Pagination;
}

export interface DeploymentAliasesResponse {
  /** A list of the aliases assigned to the deployment */
  aliases: {
    /** The unique identifier of the alias */
    uid: string;
    /** The alias name, it could be a `.vercel.app` subdomain or a custom domain */
    alias: string;
    /** The date when the alias was created */
    created: string;
    /** Target destination domain for redirect when the alias is a redirect */
    redirect?: string | null;
  }[];
}

export interface NewAlias {
  /** The unique identifier of the alias */
  uid: string;
  /** The assigned alias name */
  alias: string;
  /** The date when the alias was created */
  created: string;
  /** The unique identifier of the previously aliased deployment, only received when the alias was used before */
  oldDeploymentId?: string | null;
}
