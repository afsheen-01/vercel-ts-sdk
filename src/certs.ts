import { omit } from "lodash";
import { endpointMap } from "./common";
import { Cert } from "./types/certs";
import { del, get, post, put } from "./utils/fetch";

export const uploadCert = (params: {
  teamId?: string;
  ca: string;
  cert: string;
  key: string;
  skipValidation?: boolean;
}) => {
  const { teamId } = params;
  const data = omit(params, ["teamId"]);
  return put<Cert>(endpointMap.uploadCert, {
    ...(teamId && { query: { teamId } }),
    data,
  });
};

export const getCert = (params: { teamId?: string; id: string }) => {
  const { id, teamId } = params;
  return get<Cert>(`${endpointMap.getCert}/${id}`, {
    ...(teamId && { query: { teamId } }),
  });
};

export const deleteCert = (params: { teamId?: string; id: string }) => {
  const { id, teamId } = params;
  return del<{}>(`${endpointMap.deleteCert}/${id}`, {
    ...(teamId && { query: { teamId } }),
  });
};

export const issueNewCert = (params?: { teamId?: string; cns?: string[] }) => {
  const { cns, teamId } = params || {};
  return post<Cert>(`${endpointMap.issueCert}`, {
    ...(teamId && { query: { teamId } }),
    ...(cns && { data: { cns } }),
  });
};

export {};
