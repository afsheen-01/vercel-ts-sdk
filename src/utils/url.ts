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
    .map(
      (value) =>
        `${transformNextAndPrevious(value[0])}=${
          value[1] ? encodeURIComponent(value[1]) : ""
        }`
    )
    .join("&");
  return `${url}?${params}`;
};

const transformNextAndPrevious = (key: string) => {
  return ["next", "previous"].includes(key) ? "until" : key;
};
