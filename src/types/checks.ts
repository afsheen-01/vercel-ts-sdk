export type CreateNewCheckParams = {
  deploymentId: string;
  teamId?: string;
  blocking?: boolean;
  name: string;
  detailsUrl?: string;
  externalId?: string;
  path?: string;
  rerequestable?: boolean;
};

export interface CreateNewCheckResponse {
  /** The Identity Provider "type", for example Okta. */
  type: string;
  /** Current status of the connection. */
  status: string;
  /** Current state of the connection. */
  state: string;
  /** Timestamp (in milliseconds) of when the configuration was connected. */
  connectedAt: number;
}

export type GetCheckParams = {
  deploymentId: string;
  checkId: string;
  teamId?: string;
};

export interface GetCheckResponse {
  id: string;
  name: string;
  path?: string;
  status: "registered" | "running" | "completed";
  conclusion?:
    | "canceled"
    | "failed"
    | "neutral"
    | "succeeded"
    | "skipped"
    | "stale";
  blocking: boolean;
  output?: {
    metrics?: {
      FCP: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      LCP: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      CLS: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      TBT: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      virtualExperienceScore?: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
    };
  };
  detailsUrl?: string;
  integrationId: string;
  deploymentId: string;
  externalId?: string;
  createdAt: number;
  updatedAt: number;
  startedAt?: number;
  completedAt?: number;
  rerequestable?: boolean;
}

export type ReRequestCheckParams = {
  checkId: string;
  deploymentId: string;
  teamId?: string;
};

export interface ReRequestCheckResponse {
  [key: string]: any;
}

export type ListChecksParams = {
  teamId?: string;
  deploymentId: string;
};

export interface ListChecksResponse {
  checks: {
    completedAt?: number;
    conclusion?:
      | "canceled"
      | "failed"
      | "neutral"
      | "succeeded"
      | "skipped"
      | "stale";
    createdAt: number;
    detailsUrl?: string;
    id: string;
    integrationId: string;
    name: string;
    output?: {
      metrics?: {
        FCP: {
          value: number | null;
          previousValue?: number;
          source: "web-vitals";
        };
        LCP: {
          value: number | null;
          previousValue?: number;
          source: "web-vitals";
        };
        CLS: {
          value: number | null;
          previousValue?: number;
          source: "web-vitals";
        };
        TBT: {
          value: number | null;
          previousValue?: number;
          source: "web-vitals";
        };
        virtualExperienceScore?: {
          value: number | null;
          previousValue?: number;
          source: "web-vitals";
        };
      };
    };
    path?: string;
    rerequestable: boolean;
    startedAt?: number;
    status: "registered" | "running" | "completed";
    updatedAt: number;
  }[];
}

export type UpdateCheckParams = {
  deploymentId: string;
  checkId: string;
  teamId?: string;
  conclusion?: "canceled" | "failed" | "neutral" | "succeeded" | "skipped";
  detailsUrl?: string;
  externalId?: string;
  name?: string;
  output?: {
    metrics?: {
      FCP: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      LCP: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      CLS: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      TBT: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
      virtualExperienceScore?: {
        value: number | null;
        previousValue?: number;
        source: "web-vitals";
      };
    };
  };
  path?: string;
  status?: "running" | "completed";
};

export interface UpdateCheckResponse {
  /** The Identity Provider "type", for example Okta. */
  type: string;
  /** Current status of the connection. */
  status: string;
  /** Current state of the connection. */
  state: string;
  /** Timestamp (in milliseconds) of when the configuration was connected. */
  connectedAt: number;
}
