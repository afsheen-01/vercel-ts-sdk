import { beforeEach, test } from "@jest/globals";
import { setVercelToken, getUserTokens } from "../src/index";

beforeEach(() => {
  setVercelToken(process.env.VERCEL_TOKEN as string);
});

test("authorization demo", async () => {
  const { data, error } = await getUserTokens({
    limit: 10,
    // next: 10,
  });
  console.log(data);
  console.log({ error });
});
