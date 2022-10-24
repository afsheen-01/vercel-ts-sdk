import { omit } from "lodash";
import { endpointMap } from "./common";
import {
  Cert,
  GetCertParams,
  IssueNewCertParams,
  RemoveCertParams,
  UploadCertParams,
} from "./types/certs";
import { del, get, post, put } from "./utils/fetch";

export const uploadCert = (params: UploadCertParams) => {
  const { teamId } = params;
  const data = omit(params, ["teamId"]);
  return put<Cert>(endpointMap.uploadCert, {
    ...(teamId && { query: { teamId } }),
    data,
  });
};

export const getCert = (params: GetCertParams) => {
  const { certId, teamId } = params;
  return get<Cert>(endpointMap.getCert(certId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const removeCert = (params: RemoveCertParams) => {
  const { certId, teamId } = params;
  return del<{}>(endpointMap.deleteCert(certId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const issueNewCert = (params?: IssueNewCertParams) => {
  const { cns, teamId } = params || {};
  return post<Cert>(`${endpointMap.issueCert}`, {
    ...(teamId && { query: { teamId } }),
    ...(cns && { data: { cns } }),
  });
};
