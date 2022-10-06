import { beforeAll, beforeEach, expect, test } from "@jest/globals";
import { getDeploymentsList } from "../src/deployments";
import {
  listAliases,
  setVercelToken,
  assignAlias,
  deleteAlias,
  getAlias,
  listDeploymentAliases,
} from "../src";
import { WrapperError } from "../src/utils/fetch";
import { DeploymentList } from "../src/types/deployment";

let dplList: DeploymentList | null = null,
  dplError: WrapperError | null = null;

beforeAll(async () => {
  // set vercel token for tests
  setVercelToken(process.env.VERCEL_TOKEN as string);

  // get and set deployment ID
  const { data, error } = await getDeploymentsList();
  dplList = data;
  dplError = error;
});

beforeEach(() => {});

const checkForData = ({
  data,
  error,
  key,
  callback,
}: {
  data: { [key: string]: any } | null;
  error: WrapperError | null;
  key: string;
  callback: Function;
}): void => {
  if (error) {
    console.log("hit an error in dependency");
    console.log(error);
    return;
  }
  if (data && data[key]?.length === 0) {
    console.log("no data found to run the tests on");
    return;
  }
  return callback();
};

test("list all aliases", async () => {
  const { error, response } = await listAliases();
  if (error) console.log(error);
  expect(error).toBe(null);
  expect(response?.status).toBe(200);
});

test("list all deployment aliases", async () => {
  const { data, error: deploymentListError } = await getDeploymentsList();
  return checkForData({
    data,
    error: deploymentListError,
    key: "deployments",
    callback: async () => {
      const id = data?.deployments[0]?.uid || "";
      const { error, response } = await listDeploymentAliases({
        id,
      });
      if (error) console.log(error);
      expect(error).toBe(null);
      expect(response?.status).toBe(200);
    },
  });
});

test("get alias", async () => {
  const { data, error: listAliasError } = await listAliases();
  return checkForData({
    data,
    error: listAliasError,
    key: "aliases",
    callback: async () => {
      const { response, error } = await getAlias({
        id: data?.aliases[0]?.uid || "",
      });
      if (error) console.log(error);
      expect(error).toBe(null);
      expect(response?.status).toBe(200);
    },
  });
});

test("assign alias", async () => {
  return checkForData({
    data: dplList,
    error: dplError,
    key: "deployments",
    callback: async () => {
      const {
        data: alias,
        response,
        error,
      } = await assignAlias({
        id: dplList?.deployments[0]?.uid || "",
        alias: "vercelsdktest1",
      });
      if (error) console.log(error);
      expect(error).toBe(null);
      expect(response?.status).toBe(200);
      // clean-up
      const { error: delErr } = await deleteAlias({ id: alias?.uid || "" });
      if (delErr) {
        console.warn(
          "The alias created in the test could not be deleted. Make sure you delete this manually."
        );
        console.warn(`Alias info: ${JSON.stringify(alias)}`);
      }
    },
  });
});

test("delete alias", async () => {
  return checkForData({
    data: dplList,
    error: dplError,
    key: "deployments",
    callback: async () => {
      const { data, error: createError } = await assignAlias({
        id: dplList?.deployments[0]?.uid || "",
        alias: "vercelsdktest2",
      });
      if (createError) throw createError;
      const { response, error } = await deleteAlias({
        id: data?.uid || "",
      });
      if (error) console.log(error);
      expect(error).toBe(null);
      expect(response?.status).toBe(200);
    },
  });
});
