const fs = require("fs");
const y2j = require("js-yaml");

const main = async (options) => {
  try {
    const [input, output] = options;
    if (!input) throw new Error("Needs a filename to work.");
    const contents = fs.readFileSync(`./tests/defs/${input}`, "utf-8");
    const result = await generateTestFile(contents);
    return { data: result };
  } catch (e) {
    return { error: e.toString() };
  }
};

// ---

const generateTestFile = async (yamlString) => {
  try {
    const { tests } = await y2j.load(yamlString);
    const contents = tests.map(generateTest).join("\n\n");
    return testHeaders(tests.map((test) => test.call)) + "\n\n" + contents;
  } catch (e) {
    console.log(e.toString());
    process.exit(1);
  }
};

const testHeaders = (testFuncNames) =>
  [
    `import {beforeAll, test, expect} from '@jest/globals'`,
    `import { endpointMap } from '../src/utils/common'`,
    `import {${uniq(testFuncNames).join(
      ", "
    )}, setVercelToken} from '../src/index'`,
    "",
    `beforeAll(() => setVercelToken(process.env.VERCEL_TOKEN));`,
  ].join("\n");

const generateTest = (test) => {
  return [
    `test("${test.name}", async () => {`,
    `\tconst { data, error } = await ${fn(test)}`,
    `\tif (error) console.log(error)`,
    `\texpect(error).toBe(null)`,
    `\t${test.expect.map(generateExpect).join("\n\t")}`,
    `})`,
  ].join("\n");
};

const generateExpect = (expect) => {
  const value =
    expect.var === "method"
      ? `"${expect.value}"`
      : expect.var === "body"
      ? `JSON.stringify(${expect.value})`
      : expect.value;
  return [`expect(data?.${expect.var}).${expect.rule || "toEqual"}(${value})`];
};

const fn = (test) => {
  if (test.call && !test.with) return `${test.call}()`;
  if (test.call && test.with) return `${test.call}(${test.with})`;
};

// -- helpers

const uniq = (list) => {
  return Array.from(new Set(list));
};

module.exports = main;
