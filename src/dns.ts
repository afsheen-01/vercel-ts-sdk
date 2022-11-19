import {
  CreateDNSRecordParams,
  CreateDNSRecordResponse,
  DeleteDNSRecordParams,
  DeleteDNSRecordResponse,
  ListDNSRecordsParams,
  ListDNSRecordsResponse,
} from "./types/dns";
import { endpointMap } from "./utils/common";
import { del, get, post } from "./utils/fetch";

export const createDNSRecord = (params: CreateDNSRecordParams) => {
  const { domain, teamId, type } = params;
  return post<CreateDNSRecordResponse>(endpointMap.createDNSRecord(domain), {
    ...(teamId && { query: { teamId } }),
    ...(type && { data: { type } }),
  });
};

export const deleteDNSRecord = (params: DeleteDNSRecordParams) => {
  const { domain, recordId, teamId } = params;
  return del<DeleteDNSRecordResponse>(
    endpointMap.deleteDNSRecord({
      domain,
      recordId,
    }),
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const listDNSRecords = (params: ListDNSRecordsParams) => {
  const { domain, ...rest } = params;
  return get<ListDNSRecordsResponse>(endpointMap.listDNSRecords(domain), {
    ...(Object.keys(rest).length && { query: rest }),
  });
};
