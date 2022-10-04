import { RequestInfo } from "node-fetch";
import { Primitives } from "../types/fetch";

export const constructQueryString = (
  url: string,
  query?: { [key: string]: Primitives }
): string => {
  if (!query) {
    return url;
  }
  const kvPairs = Object.entries(query);
  const params = kvPairs
    .map((value) => `${value[0]}=${encodeURIComponent(value[1] as Primitives)}`)
    .join("&");
  return `${url}?${params}`;
};
