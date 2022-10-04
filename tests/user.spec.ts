import { beforeEach, expect, test } from "@jest/globals";
import { setVercelToken } from "../src";
import { deleteUser, getUser, getUserEvents } from "../src/user";

beforeEach(() => {
  setVercelToken(process.env?.VERCEL_TOKEN as string);
});

test("get current user", async () => {
  const { error, response } = await getUser();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get user events (no query params)", async () => {
  const { error, response, data } = await getUserEvents();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get user events (types as array)", async () => {
  const { error, response, data } = await getUserEvents({
    types: ["env_var_name"],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("initiate delete user workflow (should receive email for the testing user)", async () => {
  const { error, response } = await deleteUser();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(202);
});

test("initiate delete user workflow, with deletion reason (should receive email for the testing user)", async () => {
  const { error, response } = await deleteUser({
    reasons: [{ description: "test delete", slug: "test-del" }],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(202);
});
