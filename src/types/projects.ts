import { Pagination, PaginationParameters } from "./pagination";

export type AddDomainToProjectParams = {
  projectId: string;
  teamId?: string;
  name: string;
  gitBranch?: string;
  redirect?: string;
  redirectStatusCode?: string;
};

export interface AddDomainToProjectResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type CreateNewProjectParams = {
  teamId?: string;
  name: string;
  buildCommand?: string;
  commandForIgnoringBuildStep?: string;
  devCommand?: string;
  environmentVariables?: {
    key: string;
    target: string;
    value: string;
    gitBranch?: string;
    type?: "system" | "secret" | "encrypted" | "plain";
  }[];
  framework?:
    | null
    | "blitzjs"
    | "nextjs"
    | "gatsby"
    | "remix"
    | "astro"
    | "hexo"
    | "eleventy"
    | "docusaurus-2"
    | "docusaurus"
    | "preact"
    | "solidstart"
    | "dojo"
    | "ember"
    | "vue"
    | "scully"
    | "ionic-angular"
    | "angular"
    | "polymer"
    | "svelte"
    | "sveltekit"
    | "ionic-react"
    | "create-react-app"
    | "gridsome"
    | "umijs"
    | "sapper"
    | "saber"
    | "stencil"
    | "nuxtjs"
    | "redwoodjs"
    | "hugo"
    | "jekyll"
    | "brunch"
    | "middleman"
    | "zola"
    | "vite"
    | "parcel"
    | "sanity"
    | "hydrogen";
  gitRepository?: {
    repo: string;
    type: "github" | "gitlab" | "bitbucket";
  };
  installCommand?: string;
  outputDirectory?: string;
  passwordProtection?: { deploymentType: "all" | "preview"; password?: string };
  publicSource?: boolean;
  rootDirectory?: string;
  serverlessFunctionRegion: string;
  skipGitConnectDuringLink?: boolean;
  ssoProtection?: { deploymentType: "all" | "preview" };
};

