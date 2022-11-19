import { Primitives } from "../types/fetch";
import { BASE_URL } from "./common";

export const constructQueryString = (
  url: string,
  query?: { [key: string]: Primitives }
): string => {
  const urlWithBase = `${BASE_URL}${url}`;
  if (!query) {
    return urlWithBase;
  }
  if (!Object.keys(query).length) {
    return urlWithBase;
  }
  const kvPairs = Object.entries(query);
  const params = kvPairs
    .map(
      (value) =>
        `${transformNextAndPrevious(value[0])}=${
          value[1] ? encodeURIComponent(value[1]) : ""
        }`
    )
    .join("&");
  return `${urlWithBase}?${params}`;
};

const transformNextAndPrevious = (key: string) => {
  return ["next", "previous"].includes(key) ? "until" : key;
};
