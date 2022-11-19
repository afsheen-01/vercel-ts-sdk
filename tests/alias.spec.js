import { beforeAll, expect, test } from "@jest/globals";
import {
  listAliases,
  setVercelToken,
  assignAlias,
  getAlias,
  listDeploymentAliases,
  deleteAlias,
} from "../src";
import { endpointMap, BASE_URL } from "../src/utils/common";

beforeAll(async () => {
  // set vercel token for tests
  setVercelToken(process.env.VERCEL_TOKEN);
});

test("list all aliases", async () => {
  const { error, data } = await listAliases();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.listAliases);
});

test("list all deployment aliases", async () => {
  const { error, data } = await listDeploymentAliases({
    deploymentId: "1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.listDeploymentAliases("1"));
});

test("list all deployment aliases (with teamId)", async () => {
  const { error, data } = await listDeploymentAliases({
    deploymentId: "1",
    teamId: "team-1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(
    BASE_URL + endpointMap.listDeploymentAliases("1") + "?teamId=team-1"
  );
  expect(data?.query?.teamId).toBe("team-1");
});

test("get alias", async () => {
  const { data, error } = await getAlias({
    aliasId: "alias1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.getAlias("alias1"));
});

test("assign alias", async () => {
  const { data, error } = await assignAlias({
    aliasId: "alias1",
    alias: "vercelsdktest1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(BASE_URL + endpointMap.assignAlias("alias1"));
  expect(data?.body).toEqual(JSON.stringify({ alias: "vercelsdktest1" }));
});

test("delete alias", async () => {
  const { data, error } = await deleteAlias({
    aliasId: "alias-1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toBe(BASE_URL + endpointMap.deleteAlias("alias-1"));
});
