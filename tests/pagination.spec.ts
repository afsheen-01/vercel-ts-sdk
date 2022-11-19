// test for the constructQueryString function to ensure 'next' and 'prev' keys are changed to `until`

import { expect, test } from "@jest/globals";
import { PaginationParameters } from "../src/types/pagination";
import { BASE_URL } from "../src/utils/common";
import { constructQueryString } from "../src/utils/url";

test("next -> until", () => {
  const query: PaginationParameters = { next: 10, limit: 30 };
  const string = constructQueryString("/v2", query);
  expect(string).toBe(`${BASE_URL}/v2?until=10&limit=30`);
});

test("previous -> until", () => {
  const query: PaginationParameters = { previous: 10, limit: 30 };
  const string = constructQueryString("", query);
  expect(string).toBe(`${BASE_URL}?until=10&limit=30`);
});

test("next -> until, no limit param", () => {
  const query: PaginationParameters = { next: 1001 };
  const string = constructQueryString("/v1", query);
  expect(string).toBe(`${BASE_URL}/v1?until=1001`);
});

test("previous -> until, no limit param", () => {
  const query: PaginationParameters = { previous: 1001 };
  const string = constructQueryString("/v1", query);
  expect(string).toBe(`${BASE_URL}/v1?until=1001`);
});
