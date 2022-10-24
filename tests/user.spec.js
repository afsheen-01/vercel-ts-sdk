import { beforeAll, expect, test } from "@jest/globals";
import { setVercelToken } from "../src";
import { endpointMap } from "../src/common";
import { deleteUser, getUser, getUserEvents } from "../src/user";

beforeAll(() => {
  setVercelToken(process.env?.VERCEL_TOKEN);
});

test("get current user", async () => {
  const { data, error } = await getUser();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.getUser);
});

test("get user events (no query params)", async () => {
  const { error, data } = await getUserEvents();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.getUserEvents);
});

test("get user events (types as array)", async () => {
  const { error, data } = await getUserEvents({
    types: ["env_var_name", "bold"],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.query?.types).toBe("env_var_name,bold");
});

test("initiate delete user workflow", async () => {
  const { error, data } = await deleteUser();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(endpointMap.deleteUser);
});

test("initiate delete user workflow, with deletion reason", async () => {
  const { error, data } = await deleteUser({
    reasons: [{ description: "test delete", slug: "test-del" }],
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.body).toBe(
    JSON.stringify({
      reasons: [{ description: "test delete", slug: "test-del" }],
    })
  );
});
