import { expect, test } from "@jest/globals";
import { constructPaginationString } from "../src/utils/pagination";

test("constructs url without query params", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
  });
  expect(result).toEqual(url);
});

test("constructs url with query params (limit only)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      limit: 10,
    },
  });
  expect(result).toEqual(url + "?limit=10");
});

test("constructs url with query params (limit and next)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      limit: 10,
      next: 20,
    },
  });
  expect(result).toEqual(url + "?limit=10&until=20");
});

test("constructs url with query params (limit and previous)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      limit: 4,
      previous: 5,
    },
  });
  expect(result).toEqual(url + "?limit=4&until=5");
});

test("constructs url with query params (next only)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      next: 5,
    },
  });
  expect(result).toBe(url + "?until=5");
});

test("constructs url with query params (previous only)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      previous: 2,
    },
  });
  expect(result).toBe(url + "?until=2");
});