export interface CreateNewProjectResponse {
  accountId: string;
  analytics?: {
    id: string;
    canceledAt: number | null;
    disabledAt: number;
    enabledAt: number;
    paidAt?: number;
    sampleRatePercent?: number | null;
    spendLimitInDollars?: number | null;
  };
  autoExposeSystemEnvs?: boolean;
  buildCommand?: string | null;
  commandForIgnoringBuildStep?: string | null;
  createdAt?: number;
  devCommand?: string | null;
  directoryListing: boolean;
  installCommand?: string | null;
  env?: {
    target?: Target[] | Target;
    type: "secret" | "system" | "encrypted" | "plain";
    id?: string;
    key: string;
    value: string;
    configurationId?: string | null;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    gitBranch?: string;
    edgeConfigId?: string | null;
    /** Whether `value` is decrypted. */
    decrypted?: boolean;
  }[];
  framework?:
    | (
        | "blitzjs"
        | "nextjs"
        | "gatsby"
        | "remix"
        | "astro"
        | "hexo"
        | "eleventy"
        | "docusaurus-2"
        | "docusaurus"
        | "preact"
        | "solidstart"
        | "dojo"
        | "ember"
        | "vue"
        | "scully"
        | "ionic-angular"
        | "angular"
        | "polymer"
        | "svelte"
        | "sveltekit"
        | "ionic-react"
        | "create-react-app"
        | "gridsome"
        | "umijs"
        | "sapper"
        | "saber"
        | "stencil"
        | "nuxtjs"
        | "redwoodjs"
        | "hugo"
        | "jekyll"
        | "brunch"
        | "middleman"
        | "zola"
        | "vite"
        | "parcel"
        | "sanity"
        | "hydrogen"
      )
    | null;
  gitForkProtection?: boolean;
  id: string;
  latestDeployments?: {
    alias?: string[];
    aliasAssigned?: (number | boolean) | null;
    aliasError?: {
      code: string;
      message: string;
    } | null;
    aliasFinal?: string | null;
    automaticAliases?: string[];
    builds?: {
      use: string;
      src?: string;
      dest?: string;
    }[];
    createdAt: number;
    createdIn: string;
    creator: {
      email: string;
      githubLogin?: string;
      gitlabLogin?: string;
      uid: string;
      username: string;
    } | null;
    deploymentHostname: string;
    name: string;
    forced?: boolean;
    id: string;
    /** Construct a type with a set of properties K of type T */
    meta?: { [key: string]: string };
    monorepoManager?: string | null;
    plan: string;
    private: boolean;
    readyState: string;
    requestedAt?: number;
    target?: string | null;
    teamId?: string | null;
    type: string;
    url: string;
    userId: string;
    withCache?: boolean;
    checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
    checksState?: "registered" | "running" | "completed";
  }[];
  link?:
    | {
        org?: string;
        repo?: string;
        repoId?: number;
        type?: "github";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        projectId?: string;
        projectName?: string;
        projectNameWithNamespace?: string;
        projectNamespace?: string;
        projectUrl?: string;
        type?: "gitlab";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        name?: string;
        slug?: string;
        owner?: string;
        type?: "bitbucket";
        uuid?: string;
        workspaceUuid?: string;
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      };
  name: string;
  nodeVersion: "16.x" | "14.x" | "12.x" | "10.x";
  outputDirectory?: string | null;
  passwordProtection?: {
    deploymentType: "all" | "preview";
  } | null;
  publicSource?: boolean | null;
  rootDirectory?: string | null;
  serverlessFunctionRegion?: string | null;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  ssoProtection?: {
    deploymentType: "all" | "preview";
  } | null;
  /** An object containing the deployment's metadata */
  targets?: { [key: string]: string };
  transferCompletedAt?: number;
  transferStartedAt?: number;
  transferToAccountId?: string;
  transferredFromAccountId?: string;
  updatedAt?: number;
  live?: boolean;
  enablePreviewFeedback?: boolean | null;
  permissions?: {
    aliasGlobal?: ACLAction[];
    aliasProject?: ACLAction[];
    analytics?: ACLAction[];
    analyticsSampling?: ACLAction[];
    analyticsUsage?: ACLAction[];
    auditLog?: ACLAction[];
    billingAddress?: ACLAction[];
    billingInformation?: ACLAction[];
    billingInvoice?: ACLAction[];
    billingInvoiceEmailRecipient?: ACLAction[];
    billingInvoiceLanguage?: ACLAction[];
    billingPlan?: ACLAction[];
    billingPurchaseOrder?: ACLAction[];
    billingTaxId?: ACLAction[];
    cacheArtifact?: ACLAction[];
    cacheArtifactUsageEvent?: ACLAction[];
    concurrentBuilds?: ACLAction[];
    deployment?: ACLAction[];
    deploymentCheck?: ACLAction[];
    deploymentCheckPreview?: ACLAction[];
    deploymentPreview?: ACLAction[];
    deploymentPrivate?: ACLAction[];
    deploymentRollback?: ACLAction[];
    domain?: ACLAction[];
    domainAcceptDelegation?: ACLAction[];
    domainAuthCodes?: ACLAction[];
    domainCertificate?: ACLAction[];
    domainCheckConfig?: ACLAction[];
    domainMove?: ACLAction[];
    domainPurchase?: ACLAction[];
    domainRecord?: ACLAction[];
    domainTransferIn?: ACLAction[];
    event?: ACLAction[];
    fileUpload?: ACLAction[];
    gitRepository?: ACLAction[];
    integration?: ACLAction[];
    integrationConfiguration?: ACLAction[];
    integrationConfigurationTransfer?: ACLAction[];
    integrationConfigurationProjects?: ACLAction[];
    integrationVercelConfigurationOverride?: ACLAction[];
    job?: ACLAction[];
    logDrain?: ACLAction[];
    monitoringQuery?: ACLAction[];
    monitoringChart?: ACLAction[];
    notificationDomainConfiguration?: ACLAction[];
    notificationDomainExpire?: ACLAction[];
    notificationDomainMoved?: ACLAction[];
    notificationDomainPurchase?: ACLAction[];
    notificationDomainRenewal?: ACLAction[];
    notificationDomainTransfer?: ACLAction[];
    notificationDomainUnverified?: ACLAction[];
    notificationPaymentFailed?: ACLAction[];
    notificationUsageAlert?: ACLAction[];
    notificationSpendCap?: ACLAction[];
    openTelemetryConfiguration?: ACLAction[];
    passwordProtection?: ACLAction[];
    paymentMethod?: ACLAction[];
    permissions?: ACLAction[];
    previewDeploymentSuffix?: ACLAction[];
    project?: ACLAction[];
    projectDeploymentHook?: ACLAction[];
    projectDomain?: ACLAction[];
    projectDomainMove?: ACLAction[];
    projectEnvVars?: ACLAction[];
    sharedEnvVars?: ACLAction[];
    projectEnvVarsProduction?: ACLAction[];
    sharedEnvVarsProduction?: ACLAction[];
    projectIntegrationConfiguration?: ACLAction[];
    projectLink?: ACLAction[];
    projectMember?: ACLAction[];
    projectProductionBranch?: ACLAction[];
    projectTransfer?: ACLAction[];
    rateLimit?: ACLAction[];
    remoteCaching?: ACLAction[];
    samlConfig?: ACLAction[];
    secret?: ACLAction[];
    spendCapConfiguration?: ACLAction[];
    spendCapState?: ACLAction[];
    supportCase?: ACLAction[];
    supportCaseComment?: ACLAction[];
    team?: ACLAction[];
    teamAccessRequest?: ACLAction[];
    teamFellowMembership?: ACLAction[];
    teamInvite?: ACLAction[];
    teamInviteCode?: ACLAction[];
    teamJoin?: ACLAction[];
    teamOwnMembership?: ACLAction[];
    teamOwnMembershipDisconnectSAML?: ACLAction[];
    token?: ACLAction[];
    usage?: ACLAction[];
    user?: ACLAction[];
    userConnection?: ACLAction[];
    webAnalytics?: ACLAction[];
    edgeConfig?: ACLAction[];
    edgeConfigItem?: ACLAction[];
    edgeConfigToken?: ACLAction[];
    webhook?: ACLAction[];
  };
  lastRollbackTarget?: {
    fromDeploymentId: string;
    toDeploymentId: string;
    jobStatus: "succeeded" | "failed" | "skipped" | "pending" | "in-progress";
    requestedAt: number;
  } | null;
  hasFloatingAliases?: boolean;
}

