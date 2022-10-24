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

export type GetDeploymentEventParams = {
  deploymentIdOrURL: string;
  builds: number;
  delimiter: number;
  direction: string;
  follow: number;
  limit: number;
  name: string;
  since: number;
  statusCode: number | string;
  teamId: string;
  until: number;
};

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

export type GetDeploymentEventsResponse = (
  | {
      type: "command";
      created: number;
      payload: {
        deploymentId: string;
        text?: string;
        id: string;
        date: number;
        serial: string;
      };
    }
  | {
      type: "deployment-state";
      created: number;
      payload: {
        deploymentId: string;
        info: {
          type: string;
          name: string;
          entrypoint?: string;
          path?: string;
          step?: string;
        };
        id: string;
        date: number;
        serial: string;
      };
    }
  | {
      type: "delimiter";
      created: number;
      payload: {
        deploymentId: string;
        info: {
          type: string;
          name: string;
          entrypoint?: string;
          path?: string;
          step?: string;
        };
        id: string;
        date: number;
        serial: string;
      };
    }
  | {
      type: "exit";
      created: number;
      payload: {
        date: number;
        text?: string;
        id: string;
        deploymentId: string;
        created: number;
        serial: string;
      };
    }
  | {
      type: "middleware";
      created: number;
      payload: {
        deploymentId: string;
        info: {
          type: string;
          name: string;
          entrypoint?: string;
          path?: string;
          step?: string;
        };
        text?: string;
        id: string;
        date: number;
        serial: string;
        requestId?: string;
      };
    }
  | {
      type:
        | "delimiter"
        | "command"
        | "stdout"
        | "stderr"
        | "exit"
        | "deployment-state"
        | "middleware"
        | "middleware-invocation"
        | "edge-function-invocation"
        | "fatal";
      created: number;
      payload: {
        deploymentId: string;
        info: {
          type: string;
          name: string;
          entrypoint?: string;
          path?: string;
          step?: string;
        };
        text?: string;
        id: string;
        date: number;
        serial: string;
        statusCode?: number;
        requestId?: string;
      };
    }
)[];

