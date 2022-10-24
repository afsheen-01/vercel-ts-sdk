import { Response } from "node-fetch";
import Zod from "zod";
import { CustomError, FetchResponse, WrapperError } from "./fetch";

export const validateSchema = ({
  schema,
  data,
}: {
  schema: Zod.ZodSchema;
  data: any;
}): { error?: string; data?: any } => {
  try {
    return { data: schema.parse(data) };
  } catch (e: any) {
    if (e instanceof Zod.ZodError) {
      const errors = e.errors
        .map((err) => {
          return `${err.message} at '${joinPath(err.path)}'`;
        })
        .join("\n");
      return { error: errors };
    } else {
      return { error: e.toString() };
    }
  }
};

export const returnValidationError = (
  errorMsg: string
): FetchResponse<null> => {
  const errorObject = new CustomError({ message: errorMsg });
  return {
    data: null,
    error: errorObject,
    response: new Response(JSON.stringify(errorObject)),
  };
};

const joinPath = (path: (string | number)[]) => {
  return path.reduce((acc, curr, index) => {
    if (typeof curr === "number") {
      return acc + `[${curr}]`;
    }
    return acc + (index === 0 ? "" : ".") + curr;
  }, "");
};