type ACLAction = "create" | "delete" | "read" | "update" | "list" | "count";

type EnvVar = {
  key: string;
  value: string;
  type: "system" | "secret" | "encrypted" | "plain";
  target?: Target[];
};
export type CreateEnvVarsParams =
  | ({
      projectId: string;
      teamId?: string;
      vars?: never;
    } & EnvVar)
  | {
      projectId: string;
      teamId?: string;
      vars: EnvVar[];
    };

export type CreateEnvVarsResponse =
  | {
      target?: Target[] | Target;
      type: "secret" | "system" | "encrypted" | "plain";
      id?: string;
      key: string;
      value: string;
      configurationId?: string | null;
      createdAt?: number;
      updatedAt?: number;
      createdBy?: string | null;
      updatedBy?: string | null;
      gitBranch?: string;
      edgeConfigId?: string | null;
      /** Whether `value` is decrypted. */
      decrypted?: boolean;
    }[]
  | {
      target?: Target[] | Target;
      type: "secret" | "system" | "encrypted" | "plain";
      id?: string;
      key?: string;
      value?: string;
      configurationId?: string | null;
      createdAt?: number;
      updatedAt?: number;
      createdBy?: string | null;
      updatedBy?: string | null;
      gitBranch?: string;
      edgeConfigId?: string | null;
      /** Whether `value` is decrypted. */
      decrypted?: boolean;
      system?: boolean;
    };

export type DeleteProjectParams = {
  projectId: string;
  teamId?: string;
};

type Target = "production" | "preview" | "development";

export type EditEnvVarParams = {
  projectId: string;
  envId: string;
  teamId?: string;
  gitBranch?: string;
  key: string;
  target: Target[];
  type: string;
  value: string;
};

export interface EditEnvVarResponse {
  target?: Target[] | Target;
  type: "system" | "encrypted" | "plain" | "secret";
  id?: string;
  key: string;
  value: string;
  configurationId?: string | null;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string | null;
  updatedBy?: string | null;
  gitBranch?: string;
  edgeConfigId?: string | null;
  /** Whether `value` is decrypted. */
  decrypted?: boolean;
}

export type FindProjectByIdParams = {
  projectId: string;
  teamId?: string;
};

export interface FindProjectByIdResponse extends CreateNewProjectResponse {
  permissions?: CreateNewProjectResponse["permissions"] & {
    aliasProtectionBypass?: ACLAction[];
  };
}

export type GetProjectDomainParams = {
  projectId: string;
  domain: string;
  teamId?: string;
};

export interface GetProjectDomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type RemoveProjectDomainParams = {
  projectId: string;
  domain: string;
  teamId?: string;
};

export type RemoveEnvVarParams = {
  projectId: string;
  envKeyOrId: string;
  teamId?: string;
};

export type RemoveEnvVarResponse = CreateEnvVarsResponse & {};

