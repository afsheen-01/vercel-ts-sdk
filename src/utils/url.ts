import { RequestInfo } from "node-fetch";
import { Primitives } from "../types/fetch";

export const constructQueryString = (
  url: string,
  query?: { [key: string]: Primitives | undefined }
): string => {
  if (!query) {
    return url;
  }
  const kvPairs = Object.entries(query);
  const params = kvPairs
    .filter((value) => value[1] !== undefined) // we remove those keys whose values are undefined. that is, the keys are useless.
    .map((value) => `${value[0]}=${encodeURIComponent(value[1] as Primitives)}`) // coercing TS because it doesn't understand that the previous step filters out the undefined values
    .join("&");
  return `${url}?${params}`;
};
