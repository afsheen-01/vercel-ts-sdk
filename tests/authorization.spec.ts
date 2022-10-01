import { beforeEach, expect, test } from "@jest/globals";
import { createAuthToken } from "../src/authorization";
import { setVercelToken, getUserTokens } from "../src/index";

beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN as string);
});

test("get token (wrong token)", async () => {
  setVercelToken("abradabra");
  const { data, error } = await getUserTokens();
  expect(data).toBe(null);
  expect(error?.status).toEqual(403);
});

test("get token (right token)", async () => {
  const { data, error } = await getUserTokens();
  expect(error).toBe(null);
  expect(data).not.toBe(null);
});

test("get token (right token)", async () => {
  const { data, error } = await createAuthToken();
  console.log(data, error)
  expect(error).toBe(null);
  expect(data).not.toBe(null);
});
