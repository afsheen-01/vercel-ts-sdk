import { Pagination } from "./pagination";
import { PaginationParameters } from "./pagination";

export type ListDeploymentsParams = {
  app?: string;
  from?: number;
  projectId?: string;
  rollbackCandidate: boolean;
  since?: number;
  state?:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED";
  target?: string;
  teamId?: string;
  to?: number;
  users?: string;
} & PaginationParameters;

export interface DeploymentListResponse {
  pagination: Pagination;
  deployments: {
    /** The unique identifier of the deployment. */
    uid: string;
    /** The name of the deployment. */
    name: string;
    /** The URL of the deployment. */
    url: string;
    /** Timestamp of when the deployment got created. */
    created: number;
    /** The source of the deployment. */
    source?: "cli" | "git" | "import" | "import/repo" | "clone/repo";
    /** In which state is the deployment. */
    state?:
      | "BUILDING"
      | "ERROR"
      | "INITIALIZING"
      | "QUEUED"
      | "READY"
      | "CANCELED";
    /** The type of the deployment. */
    type: "LAMBDAS";
    /** Metadata information of the user who created the deployment. */
    creator: {
      /** The unique identifier of the user. */
      uid: string;
      /** The email address of the user. */
      email?: string;
      /** The username of the user. */
      username?: string;
      /** The GitHub login of the user. */
      githubLogin?: string;
      /** The GitLab login of the user. */
      gitlabLogin?: string;
    };
    /** An object containing the deployment's metadata */
    meta?: { [key: string]: string };
    /** On which environment has the deployment been deployed to. */
    target?: ("production" | "staging") | null;
    /** An error object in case aliasing of the deployment failed. */
    aliasError?: {
      code: string;
      message: string;
    } | null;
    aliasAssigned?: (number | boolean) | null;
    /** Timestamp of when the deployment got created. */
    createdAt?: number;
    /** Timestamp of when the deployment started building at. */
    buildingAt?: number;
    /** Timestamp of when the deployment got ready. */
    ready?: number;
    /** State of all registered checks */
    checksState?: "registered" | "running" | "completed";
    /** Conclusion for checks */
    checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
    /** Vercel URL to inspect the deployment. */
    inspectorUrl: string | null;
    /** Deployment can be used for instant rollback */
    isRollbackCandidate?: boolean | null;
  }[];
}
export type ListDeploymentFilesResponse = FileTree[];

/** A deployment file tree entry */
interface FileTree {
  /** The name of the file tree entry */
  name: string;
  /** String indicating the type of file tree entry. */
  type: "directory" | "file" | "symlink" | "lambda" | "middleware" | "invalid";
  /** The unique identifier of the file (only valid for the `file` type) */
  uid?: string;
  /** The list of children files of the directory (only valid for the `directory` type) */
  children?: FileTree[];
  /** The content-type of the file (only valid for the `file` type) */
  contentType?: string;
  /** The file "mode" indicating file type and permissions. */
  mode: number;
  /** Not currently used. See `file-list-to-tree.ts`. */
  symlink?: string;
}

export interface ListDeploymentBuildsResponse {
  builds: {
    /** The unique identifier of the Build */
    id: string;
    /** The unique identifier of the deployment */
    deploymentId: string;
    /** The entrypoint of the deployment */
    entrypoint: string;
    /** The state of the deployment depending on the process of deploying, or if it is ready or in an error state */
    readyState:
      | "BUILDING"
      | "ERROR"
      | "INITIALIZING"
      | "QUEUED"
      | "READY"
      | "CANCELED"
      | "UPLOADING"
      | "DEPLOYING"
      | "ARCHIVED";
    /** The time at which the Build state was last modified */
    readyStateAt?: number;
    /** The time at which the Build was scheduled to be built */
    scheduledAt?: number | null;
    /** The time at which the Build was created */
    createdAt?: number;
    /** The time at which the Build was deployed */
    deployedAt?: number;
    /** The region where the Build was first created */
    createdIn?: string;
    /** The Runtime the Build used to generate the output */
    use?: string;
    /** An object that contains the Build's configuration */
    config?: {
      distDir?: string;
      forceBuildIn?: string;
      reuseWorkPathFrom?: string;
      zeroConfig?: boolean;
    };
    /** A list of outputs for the Build that can be either Serverless Functions or static files */
    output: {
      /** The type of the output */
      type?: "lambda" | "file" | "edge";
      /** The absolute path of the file or Serverless Function */
      path: string;
      /** The SHA1 of the file */
      digest: string;
      /** The POSIX file permissions */
      mode: number;
      /** The size of the file in bytes */
      size?: number;
      /** If the output is a Serverless Function, an object containing the name, location and memory size of the function */
      lambda?: {
        functionName: string;
        deployedTo: string[];
        memorySize?: number;
        timeout?: number;
        layers?: string[];
      } | null;
    }[];
    /** If the Build uses the `@vercel/static` Runtime, it contains a hashed string of all outputs */
    fingerprint?: string | null;
    copiedFrom?: string;
  }[];
}
