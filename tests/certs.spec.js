import { beforeAll, expect, test } from "@jest/globals";
import { setVercelToken } from "../src";
import { getCert, issueNewCert } from "../src/certs";
import { BASE_URL, config, endpointMap } from "../src/common";

beforeEach(() => setVercelToken(process.env.VERCEL_TOKEN || ""));

test("get a cert", async () => {
  const { data, error } = await getCert({ id: "cert1", teamId: "team1" });
  expect(error).toBe(null);
  expect(data?.url).toBe(`${BASE_URL}/v7/certs/cert1?teamId=team1`);
  console.log(data.options);
  expect(data?.options?.method).toBe("get");
});

test.only("issue new cert", async () => {
  const { data, error } = await issueNewCert({
    teamId: "1",
    cns: ["10", "11"],
  });
  expect(error).toBe(null);
  console.log(typeof data?.options?.body);
});
