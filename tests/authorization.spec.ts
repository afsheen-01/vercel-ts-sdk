import { beforeEach, expect, test } from "@jest/globals";
import { createAuthToken, deleteToken } from "../src/authorization";
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

test("create a new token", async () => {
  const { data, error } = await createAuthToken({ name: "SDK Test" });
  expect(error).toBe(null);
  expect(data).not.toBe(null);
});

test("delete a token", async () => {
  const { data, error } = await createAuthToken({
    name: "token to test delete function",
  });
  if (error) throw error;
  if (!data) throw new Error("No data returned from the response.");
  const {
    token: { id },
  } = data;
  const { response, error: delError } = await deleteToken({ tokenId: id });
  expect(delError).toBe(null);
  expect(response?.status).toBe(200);
});
