import { Response } from "node-fetch";

export type Primitives = string | number | boolean | undefined;

export type WrapperError = {
  message: string;
  errorData: any;
  status: number | null;
  statusText: string | null;
};

export type AsyncFetchResponse<T> = {
  data: T | null;
  error: WrapperError | null;
  response: Response | null;
};
