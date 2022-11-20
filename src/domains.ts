import {
  CheckDomainAvailabilityParams,
  CheckDomainAvailabilityResponse,
  CheckDomainPriceParams,
  CheckDomainPriceResponse,
  GetDomainConfigParams,
  GetDomainConfigResponse,
  GetDomainInfoParams,
  GetDomainInfoResponse,
  ListDomainsParams,
  ListDomainsResponse,
  PurchaseDomainParams,
  RegisterOrTransferDomainParams,
  RegisterOrTransferDomainResponse,
  RemoveDomainParams,
  RemoveDomainResponse,
} from "./types/domains";
import { endpointMap } from "./utils/common";
import { del, get, post } from "./utils/fetch";

export const checkDomainAvailability = (
  params: CheckDomainAvailabilityParams
) => {
  return get<CheckDomainAvailabilityResponse>(
    endpointMap.checkDomainAvailability,
    {
      query: params,
    }
  );
};

export const checkDomainPrice = (params: CheckDomainPriceParams) => {
  return get<CheckDomainPriceResponse>(endpointMap.checkDomainPrice, {
    query: params,
  });
};

export const getDomainInfo = (params: GetDomainInfoParams) => {
  const { domain, teamId } = params;
  return get<GetDomainInfoResponse>(endpointMap.getDomainInfo(domain), {
    ...(teamId && { query: { teamId } }),
  });
};

export const getDomainConfig = (params: GetDomainConfigParams) => {
  const { domain, teamId } = params;
  return get<GetDomainConfigResponse>(endpointMap.getDomainConfig(domain), {
    ...(teamId && { query: { teamId } }),
  });
};

export const listDomains = (params?: ListDomainsParams) => {
  return get<ListDomainsResponse>(endpointMap.listDomains, {
    ...(params && { query: params }),
  });
};

export const purchaseDomain = (params: PurchaseDomainParams) => {
  const { teamId, ...rest } = params;
  return post<{}>(endpointMap.purchaseDomain, {
    ...(teamId && { query: { teamId } }),
    data: rest,
  });
};

export const registerOrTransferDomain = (
  params?: RegisterOrTransferDomainParams
) => {
  const { teamId } = params || {};
  return post<RegisterOrTransferDomainResponse>(
    endpointMap.registerOrTransferDomain,
    {
      ...(teamId && { query: { teamId } }),
    }
  );
};

export const removeDomain = (params: RemoveDomainParams) => {
  const { domain, teamId } = params;
  return del<RemoveDomainResponse>(endpointMap.removeDomain(domain), {
    ...(teamId && { query: { teamId } }),
  });
};