export type ListProjectsParams = {
  excludeRepos?: string;
  from?: string;
  gitForkProtection?: string;
  repo?: string;
  repoId?: string;
  repoUrl?: string;
  search?: string;
  teamId?: string;
} & PaginationParameters;

export type ListProjectsResponse = {
  projects: CreateNewProjectResponse[];
  pagination: Pagination;
};

export type ListProjectDomainsParams = {
  projectId: string;
  gitBranch?: string;
  order?: "ASC" | "DESC";
  production?: boolean;
  redirect?: string;
  redirects?: boolean;
  since?: number;
  teamId?: string;
  verified?: boolean;
} & PaginationParameters;

export interface ListProjectDomainsResponse {
  domains: {
    name: string;
    apexName: string;
    projectId: string;
    redirect?: string | null;
    redirectStatusCode?: (307 | 301 | 302 | 308) | null;
    gitBranch?: string | null;
    updatedAt?: number;
    createdAt?: number;
    /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
    verified: boolean;
    /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
    verification?: {
      type: string;
      domain: string;
      value: string;
      reason: string;
    }[];
  }[];
  pagination: Pagination;
}

export type GetEnvVarValueParams = {
  projectId: string;
  envId: string;
  teamId?: string;
};

export interface GetEnvVarResponse {
  target?: Target[] | Target;
  type: "secret" | "system" | "encrypted" | "plain";
  id?: string;
  key: string;
  value: string;
  configurationId?: string | null;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string | null;
  updatedBy?: string | null;
  gitBranch?: string;
  edgeConfigId?: string | null;
  /** Whether `value` is decrypted. */
  decrypted?: boolean;
}

export type ListEnvVarsParams = {
  projectId: string;
  teamId?: string;
  decrypt?: boolean; // Vercel calls it string but expects a boolean actually
  gitBranch?: string;
  source?: string;
};

export type ListEnvVarsResponse =
  | {
      target?: Target[] | Target;
      type?: "secret" | "system" | "encrypted" | "plain";
      id?: string;
      key?: string;
      value?: string;
      configurationId?: string | null;
      createdAt?: number;
      updatedAt?: number;
      createdBy?: string | null;
      updatedBy?: string | null;
      gitBranch?: string;
      edgeConfigId?: string | null;
      /** Whether `value` is decrypted. */
      decrypted?: boolean;
      system?: boolean;
    }
  | {
      envs: {
        target?: Target[] | Target;
        type?: "secret" | "system" | "encrypted" | "plain";
        id?: string;
        key?: string;
        value?: string;
        configurationId?: string | null;
        createdAt?: number;
        updatedAt?: number;
        createdBy?: string | null;
        updatedBy?: string | null;
        gitBranch?: string;
        edgeConfigId?: string | null;
        /** Whether `value` is decrypted. */
        decrypted?: boolean;
        system?: boolean;
      }[];
      pagination: Pagination;
    }
  | {
      envs: {
        target?: Target[] | Target;
        type?: "secret" | "system" | "encrypted" | "plain";
        id?: string;
        key?: string;
        value?: string;
        configurationId?: string | null;
        createdAt?: number;
        updatedAt?: number;
        createdBy?: string | null;
        updatedBy?: string | null;
        gitBranch?: string;
        edgeConfigId?: string | null;
        /** Whether `value` is decrypted. */
        decrypted?: boolean;
        system?: boolean;
      }[];
    };

export type UpdateProjectDomainParams = {
  domain: string;
  projectId: string;
  teamId?: string;
  gitBranch?: string;
  redirect?: string;
  redirectStatusCode?: string;
};

export interface UpdateProjectDomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type UpdateProjectParams = {
  projectId: string;
  teamId?: string;
  autoExposeSystemEnvs?: boolean;
  buildCommand?: string;
  commandForIgnoringBuildStep?: string;
  devCommand?: string;
  directoryListing?: boolean;
  enablePreviewFeedback?: boolean;
  framework?: string;
  gitForkProtection?: boolean;
  installCommand?: string;
  name?: string;
  nodeVersion?: string;
  outputDirectory?: string;
  passwordProtection?: { deploymentType: "all" | "preview"; password?: string };
  publicSource?: boolean;
  rootDirectory?: string;
  serverlessFunctionRegion?: string;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  ssoProtection?: { deploymentType: "all" | "preview" };
};

