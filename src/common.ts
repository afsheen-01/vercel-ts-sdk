import { FetchError, Response } from "node-fetch";

export let config: {
  [key: string]: string;
} = {
  "Content-Type": "application/json",
};

export const setVercelToken = (token: string) => {
  config = {
    ...config,
    Authorization: `Bearer ${token}`,
  };
};

export const BASE_URL = "https://api.vercel.com";

export const endpointMap = {
  userTokens: `${BASE_URL}/v5/user/tokens`,
};

const nullIfUndefined = (val: any) => {
  if (val === undefined) {
    return null;
  } else {
    return val;
  }
};

class CustomError extends Error {
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
  fetchFn: () => Promise<Response>
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
    const res = await fetchFn();
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

export type PaginationParameters =
  | {
      limit: number;
    }
  | {
      limit: number;
      next: number;
    }
  | {
      limit: number;
      previous: number;
    }
  | {
      next: number;
    }
  | {
      previous: number;
    };

export const constructPaginationString = ({
  url,
  paginationParameters,
}: {
  url: string;
  paginationParameters?: PaginationParameters;
}) => {
  if (paginationParameters) {
    const listOfParams = [
      [
        "limit",
        "limit" in paginationParameters ? paginationParameters.limit : null,
      ],
      [
        "until",
        "next" in paginationParameters ? paginationParameters.next : null,
      ],
      [
        "until",
        "previous" in paginationParameters
          ? paginationParameters.previous
          : null,
      ],
    ].filter(([_, val]) => val !== null);
    const queryParams =
      "?" + listOfParams.map(([key, val]) => `${key}=${val}`).join("&");
    return url + queryParams;
  }
  return url;
};

[["limit", 10]];
