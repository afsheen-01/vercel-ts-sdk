export type DeleteIntegrationConfigParams = {
  integrationId: string;
  teamId?: string;
};

export type ListIntegrationConfigsParams = {
  view: string;
  teamId?: string;
};

export type ListIntegrationConfigsResponse =
  | {
      /** A timestamp that tells you when the configuration was installed successfully */
      completedAt?: number;
      /** A timestamp that tells you when the configuration was created */
      createdAt: number;
      /** The unique identifier of the configuration */
      id: string;
      /** The unique identifier of the app the configuration was created for */
      integrationId: string;
      /** Will be truthy in those cases where the configuration was created to authorize a client through the OAuth2 flow. */
      oauthConfiguration?: boolean;
      /** The user or team ID that owns the configuration */
      ownerId: string;
      /** When a configuration is limited to access certain projects, this will contain each of the project ID it is allowed to access. If it is not defined, the configuration has full access. */
      projects?: string[];
      /** Source defines where the configuration was installed from. It is used to analyze user engagement for integration installations in product metrics. */
      source?: "marketplace" | "deploy-button" | "oauth" | "external";
      removedLogDrainsAt?: number;
      removedProjectEnvsAt?: number;
      removedTokensAt?: number;
      removedWebhooksAt?: number;
      /** The slug of the integration the configuration is created for. */
      slug: string;
      /** When the configuration was created for a team, this will show the ID of the team. */
      teamId?: string | null;
      type: "integration-configuration";
      /** A timestamp that tells you when the configuration was updated. */
      updatedAt: number;
      /** The ID of the user that created the configuration. */
      userId: string;
      /** The resources that are allowed to be accessed by the configuration. */
      scopes: string[];
      scopesQueue?: {
        scopes: {
          added: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
          upgraded: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
        };
        note: string;
        requestedAt: number;
        confirmedAt?: number;
      }[];
      /** A timestamp that tells you when the configuration was disabled. Note: Configurations can be disabled when the associated user loses access to a team. They do not function during this time until the configuration is 'transferred', meaning the associated user is changed to one with access to the team. */
      disabledAt?: number;
      /** A timestamp that tells you when the configuration was updated. */
      deletedAt?: number | null;
    }[]
  | {
      integration: {
        name: string;
        icon: string;
        category: string;
        isLegacy: boolean;
        flags?: string[];
        assignedBetaLabelAt?: number;
      };
      /** A timestamp that tells you when the configuration was installed successfully */
      completedAt?: number;
      /** A timestamp that tells you when the configuration was created */
      createdAt: number;
      /** The unique identifier of the configuration */
      id: string;
      /** The unique identifier of the app the configuration was created for */
      integrationId: string;
      /** Will be truthy in those cases where the configuration was created to authorize a client through the OAuth2 flow. */
      oauthConfiguration?: boolean;
      /** The user or team ID that owns the configuration */
      ownerId: string;
      /** When a configuration is limited to access certain projects, this will contain each of the project ID it is allowed to access. If it is not defined, the configuration has full access. */
      projects?: string[];
      /** Source defines where the configuration was installed from. It is used to analyze user engagement for integration installations in product metrics. */
      source?: "marketplace" | "deploy-button" | "oauth" | "external";
      removedLogDrainsAt?: number;
      removedProjectEnvsAt?: number;
      removedTokensAt?: number;
      removedWebhooksAt?: number;
      /** The slug of the integration the configuration is created for. */
      slug: string;
      /** When the configuration was created for a team, this will show the ID of the team. */
      teamId?: string | null;
      type: "integration-configuration";
      /** A timestamp that tells you when the configuration was updated. */
      updatedAt: number;
      /** The ID of the user that created the configuration. */
      userId: string;
      /** The resources that are allowed to be accessed by the configuration. */
      scopes: string[];
      scopesQueue?: {
        scopes: {
          added: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
          upgraded: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
        };
        note: string;
        requestedAt: number;
        confirmedAt?: number;
      }[];
      /** A timestamp that tells you when the configuration was disabled. Note: Configurations can be disabled when the associated user loses access to a team. They do not function during this time until the configuration is 'transferred', meaning the associated user is changed to one with access to the team. */
      disabledAt?: number;
      /** A timestamp that tells you when the configuration was updated. */
      deletedAt?: number | null;
    }[];

export type ListGitNamespacesParams = {
  provider?: Provider;
  teamId?: string;
};

export interface ListGitNamespacesResponse {
  gitAccount: {
    provider: Provider;
    namespaceId: (string | number) | null;
  };
  repos: {
    id: string | number;
    name: string;
    slug: string;
    namespace: string;
    private: boolean;
    defaultBranch: string;
    url: string;
    updatedAt: number;
    ownerType: "team" | "user";
  }[];
}

