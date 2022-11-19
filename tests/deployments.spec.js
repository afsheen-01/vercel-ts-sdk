import { beforeAll, expect, test } from "@jest/globals";
import { listDeploymentFiles, listDeployments } from "../src/deployments";
import { setVercelToken } from "../src";
import { endpointMap } from "../src/utils/common";

beforeAll(() => {
  setVercelToken(process.env?.VERCEL_TOKEN);
});

test("list deployments", async () => {
  const { data, error } = await listDeployments({
    state: "READY",
    since: 89897787234,
  });

  if (error) console.log(error);
  expect(error).toBe(null);
  expect(data?.url).toContain(endpointMap.listDeployments);
  expect(data?.query).toEqual({ state: "READY", since: "89897787234" });
});
