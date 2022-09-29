import { beforeEach, expect, test } from "@jest/globals";
import { constructPaginationString } from "../src/common";

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

test("constructs url with query params (limit only)", async () => {
  const url = "https://google.com";
  const result = constructPaginationString({
    url,
    paginationParameters: {
      limit: 10,
      next: 100,
    },
  });
  expect(result).toEqual(url + "?limit=10&until=100");
});
