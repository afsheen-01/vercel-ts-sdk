import { Response } from "node-fetch";
import { CustomError } from "../src/utils/fetch";

export default (url: string, options: any) => {
  if (!options.headers?.Authorization) {
    const errResponse = new CustomError({
      message: "No authorization token in headers",
    });
    return { data: null, error: errResponse, response: errResponse };
  }
  const _url = new URL(url);
  const query = Object.fromEntries(_url.searchParams);
  const { body, method } = options;
  return new Response(JSON.stringify({ url, query, body, method }));
};
