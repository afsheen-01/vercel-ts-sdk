import { beforeEach, expect, test } from "@jest/globals";
import { constructPaginationString } from "../src/utils/pagination";
import { getDeploymentsList } from "../src/deployments";
import { setVercelToken } from "../src";

beforeEach(() => {
  setVercelToken(process.env?.VERCEL_TOKEN as string);
});

test("calling just the get deployment endpoint", async () => {
  const { response, error } = await getDeploymentsList();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});
