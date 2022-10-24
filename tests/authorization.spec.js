import { beforeEach, expect, test } from "@jest/globals";
import {
  createAuthToken,
  deleteToken,
  getTokenMetadata,
} from "../src/authorization";
import { endpointMap } from "../src/common";
import { setVercelToken, getUserTokens } from "../src/index";

// cant use beforeAll because we explicitly set a wrong token in the first test
beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN);
});

test("get token (right token)", async () => {
  const { data, error } = await getUserTokens();
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.getUserTokens);
});

test("get token (with pagination param 'next')", async () => {
  const { data, error } = await getUserTokens({
    next: 89897787234,
    limit: 1,
  });
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.getUserTokens);
  expect(data?.query?.until).toBe("89897787234");
});

test("get token (with pagination param 'previous')", async () => {
  const { data, error } = await getUserTokens({
    previous: 89897787234,
    limit: 1,
  });
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.getUserTokens);
  expect(data?.query?.until).toBe("89897787234");
});

test("create a new token", async () => {
  const { data, error } = await createAuthToken({ name: "SDK Test" });
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.createAuthToken);
  expect(data?.body).toBe(JSON.stringify({ name: "SDK Test" }));
});

test("delete a token", async () => {
  const { data, error } = await deleteToken({ tokenId: "token1" });
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.deleteToken("token1"));
});

test("get token metadata", async () => {
  const { data, error } = await getTokenMetadata({
    tokenId: "token1",
  });
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.getTokenMetadata("token1"));
});