type Provider = "github" | "gitlab" | "bitbucket";

export type ListGitReposParams = {
  installationId?: string;
  namespaceId?: string | number;
  provider?: Provider;
  query?: string;
  teamId?: string;
};

export type ListGitReposResponse = {
  gitAccount: {
    provider: Provider;
    namespaceId: (string | number) | null;
  };
  repos: {
    id: string | number;
    name: string;
    slug: string;
    namespace: string;
    private: boolean;
    defaultBranch: string;
    url: string;
    updatedAt: number;
    ownerType: "team" | "user";
  }[];
};

export type GetIntegrationConfigParams = {
  integrationId: string;
  teamId?: string;
};

export type GetIntegrationConfigResponse =
  | {
      /** A timestamp that tells you when the configuration was installed successfully */
      completedAt?: number;
      /** A timestamp that tells you when the configuration was created */
      createdAt: number;
      /** The unique identifier of the configuration */
      id: string;
      /** The unique identifier of the app the configuration was created for */
      integrationId: string;
      /** Will be truthy in those cases where the configuration was created to authorize a client through the OAuth2 flow. */
      oauthConfiguration?: boolean;
      /** The user or team ID that owns the configuration */
      ownerId: string;
      /** When a configuration is limited to access certain projects, this will contain each of the project ID it is allowed to access. If it is not defined, the configuration has full access. */
      projects?: string[];
      /** Source defines where the configuration was installed from. It is used to analyze user engagement for integration installations in product metrics. */
      source?: "marketplace" | "deploy-button" | "oauth" | "external";
      removedLogDrainsAt?: number;
      removedProjectEnvsAt?: number;
      removedTokensAt?: number;
      removedWebhooksAt?: number;
      /** The slug of the integration the configuration is created for. */
      slug: string;
      /** When the configuration was created for a team, this will show the ID of the team. */
      teamId?: string | null;
      type: "integration-configuration";
      /** A timestamp that tells you when the configuration was updated. */
      updatedAt: number;
      /** The ID of the user that created the configuration. */
      userId: string;
      /** The resources that are allowed to be accessed by the configuration. */
      scopes: string[];
      scopesQueue?: {
        scopes: {
          added: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
          upgraded: (
            | "read:integration-configuration"
            | "read-write:integration-configuration"
            | "read:deployment"
            | "read-write:deployment"
            | "read-write:deployment-check"
            | "read:project"
            | "read-write:project"
            | "read-write:project-env-vars"
            | "read-write:global-project-env-vars"
            | "read:team"
            | "read:user"
            | "read-write:log-drain"
            | "read:domain"
            | "read-write:domain"
            | "read-write:edge-config"
            | "read-write:otel-endpoint"
            | "read:monitoring"
          )[];
        };
        note: string;
        requestedAt: number;
        confirmedAt?: number;
      }[];
      /** A timestamp that tells you when the configuration was disabled. Note: Configurations can be disabled when the associated user loses access to a team. They do not function during this time until the configuration is 'transferred', meaning the associated user is changed to one with access to the team. */
      disabledAt?: number;
      /** A timestamp that tells you when the configuration was updated. */
      deletedAt?: number | null;
    }
  | {
      /** A string representing the permission for projects. Possible values are `all` or `selected`. */
      projectSelection: "selected" | "all";
      /** A timestamp that tells you when the configuration was installed successfully */
      completedAt?: number;
      /** A timestamp that tells you when the configuration was created */
      createdAt: number;
      /** The unique identifier of the configuration */
      id: string;
      /** The unique identifier of the app the configuration was created for */
      integrationId: string;
      /** Will be truthy in those cases where the configuration was created to authorize a client through the OAuth2 flow. */
      oauthConfiguration?: boolean;
      /** The user or team ID that owns the configuration */
      ownerId: string;
      /** When a configuration is limited to access certain projects, this will contain each of the project ID it is allowed to access. If it is not defined, the configuration has full access. */
      projects?: string[];
      /** The slug of the integration the configuration is created for. */
      slug: string;
      /** When the configuration was created for a team, this will show the ID of the team. */
      teamId?: string | null;
      /** A timestamp that tells you when the configuration was updated. */
      updatedAt: number;
      /** The ID of the user that created the configuration. */
      userId: string;
      /** The resources that are allowed to be accessed by the configuration. */
      scopes: string[];
      /** A timestamp that tells you when the configuration was disabled. Note: Configurations can be disabled when the associated user loses access to a team. They do not function during this time until the configuration is 'transferred', meaning the associated user is changed to one with access to the team. */
      disabledAt?: number;
    };