export interface UpdateProjectResponse {
  accountId: string;
  analytics?: {
    id: string;
    canceledAt: number | null;
    disabledAt: number;
    enabledAt: number;
    paidAt?: number;
    sampleRatePercent?: number | null;
    spendLimitInDollars?: number | null;
  };
  autoExposeSystemEnvs?: boolean;
  buildCommand?: string | null;
  commandForIgnoringBuildStep?: string | null;
  createdAt?: number;
  devCommand?: string | null;
  directoryListing: boolean;
  installCommand?: string | null;
  env?: {
    target?: Target[] | Target;
    type: "secret" | "system" | "encrypted" | "plain";
    id?: string;
    key: string;
    value: string;
    configurationId?: string | null;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    gitBranch?: string;
    edgeConfigId?: string | null;
    /** Whether `value` is decrypted. */
    decrypted?: boolean;
  }[];
  framework?:
    | (
        | "blitzjs"
        | "nextjs"
        | "gatsby"
        | "remix"
        | "astro"
        | "hexo"
        | "eleventy"
        | "docusaurus-2"
        | "docusaurus"
        | "preact"
        | "solidstart"
        | "dojo"
        | "ember"
        | "vue"
        | "scully"
        | "ionic-angular"
        | "angular"
        | "polymer"
        | "svelte"
        | "sveltekit"
        | "ionic-react"
        | "create-react-app"
        | "gridsome"
        | "umijs"
        | "sapper"
        | "saber"
        | "stencil"
        | "nuxtjs"
        | "redwoodjs"
        | "hugo"
        | "jekyll"
        | "brunch"
        | "middleman"
        | "zola"
        | "vite"
        | "parcel"
        | "sanity"
        | "hydrogen"
      )
    | null;
  gitForkProtection?: boolean;
  id: string;
  latestDeployments?: {
    alias?: string[];
    aliasAssigned?: (number | boolean) | null;
    aliasError?: {
      code: string;
      message: string;
    } | null;
    aliasFinal?: string | null;
    automaticAliases?: string[];
    builds?: {
      use: string;
      src?: string;
      dest?: string;
    }[];
    createdAt: number;
    createdIn: string;
    creator: {
      email: string;
      githubLogin?: string;
      gitlabLogin?: string;
      uid: string;
      username: string;
    } | null;
    deploymentHostname: string;
    name: string;
    forced?: boolean;
    id: string;
    /** Construct a type with a set of properties K of type T */
    meta?: { [key: string]: string };
    monorepoManager?: string | null;
    plan: string;
    private: boolean;
    readyState: string;
    requestedAt?: number;
    target?: string | null;
    teamId?: string | null;
    type: string;
    url: string;
    userId: string;
    withCache?: boolean;
    checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
    checksState?: "registered" | "running" | "completed";
    readyAt?: number;
    buildingAt?: number;
  }[];
  link?:
    | {
        org?: string;
        repo?: string;
        repoId?: number;
        type?: "github";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        projectId?: string;
        projectName?: string;
        projectNameWithNamespace?: string;
        projectNamespace?: string;
        projectUrl?: string;
        type?: "gitlab";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        name?: string;
        slug?: string;
        owner?: string;
        type?: "bitbucket";
        uuid?: string;
        workspaceUuid?: string;
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      };
  name: string;
  nodeVersion: "18.x" | "16.x" | "14.x" | "12.x" | "10.x";
  outputDirectory?: string | null;
  passwordProtection?: {
    deploymentType: "all" | "preview";
  } | null;
  publicSource?: boolean | null;
  rootDirectory?: string | null;
  serverlessFunctionRegion?: string | null;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  ssoProtection?: {
    deploymentType: "all" | "preview";
  } | null;
  /** An object containing the deployment's metadata */
  targets?: { [key: string]: string };
  transferCompletedAt?: number;
  transferStartedAt?: number;
  transferToAccountId?: string;
  transferredFromAccountId?: string;
  updatedAt?: number;
  live?: boolean;
  enablePreviewFeedback?: boolean | null;
  permissions?: {
    aliasGlobal?: ACLAction[];
    aliasProject?: ACLAction[];
    analytics?: ACLAction[];
    analyticsSampling?: ACLAction[];
    analyticsUsage?: ACLAction[];
    auditLog?: ACLAction[];
    billingAddress?: ACLAction[];
    billingInformation?: ACLAction[];
    billingInvoice?: ACLAction[];
    billingInvoiceEmailRecipient?: ACLAction[];
    billingInvoiceLanguage?: ACLAction[];
    billingPlan?: ACLAction[];
    billingPurchaseOrder?: ACLAction[];
    billingTaxId?: ACLAction[];
    cacheArtifact?: ACLAction[];
    cacheArtifactUsageEvent?: ACLAction[];
    concurrentBuilds?: ACLAction[];
    deployment?: ACLAction[];
    deploymentCheck?: ACLAction[];
    deploymentCheckPreview?: ACLAction[];
    deploymentPreview?: ACLAction[];
    deploymentPrivate?: ACLAction[];
    deploymentRollback?: ACLAction[];
    domain?: ACLAction[];
    domainAcceptDelegation?: ACLAction[];
    domainAuthCodes?: ACLAction[];
    domainCertificate?: ACLAction[];
    domainCheckConfig?: ACLAction[];
    domainMove?: ACLAction[];
    domainPurchase?: ACLAction[];
    domainRecord?: ACLAction[];
    domainTransferIn?: ACLAction[];
    event?: ACLAction[];
    fileUpload?: ACLAction[];
    gitRepository?: ACLAction[];
    integration?: ACLAction[];
    integrationConfiguration?: ACLAction[];
    integrationConfigurationTransfer?: ACLAction[];
    integrationConfigurationProjects?: ACLAction[];
    integrationVercelConfigurationOverride?: ACLAction[];
    job?: ACLAction[];
    logDrain?: ACLAction[];
    monitoringQuery?: ACLAction[];
    monitoringChart?: ACLAction[];
    notificationDomainConfiguration?: ACLAction[];
    notificationDomainExpire?: ACLAction[];
    notificationDomainMoved?: ACLAction[];
    notificationDomainPurchase?: ACLAction[];
    notificationDomainRenewal?: ACLAction[];
    notificationDomainTransfer?: ACLAction[];
    notificationDomainUnverified?: ACLAction[];
    notificationPaymentFailed?: ACLAction[];
    notificationUsageAlert?: ACLAction[];
    notificationSpendCap?: ACLAction[];
    openTelemetryConfiguration?: ACLAction[];
    passwordProtection?: ACLAction[];
    paymentMethod?: ACLAction[];
    permissions?: ACLAction[];
    previewDeploymentSuffix?: ACLAction[];
    project?: ACLAction[];
    projectDeploymentHook?: ACLAction[];
    projectDomain?: ACLAction[];
    projectDomainMove?: ACLAction[];
    projectEnvVars?: ACLAction[];
    sharedEnvVars?: ACLAction[];
    projectEnvVarsProduction?: ACLAction[];
    sharedEnvVarsProduction?: ACLAction[];
    projectIntegrationConfiguration?: ACLAction[];
    projectLink?: ACLAction[];
    projectMember?: ACLAction[];
    projectProductionBranch?: ACLAction[];
    projectTransfer?: ACLAction[];
    projectProtectionBypass?: ACLAction[];
    rateLimit?: ACLAction[];
    remoteCaching?: ACLAction[];
    samlConfig?: ACLAction[];
    secret?: ACLAction[];
    spendCapConfiguration?: ACLAction[];
    spendCapState?: ACLAction[];
    supportCase?: ACLAction[];
    supportCaseComment?: ACLAction[];
    team?: ACLAction[];
    teamAccessRequest?: ACLAction[];
    teamFellowMembership?: ACLAction[];
    teamInvite?: ACLAction[];
    teamInviteCode?: ACLAction[];
    teamJoin?: ACLAction[];
    teamOwnMembership?: ACLAction[];
    teamOwnMembershipDisconnectSAML?: ACLAction[];
    token?: ACLAction[];
    usage?: ACLAction[];
    user?: ACLAction[];
    userConnection?: ACLAction[];
    webAnalytics?: ACLAction[];
    edgeConfig?: ACLAction[];
    edgeConfigItem?: ACLAction[];
    edgeConfigToken?: ACLAction[];
    webhook?: ACLAction[];
    aliasProtectionBypass?: ACLAction[];
  };
  lastRollbackTarget?: {
    fromDeploymentId: string;
    toDeploymentId: string;
    jobStatus: "succeeded" | "failed" | "skipped" | "pending" | "in-progress";
    requestedAt: number;
  } | null;
  hasFloatingAliases?: boolean;
  /** Construct a type with a set of properties K of type T */
  protectionBypass?: { [key: string]: string };
}

export type VerifyProjectDomainParams = {
  domain: string;
  projectId: string;
  teamId?: string;
};

export interface VerifyProjectDomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}
