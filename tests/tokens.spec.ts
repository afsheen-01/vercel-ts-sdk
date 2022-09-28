import { beforeEach, expect, test } from "@jest/globals";
import { setVercelToken, getUserTokens } from "../src/index";

beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN as string);
});

test("get token", async () => {
  const res = await getUserTokens();
  console.log(await res.json(), await res.status, await res.statusText);
  expect(true).toEqual(true);
});
