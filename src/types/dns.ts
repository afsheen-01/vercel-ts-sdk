import { Pagination, PaginationParameters } from "./pagination";

export type CreateDNSRecordParams = {
  domain: string;
  teamId?: string;
  type: string;
};

export type CreateDNSRecordResponse =
  | {
      uid: string;
      updated: number;
    }
  | {
      /** The id of the newly created DNS record */
      uid: string;
    };

export type DeleteDNSRecordParams = {
  domain: string;
  recordId: string;
  teamId?: string;
};

export interface DeleteDNSRecordResponse {
  [key: string]: unknown;
}

export type ListDNSRecordsParams = {
  domain: string;
  since?: string;
  teamId?: string;
} & PaginationParameters;

export type ListDNSRecordsResponse =
  | string
  | {
      records: {
        id: string;
        slug: string;
        name: string;
        type:
          | "A"
          | "AAAA"
          | "ALIAS"
          | "CAA"
          | "CNAME"
          | "MX"
          | "SRV"
          | "TXT"
          | "NS";
        value: string;
        mxPriority?: number;
        priority?: number;
        creator: string;
        created: number | null;
        updated: number | null;
        createdAt: number | null;
        updatedAt: number | null;
      }[];
    }
  | {
      records: {
        id: string;
        slug: string;
        name: string;
        type:
          | "A"
          | "AAAA"
          | "ALIAS"
          | "CAA"
          | "CNAME"
          | "MX"
          | "SRV"
          | "TXT"
          | "NS";
        value: string;
        mxPriority?: number;
        priority?: number;
        creator: string;
        created: number | null;
        updated: number | null;
        createdAt: number | null;
        updatedAt: number | null;
      }[];
      pagination: Pagination;
    };
