import { beforeEach, expect, test } from "@jest/globals";
import {
  listAliases,
  setVercelToken,
  assignAlias,
  deleteAlias,
  getAlias,
  listDeploymentAliases,
} from "../src";

beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN as string);
});

test("list all aliases", async () => {
  const { data, error, response } = await listAliases();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("list all deployment aliases", async () => {
  const { error, response } = await listDeploymentAliases({
    id: "dpl_EdaCvFJzKgcXoHmfvJUVdFrJtQfi", // this is some test deployment ID I found on my account. wont work for other tokens.
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("get alias", async () => {
  const { response, error, data } = await getAlias({
    id: "pyor-website-druchan.vercel.app",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("assign alias", async () => {
  const { data, response, error } = await assignAlias({
    id: "dpl_EdaCvFJzKgcXoHmfvJUVdFrJtQfi",
    alias: "pyor-website-test",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
  // clean-up
  const { error: delErr } = await deleteAlias({ id: data?.uid || "" });
  if (delErr) {
    console.warn(
      "The alias created in the test could not be deleted. Make sure you delete this manually."
    );
    console.warn(`Alias info: ${JSON.stringify(data)}`);
  }
});

test("delete alias", async () => {
  const { data, error: createError } = await assignAlias({
    id: "dpl_EdaCvFJzKgcXoHmfvJUVdFrJtQfi",
    alias: "pyor-website-test",
  });
  if (createError) throw createError;
  const { response, error } = await deleteAlias({
    id: data?.uid || "",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});