export type GetDeploymentResponse =
  | {
      aliasAssignedAt?: (number | boolean) | null;
      build: {
        /** The keys of the environment variables that were assigned during the build phase. */
        env: string[];
      };
      builds?: { [key: string]: unknown }[];
      /** The region where the deployment was first created */
      createdIn: string;
      /** The keys of the environment variables that were assigned during runtime */
      env: string[];
      /** An object used to configure your Serverless Functions */
      functions?: {
        [key: string]: {
          memory?: number;
          maxDuration?: number;
          runtime?: string;
          includeFiles?: string;
          excludeFiles?: string;
        };
      } | null;
      /** Vercel URL to inspect the deployment. */
      inspectorUrl: string | null;
      /** An object containing the deployment's metadata */
      meta: { [key: string]: string };
      /** An monorepo manager that was used for the deployment */
      monorepoManager?: string | null;
      /** The name of the project associated with the deployment at the time that the deployment was created */
      name: string;
      /** The unique ID of the user or team the deployment belongs to */
      ownerId: string;
      /** The pricing plan the deployment was made under */
      plan: "hobby" | "enterprise" | "pro" | "oss";
      /** The ID of the project the deployment is associated with */
      projectId: string;
      /** A list of routes objects used to rewrite paths to point towards other internal or external paths */
      routes:
        | (
            | {
                src: string;
                dest?: string;
                headers?: { [key: string]: string };
                methods?: string[];
                continue?: boolean;
                override?: boolean;
                caseSensitive?: boolean;
                check?: boolean;
                important?: boolean;
                status?: number;
                has?: (
                  | {
                      type: "host";
                      value: string;
                    }
                  | {
                      type: "header" | "cookie" | "query";
                      key: string;
                      value?: string;
                    }
                )[];
                missing?: (
                  | {
                      type: "host";
                      value: string;
                    }
                  | {
                      type: "header" | "cookie" | "query";
                      key: string;
                      value?: string;
                    }
                )[];
                locale?: {
                  /** Construct a type with a set of properties K of type T */
                  redirect?: { [key: string]: string };
                  cookie?: string;
                };
                /** A middleware key within the `output` key under the build result. Overrides a `middleware` definition. */
                middlewarePath?: string;
                /** A middleware index in the `middleware` key under the build result */
                middleware?: number;
              }
            | {
                handle:
                  | "filesystem"
                  | "hit"
                  | "miss"
                  | "rewrite"
                  | "error"
                  | "resource";
                src?: string;
                dest?: string;
                status?: number;
              }
            | {
                src: string;
                continue: boolean;
                middleware: 0;
              }
          )[]
        | null;
      /** A list of all the aliases (default aliases, staging aliases and production aliases) that were assigned upon deployment creation */
      alias: string[];
      /** A boolean that will be true when the aliases from the alias property were assigned successfully */
      aliasAssigned: boolean;
      /** An object that will contain a `code` and a `message` when the aliasing fails, otherwise the value will be `null` */
      aliasError?: {
        code: string;
        message: string;
      } | null;
      aliasFinal?: string | null;
      aliasWarning?: {
        code: string;
        message: string;
        link?: string;
        action?: string;
      } | null;
      automaticAliases?: string[];
      bootedAt: number;
      buildErrorAt?: number;
      buildingAt: number;
      canceledAt?: number;
      checksState?: "registered" | "running" | "completed";
      checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
      /** A number containing the date when the deployment was created in milliseconds */
      createdAt: number;
      /** Information about the deployment creator */
      creator: {
        /** The ID of the user that created the deployment */
        uid: string;
        /** The username of the user that created the deployment */
        username?: string;
      };
      errorCode?: string;
      errorLink?: string;
      errorMessage?: string | null;
      errorStep?: string;
      gitSource?:
        | {
            type: "github";
            repoId: string | number;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "github";
            org: string;
            repo: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "gitlab";
            projectId: string | number;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "bitbucket";
            workspaceUuid?: string;
            repoUuid: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "bitbucket";
            owner: string;
            slug: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "custom";
            ref: string;
            sha: string;
            gitUrl: string;
          }
        | {
            type: "github";
            ref: string;
            sha: string;
            repoId: number;
            org?: string;
            repo?: string;
          }
        | {
            type: "gitlab";
            ref: string;
            sha: string;
            projectId: number;
          }
        | {
            type: "bitbucket";
            ref: string;
            sha: string;
            owner?: string;
            slug?: string;
            workspaceUuid: string;
            repoUuid: string;
          };
      /** A string holding the unique ID of the deployment */
      id: string;
      lambdas?: {
        id: string;
        createdAt?: number;
        entrypoint?: string | null;
        readyState?: "BUILDING" | "ERROR" | "INITIALIZING" | "READY";
        readyStateAt?: number;
        output: {
          path: string;
          functionName: string;
        }[];
      }[];
      /** A boolean representing if the deployment is public or not. By default this is `false` */
      public: boolean;
      /** The state of the deployment depending on the process of deploying, or if it is ready or in an error state */
      readyState:
        | "QUEUED"
        | "BUILDING"
        | "ERROR"
        | "INITIALIZING"
        | "READY"
        | "CANCELED";
      /** The regions the deployment exists in */
      regions: string[];
      /** Where was the deployment created from */
      source?: "cli" | "git" | "import" | "import/repo" | "clone/repo";
      /** If defined, either `staging` if a staging alias in the format `<project>.<team>.now.sh` was assigned upon creation, or `production` if the aliases from `alias` were assigned */
      target?: ("production" | "staging") | null;
      /** The team that owns the deployment if any */
      team?: {
        /** The ID of the team owner */
        id: string;
        /** The name of the team owner */
        name: string;
        /** The slug of the team owner */
        slug: string;
      };
      type: "LAMBDAS";
      /** A string with the unique URL of the deployment */
      url: string;
      /** An array of domains that were provided by the user when creating the Deployment. */
      userAliases?: string[];
      /** The platform version that was used to create the deployment. */
      version: 2;
    }
  | {
      /** A list of all the aliases (default aliases, staging aliases and production aliases) that were assigned upon deployment creation */
      alias: string[];
      /** A boolean that will be true when the aliases from the alias property were assigned successfully */
      aliasAssigned: boolean;
      /** An object that will contain a `code` and a `message` when the aliasing fails, otherwise the value will be `null` */
      aliasError?: {
        code: string;
        message: string;
      } | null;
      aliasFinal?: string | null;
      aliasWarning?: {
        code: string;
        message: string;
        link?: string;
        action?: string;
      } | null;
      automaticAliases?: string[];
      bootedAt: number;
      buildErrorAt?: number;
      buildingAt: number;
      canceledAt?: number;
      checksState?: "registered" | "running" | "completed";
      checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
      /** A number containing the date when the deployment was created in milliseconds */
      createdAt: number;
      /** Information about the deployment creator */
      creator: {
        /** The ID of the user that created the deployment */
        uid: string;
        /** The username of the user that created the deployment */
        username?: string;
      };
      errorCode?: string;
      errorLink?: string;
      errorMessage?: string | null;
      errorStep?: string;
      gitSource?:
        | {
            type: "github";
            repoId: string | number;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "github";
            org: string;
            repo: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "gitlab";
            projectId: string | number;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "bitbucket";
            workspaceUuid?: string;
            repoUuid: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "bitbucket";
            owner: string;
            slug: string;
            ref?: string | null;
            sha?: string;
            prId?: number | null;
          }
        | {
            type: "custom";
            ref: string;
            sha: string;
            gitUrl: string;
          }
        | {
            type: "github";
            ref: string;
            sha: string;
            repoId: number;
            org?: string;
            repo?: string;
          }
        | {
            type: "gitlab";
            ref: string;
            sha: string;
            projectId: number;
          }
        | {
            type: "bitbucket";
            ref: string;
            sha: string;
            owner?: string;
            slug?: string;
            workspaceUuid: string;
            repoUuid: string;
          };
      /** A string holding the unique ID of the deployment */
      id: string;
      lambdas?: {
        id: string;
        createdAt?: number;
        entrypoint?: string | null;
        readyState?: "BUILDING" | "ERROR" | "INITIALIZING" | "READY";
        readyStateAt?: number;
        output: {
          path: string;
          functionName: string;
        }[];
      }[];
      /** The name of the project associated with the deployment at the time that the deployment was created */
      name: string;
      /** An object containing the deployment's metadata */
      meta: { [key: string]: string };
      /** A boolean representing if the deployment is public or not. By default this is `false` */
      public: boolean;
      /** The state of the deployment depending on the process of deploying, or if it is ready or in an error state */
      readyState:
        | "QUEUED"
        | "BUILDING"
        | "ERROR"
        | "INITIALIZING"
        | "READY"
        | "CANCELED";
      /** The regions the deployment exists in */
      regions: string[];
      /** Where was the deployment created from */
      source?: "cli" | "git" | "import" | "import/repo" | "clone/repo";
      /** If defined, either `staging` if a staging alias in the format `<project>.<team>.now.sh` was assigned upon creation, or `production` if the aliases from `alias` were assigned */
      target?: ("production" | "staging") | null;
      /** The team that owns the deployment if any */
      team?: {
        /** The ID of the team owner */
        id: string;
        /** The name of the team owner */
        name: string;
        /** The slug of the team owner */
        slug: string;
      };
      type: "LAMBDAS";
      /** A string with the unique URL of the deployment */
      url: string;
      /** An array of domains that were provided by the user when creating the Deployment. */
      userAliases?: string[];
      /** The platform version that was used to create the deployment. */
      version: 2;
    };
