import { Pagination, PaginationParameters } from "./pagination";

export type CheckDomainAvailabilityParams = {
  name: string;
  teamId?: string;
};

export type CheckDomainAvailabilityResponse = {
  available: boolean;
};

export type CheckDomainPriceParams = {
  name: string;
  teamId?: string;
  type?: string;
};

export type CheckDomainPriceResponse = {
  /** The domain price in USD. */
  price: number;
  /** The number of years the domain could be held before paying again. */
  period: number;
};

export type GetDomainInfoParams = {
  domain: string;
  teamId?: string;
};

export type GetDomainInfoResponse = {
  domain: {
    suffix: boolean;
    /** If the domain has the ownership verified. */
    verified: boolean;
    /** A list of the current nameservers of the domain. */
    nameservers: string[];
    /** A list of the intended nameservers for the domain to point to Vercel DNS. */
    intendedNameservers: string[];
    /** A list of custom nameservers for the domain to point to. Only applies to domains purchased with Vercel. */
    customNameservers?: string[];
    /** An object containing information of the domain creator, including the user's id, username, and email. */
    creator: {
      username: string;
      email: string;
      customerId?: string | null;
      isDomainReseller?: boolean;
      id: string;
    };
    /** Timestamp in milliseconds when the domain was created in the registry. */
    createdAt: number;
    /** The unique identifier of the domain. */
    id: string;
    /** The domain name. */
    name: string;
    /** Timestamp in milliseconds at which the domain is set to expire. `null` if not bought with Vercel. */
    expiresAt: number | null;
    /** If it was purchased through Vercel, the timestamp in milliseconds when it was purchased. */
    boughtAt: number | null;
    /** Timestamp in milliseconds at which the domain was ordered. */
    orderedAt?: number;
    /** Indicates whether the domain is set to automatically renew. */
    renew?: boolean;
    /** The type of service the domain is handled by. `external` if the DNS is externally handled, `zeit.world` if handled with Vercel, or `na` if the service is not available. */
    serviceType: "zeit.world" | "external" | "na";
    /** Timestamp in milliseconds at which the domain was successfully transferred into Vercel. `null` if the transfer is still processing or was never transferred in. */
    transferredAt?: number | null;
    /** If transferred into Vercel, timestamp in milliseconds when the domain transfer was initiated. */
    transferStartedAt?: number;
  };
};

export type GetDomainConfigParams = {
  domain: string;
  teamId?: string;
};

export interface GetDomainConfigResponse {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ("CNAME" | "A" | "http") | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ("dns-01" | "http-01")[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
}

export type ListDomainsParams = {
  teamId?: string;
  since?: number;
} & PaginationParameters;

export type ListDomainsResponse = {
  domains: {
    /** If the domain has the ownership verified. */
    verified: boolean;
    /** A list of the current nameservers of the domain. */
    nameservers: string[];
    /** A list of the intended nameservers for the domain to point to Vercel DNS. */
    intendedNameservers: string[];
    /** A list of custom nameservers for the domain to point to. Only applies to domains purchased with Vercel. */
    customNameservers?: string[];
    /** An object containing information of the domain creator, including the user's id, username, and email. */
    creator: {
      username: string;
      email: string;
      customerId?: string | null;
      isDomainReseller?: boolean;
      id: string;
    };
    /** Timestamp in milliseconds when the domain was created in the registry. */
    createdAt: number;
    /** The unique identifier of the domain. */
    id: string;
    /** The domain name. */
    name: string;
    /** Timestamp in milliseconds at which the domain is set to expire. `null` if not bought with Vercel. */
    expiresAt: number | null;
    /** If it was purchased through Vercel, the timestamp in milliseconds when it was purchased. */
    boughtAt: number | null;
    /** Timestamp in milliseconds at which the domain was ordered. */
    orderedAt?: number;
    /** Indicates whether the domain is set to automatically renew. */
    renew?: boolean;
    /** The type of service the domain is handled by. `external` if the DNS is externally handled, `zeit.world` if handled with Vercel, or `na` if the service is not available. */
    serviceType: "zeit.world" | "external" | "na";
    /** Timestamp in milliseconds at which the domain was successfully transferred into Vercel. `null` if the transfer is still processing or was never transferred in. */
    transferredAt?: number | null;
    /** If transferred into Vercel, timestamp in milliseconds when the domain transfer was initiated. */
    transferStartedAt?: number;
  }[];
  pagination: Pagination;
};

export type PurchaseDomainParams = {
  teamId?: string;
  name: string;
  expectedPrice?: number;
  renew?: boolean;
};

export type RegisterOrTransferDomainParams = {
  teamId?: string;
};

export type RegisterOrTransferDomainResponse = {
  domain: {
    /** If the domain has the ownership verified. */
    verified: boolean;
    /** A list of the current nameservers of the domain. */
    nameservers: string[];
    /** A list of the intended nameservers for the domain to point to Vercel DNS. */
    intendedNameservers: string[];
    /** A list of custom nameservers for the domain to point to. Only applies to domains purchased with Vercel. */
    customNameservers?: string[];
    /** An object containing information of the domain creator, including the user's id, username, and email. */
    creator: {
      username: string;
      email: string;
      customerId?: string | null;
      isDomainReseller?: boolean;
      id: string;
    };
    /** Timestamp in milliseconds when the domain was created in the registry. */
    createdAt: number;
    /** The unique identifier of the domain. */
    id: string;
    /** The domain name. */
    name: string;
    /** Timestamp in milliseconds at which the domain is set to expire. `null` if not bought with Vercel. */
    expiresAt: number | null;
    /** If it was purchased through Vercel, the timestamp in milliseconds when it was purchased. */
    boughtAt: number | null;
    /** Timestamp in milliseconds at which the domain was ordered. */
    orderedAt?: number;
    /** Indicates whether the domain is set to automatically renew. */
    renew?: boolean;
    /** The type of service the domain is handled by. `external` if the DNS is externally handled, `zeit.world` if handled with Vercel, or `na` if the service is not available. */
    serviceType: "zeit.world" | "external" | "na";
    /** Timestamp in milliseconds at which the domain was successfully transferred into Vercel. `null` if the transfer is still processing or was never transferred in. */
    transferredAt?: number | null;
    /** If transferred into Vercel, timestamp in milliseconds when the domain transfer was initiated. */
    transferStartedAt?: number;
  };
};

export type RemoveDomainParams = {
  domain: string;
  teamId?: string;
};

export type RemoveDomainResponse = {
  uuid: string;
};
