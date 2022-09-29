type Limit = { limit: number; next?: never; previous?: never };
type Next = { next: number; previous?: never; limit?: never };
type Previous = { previous: number; next?: never; limit?: never };
type LimitNext = { limit: number; next: number; previous?: never };
type LimitPrevious = { limit: number; previous: number; next?: never };

export type PaginationParameters =
  | Limit
  | Next
  | Previous
  | LimitPrevious
  | LimitNext;

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
