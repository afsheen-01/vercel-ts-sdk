import { beforeAll, test, expect } from "@jest/globals";
import { endpointMap } from "../src/utils/common";
import {
  createNewCheck,
  getCheck,
  reRequestCheck,
  listChecks,
  updateCheck,
  setVercelToken,
} from "../src/index";

beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));

test("create new check", async () => {
  const { data, error } = await createNewCheck({
    deploymentId: "dep1",
    teamId: "team1",
    name: "check-name",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("post");
  expect(data?.url).toContain(endpointMap.createNewCheck("dep1"));
  expect(data?.query).toEqual({ teamId: "team1" });
});

test("get check details", async () => {
  const { data, error } = await getCheck({
    deploymentId: "dep1",
    teamId: "team1",
    checkId: "check1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("get");
  expect(data?.url).toContain(
    endpointMap.getCheck({ deploymentId: "dep1", checkId: "check1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
});

test("rerequest check", async () => {
  const { data, error } = await reRequestCheck({
    deploymentId: "dep1",
    teamId: "team1",
    checkId: "check1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("post");
  expect(data?.url).toContain(
    endpointMap.reRequestCheck({ deploymentId: "dep1", checkId: "check1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
});

test("list all checks", async () => {
  const { data, error } = await listChecks({
    deploymentId: "dep1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("get");
  expect(data?.url).toContain(endpointMap.listChecks("dep1"));
  expect(data?.query).toEqual({ teamId: "team1" });
});

test("update a check", async () => {
  const { data, error } = await updateCheck({
    deploymentId: "dep1",
    checkId: "check1",
    teamId: "team1",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("patch");
  expect(data?.url).toContain(
    endpointMap.updateCheck({ deploymentId: "dep1", checkId: "check1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
});

test("update a check with body params", async () => {
  const { data, error } = await updateCheck({
    deploymentId: "dep1",
    checkId: "check1",
    teamId: "team1",
    conclusion: "succeeded",
  });
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.method).toEqual("patch");
  expect(data?.url).toContain(
    endpointMap.updateCheck({ deploymentId: "dep1", checkId: "check1" })
  );
  expect(data?.query).toEqual({ teamId: "team1" });
  expect(data?.body).toEqual(JSON.stringify({ conclusion: "succeeded" }));
});
