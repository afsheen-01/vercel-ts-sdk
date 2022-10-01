import fetch, {RequestInit, RequestInfo} from "node-fetch";

export let debugMode = process.env?.DEBUG === "true";

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
  url: RequestInfo,
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
