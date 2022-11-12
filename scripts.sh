#! /usr/bin/env node

const { argv } = process;
const fs = require("fs");
const generateTests = require("./tests/generate");

const main = async () => {
  const [command, ...args] = argv.slice(2);
  switch (command) {
    case "--api":
      let fileName = args[0];
      const { error: apiError } = await createResourceFiles(fileName);
      if (apiError) {
        console.log(apiError);
        break;
      }
      console.log("Generated the resources.");
      break;
    case "--generate-index":
      const { error: indexError } = await generateIndexFile();
      if (indexError) {
        console.log(indexError);
        break;
      }
      console.log("Index generated.");
      break;
    case "--generate-test":
      const [_, output] = args;
      const { data: testsData, error: testsError } = await generateTests(args);
      if (testsError) {
        console.log(testsError);
        break;
      }
      if (output) {
        fs.writeFileSync(`./tests/${output}`, testsData, "utf-8");
        console.log(`Tests generated. Check ./tests/${output}`);
        break;
      }
      if (testsData) console.log(testsData);
      break;
    case "--help":
      showHelp();
      break;
    default:
      console.log("Invalid command or arguments. Try --help.");
  }
};

const createResourceFiles = async (fileName) => {
  try {
    if (!fileName)
      throw new Error(
        "Need a filename to create api resource starterpack. Try --help."
      );
    fs.writeFileSync(`./src/${fileName}.ts`, "");
    fs.writeFileSync(`./src/types/${fileName}.ts`, "");
    fs.writeFileSync(`./tests/defs/${fileName}.yml`, "");
    return {};
  } catch (e) {
    return { error: e.toString() };
  }
};

const generateIndexFile = async () => {
  try {
    const exclude = "index.ts";
    const filesInSrcDir = fs.readdirSync("./src");
    const resourceFiles = filesInSrcDir.filter(
      (file) => file.includes(".ts") && file !== exclude
    );
    const contents = resourceFiles
      .map(generateExportString)
      .filter((str) => !!str.length);
    const finalContents = appendToIndex().concat(contents);
    fs.writeFileSync("./src/index.ts", finalContents.join("\n"));
    return {};
  } catch (e) {
    return { error: e.toString() };
  }
};

const generateExportString = (fileName) => {
  const contents = fs.readFileSync(`./src/${fileName}`, "utf-8");
  const lines = contents
    .split("\n")
    .filter((line) => !!line.length && line.startsWith("export const"));
  if (!lines.length) return "";
  const funcs = lines.map((l) => {
    let start = l.indexOf("export const ");
    let end = l.indexOf(" =");
    return l.substring(start + "export const ".length, end);
  });
  return `export { ${funcs.join(", ")} } from "./${stripExtn(fileName)}"`;
};

const stripExtn = (nameWithExtn) => {
  return nameWithExtn.substring(0, nameWithExtn.lastIndexOf("."));
};

const appendToIndex = () => {
  return [`export { setVercelToken } from "./utils/common";`];
};

const showHelp = () => {
  const helpText =
    "Usage:\n \
./scripts.sh --help -> show this help.\n \
./scripts.sh --api fileName -> create ./src/fileName.ts, ./src/types/fileName.ts and ./tests/defs/fileName.yml to help you get started with writing a resource.\n \
./scripts.sh --generate-index -> generate an index.ts file in ./src based on the exports in resource files.\n \
./scripts.sh --generate-test input.yml [output.spec.ts] -> generate test file for one single file defined in ./tests/defs/input.yml. If 'output' is provided, file be written to ./tests/output.spec.ts. Otherwise, output is streamed to stdout.\n \
";
  console.log(helpText);
};

main();
