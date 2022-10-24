import { beforeAll, expect, test } from "@jest/globals";
import { setVercelToken } from "../src";
import { deleteUser, getUser, getUserEvents } from "../src/user";

beforeAll(() => {
  setVercelToken(process.env?.VERCEL_TOKEN);
});

test("get current user", async () => {
  const { error, response } = await getUser();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get user events (no query params)", async () => {
  const { error, response } = await getUserEvents();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get user events (types as array)", async () => {
  const { error, response, data } = await getUserEvents({
    types: ["bold"],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get user events (types as array but invalid value)", async () => {
  const { error, response, data } = await getUserEvents({
    types: ["jumba"],
  });
  expect(error).not.toBe(null);
  expect(data).toBe(null);
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
