import { beforeAll, expect, test } from "@jest/globals";
import { listDeploymentFiles, listDeployments } from "../src/deployments";
import { setVercelToken } from "../src";

beforeAll(() => {
  setVercelToken(process.env?.VERCEL_TOKEN as string);
});

test("dummy", async () => {
  expect(true).toBeTruthy();
});

test("calling get deployment endoint (with params)", async () => {
  const { response, error } = await listDeployments();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

//we'll have to mock something like this
// test.only("get deployment files(without params)", async () => {
//   const { response, error } = await listDeploymentFiles({
//     deploymentId: "6a03f61",
//   });
//   if (error) console.log(error);
//   expect(error).toBe(null);
//   expect(response?.status).toBe(200);
// });
