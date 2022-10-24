import { beforeAll, expect, test } from "@jest/globals";
import { listDeploymentFiles, listDeployments } from "../src/deployments";
import { setVercelToken } from "../src";

beforeAll(() => {
  setVercelToken(process.env?.VERCEL_TOKEN as string);
});

test("dummy", async () => {
  expect(true).toBeTruthy();
});
