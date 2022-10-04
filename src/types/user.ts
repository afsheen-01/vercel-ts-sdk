/** Data for the currently authenticated User. */
interface AuthUser {
  /** UNIX timestamp (in milliseconds) when the User account was created. */
  createdAt: number;
  /** When the User account has been "soft blocked", this property will contain the date when the restriction was enacted, and the identifier for why. */
  softBlock: {
    blockedAt: number;
    reason:
      | "FAIR_USE_LIMITS_EXCEEDED"
      | "ENTERPRISE_TRIAL_ENDED"
      | "BLOCKED_FOR_PLATFORM_ABUSE"
      | "UNPAID_INVOICE"
      | "SUBSCRIPTION_EXPIRED"
      | "SUBSCRIPTION_CANCELED";
  } | null;
  /** An object containing billing infomation associated with the User account. */
  billing: {
    currency?: "usd" | "eur";
    addons?: ("custom-deployment-suffix" | "live-support")[] | null;
    cancelation?: number | null;
    period: {
      start: number;
      end: number;
    } | null;
    contract?: {
      start: number;
      end: number;
    } | null;
    plan: "hobby" | "enterprise" | "pro";
    platform?: "stripe" | "stripeTestMode";
    programType?: "startup" | "agency";
    trial?: {
      start: number;
      end: number;
    } | null;
    email?: string | null;
    tax?: {
      type: string;
      id: string;
    } | null;
    language?: string | null;
    address?: {
      line1: string;
      line2?: string;
      postalCode?: string;
      city?: string;
      country?: string;
      state?: string;
    } | null;
    name?: string | null;
    overdue?: boolean | null;
    invoiceItems?: {
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      pro?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      enterprise?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      concurrentBuilds?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      saml?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      teamSeats?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      customCerts?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      previewDeploymentSuffix?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      passwordProtection?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      ssoProtection?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      /** Will be used to create an invoice item. The price must be in cents: 2000 for $20. */
      analytics?: {
        price: number;
        quantity: number;
        name?: string;
        hidden: boolean;
        createdAt?: number;
        frequency?: {
          interval: "month";
          intervalCount: 1 | 3 | 2 | 6 | 12;
        };
      };
      analyticsUsage?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      bandwidth?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      builds?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      serverlessFunctionExecution?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      sourceImages?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      artifacts?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
      edgeMiddlewareInvocations?: {
        price: number;
        batch: number;
        threshold: number;
        name?: string;
        hidden: boolean;
      };
    } | null;
    invoiceSettings?: {
      footer?: string;
    };
    subscriptions?:
      | {
          id: string;
          trial: {
            start: number;
            end: number;
          } | null;
          period: {
            start: number;
            end: number;
          };
          frequency: {
            interval: "month" | "day" | "week" | "year";
            intervalCount: number;
          };
          discount: {
            id: string;
            coupon: {
              id: string;
              name: string | null;
              amountOff: number | null;
              percentageOff: number | null;
              durationInMonths: number | null;
              duration: "forever" | "repeating" | "once";
            };
          } | null;
          items: {
            id: string;
            priceId: string;
            productId: string;
            amount: number;
            quantity: number;
          }[];
        }[]
      | null;
    controls?: {
      analyticsSampleRateInPercent?: number | null;
      analyticsSpendLimitInDollars?: number | null;
    } | null;
    purchaseOrder?: string | null;
    status?: "active" | "canceled" | "trialing" | "overdue" | "expired";
    pricingExperiment?: "august-2022";
  } | null;
  /** An object containing infomation related to the amount of platform resources may be allocated to the User account. */
  resourceConfig: {
    nodeType?: string;
    concurrentBuilds?: number;
    awsAccountType?: string;
    awsAccountIds?: string[];
    cfZoneName?: string;
  };
  /** Prefix that will be used in the URL of "Preview" deployments created by the User account. */
  stagingPrefix: string;
  /** set of dashboard view preferences (cards or list) per scopeId */
  activeDashboardViews?: {
    scopeId: string;
    viewPreference: "cards" | "list";
  }[];
  importFlowGitNamespace?: (string | number) | null;
  importFlowGitNamespaceId?: (string | number) | null;
  importFlowGitProvider?: "github" | "gitlab" | "bitbucket";
  preferredScopesAndGitNamespaces?: {
    scopeId: string;
    gitNamespaceId: (string | number) | null;
  }[];
  /** A record of when, under a certain scopeId, a toast was dismissed */
  dismissedToasts?: {
    name: string;
    dismissals: {
      scopeId: string;
      createdAt: number;
    }[];
  }[];
  /** Whether the user has a trial available for a paid plan subscription. */
  hasTrialAvailable: boolean;
  /** remote caching settings */
  remoteCaching?: {
    enabled?: boolean;
  };
  /** The User's unique identifier. */
  id: string;
  /** Email address associated with the User account. */
  email: string;
  /** Name associated with the User account, or `null` if none has been provided. */
  name: string | null;
  /** Unique username associated with the User account. */
  username: string;
  /** SHA1 hash of the avatar for the User account. Can be used in conjuction with the ... endpoint to retrieve the avatar image. */
  avatar: string | null;
}

/** A limited form of data for the currently authenticated User, due to the authentication token missing privileges to read the full User data. */
interface AuthUserLimited {
  /** Property indicating that this User data contains only limited information, due to the authentication token missing privileges to read the full User data. Re-login with email, GitHub, GitLab or Bitbucket in order to upgrade the authentication token with the necessary privileges. */
  limited: boolean;
  /** The User's unique identifier. */
  id: string;
  /** Email address associated with the User account. */
  email: string;
  /** Name associated with the User account, or `null` if none has been provided. */
  name: string | null;
  /** Unique username associated with the User account. */
  username: string;
  /** SHA1 hash of the avatar for the User account. Can be used in conjuction with the ... endpoint to retrieve the avatar image. */
  avatar: string | null;
}

export type UserResponse = {
  user: AuthUser | AuthUserLimited;
};

/** Array of events generated by the User. */
interface UserEvent {
  /** The unique identifier of the Event. */
  id: string;
  /** The human-readable text of the Event. */
  text: string;
  /** A list of "entities" within the event `text`. Useful for enhancing the displayed text with additional styling and links. */
  entities: {
    /** The type of entity. */
    type:
      | "target"
      | "author"
      | "bitbucket_login"
      | "bold"
      | "deployment_host"
      | "dns_record"
      | "git_link"
      | "github_login"
      | "gitlab_login"
      | "hook_name"
      | "integration"
      | "edge-config"
      | "link"
      | "project_name"
      | "scaling_rules"
      | "env_var_name"
      | "system";
    /** The index of where the entity begins within the `text` (inclusive). */
    start: number;
    /** The index of where the entity ends within the `text` (non-inclusive). */
    end: number;
  }[];
  /** Timestamp (in milliseconds) of when the event was generated. */
  createdAt: number;
  /** Metadata for the User who generated the event. */
  user?: {
    avatar: string;
    email: string;
    slug?: string;
    uid: string;
    username: string;
  };
  /** The unique identifier of the User who generated the event. */
  userId: string;
}

export type UserEventsResponse = {
  events: UserEvent[];
};

export type UserEventParams = {
  limit?: number;
  since?: string;
  teamID?: string;
  types?: UserEvent["entities"][number]["type"][];
  until?: string;
  userId?: string;
};

export type UserDeletionReason = {
  description: string;
  slug: string;
};
