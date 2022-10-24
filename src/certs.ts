import { omit } from "lodash";
import { endpointMap } from "./common";
import {
  removeCertParamsSchema,
  getCertParamsSchema,
  issueNewCertParamsSchema,
  uploadCertParamsSchema,
} from "./schema/certs";
import {
  Cert,
  GetCertParams,
  IssueNewCertParams,
  RemoveCertParams,
  UploadCertParams,
} from "./types/certs";
import { del, get, post, put } from "./utils/fetch";
import {
  returnValidationError,
  validateSchema,
} from "./utils/zod-error-wrapper";

export const uploadCert = (params: UploadCertParams) => {
  const { error } = validateSchema({
    schema: uploadCertParamsSchema,
    data: params,
  });
  if (error) {
    return returnValidationError(error);
  }
  const { teamId } = params;
  const data = omit(params, ["teamId"]);
  return put<Cert>(endpointMap.uploadCert, {
    ...(teamId && { query: { teamId } }),
    data,
  });
};

export const getCert = (params: GetCertParams) => {
  const { error } = validateSchema({
    schema: getCertParamsSchema,
    data: params,
  });
  if (error) {
    return returnValidationError(error);
  }
  const { certId, teamId } = params;
  return get<Cert>(endpointMap.getCert(certId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const removeCert = (params: RemoveCertParams) => {
  const { error } = validateSchema({
    schema: removeCertParamsSchema,
    data: params,
  });
  if (error) {
    return returnValidationError(error);
  }
  const { certId, teamId } = params;
  return del<{}>(endpointMap.deleteCert(certId), {
    ...(teamId && { query: { teamId } }),
  });
};

export const issueNewCert = (params?: IssueNewCertParams) => {
  const { error } = validateSchema({
    schema: issueNewCertParamsSchema,
    data: params,
  });
  if (error) {
    return returnValidationError(error);
  }
  const { cns, teamId } = params || {};
  return post<Cert>(`${endpointMap.issueCert}`, {
    ...(teamId && { query: { teamId } }),
    ...(cns && { data: { cns } }),
  });
};
