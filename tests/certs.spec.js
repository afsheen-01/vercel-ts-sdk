import { beforeAll, expect, test } from "@jest/globals";
import {
  getCert,
  issueNewCert,
  removeCert,
  setVercelToken,
  uploadCert,
} from "../src";
import { endpointMap } from "../src/common";

beforeAll(() => {
  setVercelToken(process?.env?.VERCEL_TOKEN);
});

test("upload a cert", async () => {
  const body = {
    ca: "certca",
    cert: "cert1",
    key: "key1",
    skipValidation: false,
  };
  const { data, error } = await uploadCert({ teamId: "team1", ...body });
  if (error) console.log(error);
  expect(data?.url).toContain(endpointMap.uploadCert);
  expect(data?.body).toEqual(JSON.stringify(body));
});

test("get a cert", async () => {
  const { data, error } = await getCert({ teamId: "team1", certId: "cert1" });
  if (error) console.log(error);
  expect(data?.url).toContain(endpointMap.getCert("cert1"));
});

test("remove a cert", async () => {
  const { data, error } = await removeCert({
    teamId: "team1",
    certId: "cert1",
  });
  if (error) console.log(error);
  expect(data?.url).toContain(endpointMap.deleteCert("cert1"));
});

test("issue a new cert", async () => {
  const { data, error } = await issueNewCert({
    teamId: "team1",
    cns: ["cert1"],
  });
  if (error) console.log(error);
  expect(data?.url).toContain(endpointMap.issueCert);
  expect(data?.body).toContain(
    JSON.stringify({
      cns: ["cert1"],
    })
  );
});
