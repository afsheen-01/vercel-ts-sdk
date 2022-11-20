import { beforeEach, expect, test } from "@jest/globals";
import {
  createAuthToken,
  deleteToken,
  getTokenMetadata,
  listAuthTokens,
  loginWithEmail,
  verifyLoginRequest,
} from "../src/authorization";
import { endpointMap, BASE_URL } from "../src/utils/common";
import { setVercelToken, listUserTokens } from "../src/index";

// cant use beforeAll because we explicitly set a wrong token in the first test
beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN);
});

test("get token (right token)", async () => {
  const { data, error } = await listUserTokens();
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.listUserTokens);
});

test("get token (with pagination param 'next')", async () => {
  const { data, error } = await listUserTokens({
    next: 89897787234,
    limit: 1,
  });
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.listUserTokens);
  expect(data?.query?.until).toBe("89897787234");
});

test("get token (with pagination param 'previous')", async () => {
  const { data, error } = await listUserTokens({
    previous: 89897787234,
    limit: 1,
  });
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.listUserTokens);
  expect(data?.query?.until).toBe("89897787234");
});

test("create a new token", async () => {
  const { data, error } = await createAuthToken({ name: "SDK Test" });
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.createAuthToken);
  expect(data?.body).toBe(JSON.stringify({ name: "SDK Test" }));
});

test("delete a token", async () => {
  const { data, error } = await deleteToken({ tokenId: "token1" });
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.deleteToken("token1"));
});

test("get token metadata", async () => {
  const { data, error } = await getTokenMetadata({
    tokenId: "token1",
  });
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.getTokenMetadata("token1"));
});

test("list auth tokens", async () => {
  const { data, error } = await listAuthTokens();
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.listAuthTokens);
});

test("login with email", async () => {
  const { data, error } = await loginWithEmail({
    email: "john@doe.com",
    token: "token1",
  });
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.loginWithEmail);
  expect(data?.method).toBe("post");
  expect(data?.body).toBe(
    JSON.stringify({
      email: "john@doe.com",
      token: "token1",
    })
  );
});

test("verify login request", async () => {
  const { data, error } = await verifyLoginRequest({
    token: "token1",
    email: "john@doe.com",
    tokenName: "token-name-1",
  });
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.verifyLoginRequest);
  expect(data?.method).toBe("get");
  expect(data?.query).toEqual({
    token: "token1",
    email: "john@doe.com",
    tokenName: "token-name-1",
  });
});
