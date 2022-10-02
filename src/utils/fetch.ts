import { merge } from "lodash";
import { config, debugMode, nullIfUndefined } from "../common";
import { Primitives } from "../types/fetch";
import { constructQueryString } from "./url";
import fetch, { RequestInfo, RequestInit } from "node-fetch";

const headersWithConfig = (headers: RequestInit["headers"]) =>
  merge({}, headers, config);

export class CustomError extends Error {
  status: number | null = null;
  statusText: string | null = null;
  message: string = "";
  errorData: any = null;

  constructor({
    message,
    status,
    statusText,
    errorData,
  }: {
    message: string;
    status?: number | null;
    statusText?: string | null;
    errorData?: any;
  }) {
    super();
    this.message = message;
    this.status = nullIfUndefined(status);
    this.statusText = nullIfUndefined(statusText);
    this.errorData = nullIfUndefined(errorData);
  }
}
export const asyncFetchWrapper = async <T>(
  url: string,
  options?: RequestInit
) => {
  type WrapperError = {
    message: string;
    errorData: any;
    status: number | null;
    statusText: string | null;
  };
  let data: T | null = null,
    error: null | WrapperError = null;
  try {
    if (debugMode) {
      console.log(options?.method?.toUpperCase() || "GET", url);
      {
        options?.body && console.log(`Request Body: ${options?.body}`);
      }
    }
    const res = await fetch(url, options);
    if (res.ok) {
      data = await res.json();
    } else {
      const { status, statusText } = res;
      throw new CustomError({
        message: "Response returned a non-2xx code",
        status,
        statusText,
        errorData: await res.json(),
      });
    }
  } catch (e) {
    const isCustomError = e instanceof CustomError;
    if (isCustomError) {
      error = e;
    } else {
      error = {
        message: e?.toString() || "",
        errorData: e,
        status: null,
        statusText: null,
      };
    }
  }
  return { data, error };
};

type _RequestInit = RequestInit & {
  query?: { [key: string]: Primitives };
  data?: { [key: string]: any };
};

export const get = (url: string, options?: _RequestInit) => {
  const urlWithParams = constructQueryString(url, options?.query);
  return asyncFetchWrapper(urlWithParams, {
    ...options,
    method: "get",
    headers: headersWithConfig(options?.headers),
  });
};

export const post = (url: string, options?: _RequestInit) => {
  const urlWithParams = constructQueryString(url, options?.query);
  return asyncFetchWrapper(urlWithParams, {
    ...options,
    method: "post",
    headers: headersWithConfig(options?.headers),
    body: JSON.stringify(options?.data || {}),
  });
};

export const put = (url: string, options?: _RequestInit) => {
  const urlWithParams = constructQueryString(url, options?.query);
  return asyncFetchWrapper(urlWithParams, {
    ...options,
    method: "put",
    headers: headersWithConfig(options?.headers),
    body: JSON.stringify(options?.data || {}),
  });
};

export const patch = (url: string, options?: _RequestInit) => {
  const urlWithParams = constructQueryString(url, options?.query);
  return asyncFetchWrapper(urlWithParams, {
    ...options,
    method: "patch",
    headers: headersWithConfig(options?.headers),
    body: JSON.stringify(options?.data || {}),
  });
};

export const del = (url: string, options?: _RequestInit) => {
  const urlWithParams = constructQueryString(url, options?.query);
  return asyncFetchWrapper(urlWithParams, {
    ...options,
    method: "delete",
    headers: headersWithConfig(options?.headers),
  });
};
