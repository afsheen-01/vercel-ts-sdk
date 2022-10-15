import { Response } from "node-fetch";
import { CustomError } from "../src/utils/fetch";

const hasToken = (authorization) => {
  if (!authorization) return false;
  // strip 'Bearer '
  const token = authorization.replace("Bearer ", "").trim();
  if (token.length) return true;
  return false;
};

export default async (url, options) => {
  if (!hasToken(options?.headers?.Authorization))
    throw new CustomError({ message: "No token" });
  return new Response(JSON.stringify({ url, options }));
};
