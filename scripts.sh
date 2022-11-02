#! /usr/bin/env node

/**
 * usages:
 * ./scripts.sh --help: show help
 * ./scripts.sh --api <file_name>  => create resources starter
 *  eg. ./scripts.sh --api projects
 *  will create src/projects.ts and src/types/projects.ts
 *
 */

const { argv } = process;
const fs = require("fs");

const main = async () => {
  const [command, ...args] = argv.slice(2);
  switch (command) {
    case "--api":
      let fileName = args[0];
      if (!fileName) {
        console.log(
          "Need a filename to create api resource starterpack. Try --help."
        );
        break;
      }
      await createResourceFiles(fileName);
      console.log(
        `Created resource files at ./src/${fileName}.ts, ./src/types/${fileName}.ts and ./tests/${fileName}.spec.ts.`
      );
      break;
    case "--generate-index":
      try {
        await generateIndexFile();
        console.log("Index generated.");
      } catch (e) {
        console.log(e);
      }
      break;
    case "--help":
      showHelp();
      break;
    default:
      console.log("Invalid command or arguments. Try --help.");
  }
};

const createResourceFiles = async (fileName) => {
  fs.writeFileSync(`./src/${fileName}.ts`, "");
  fs.writeFileSync(`./src/types/${fileName}.ts`, "");
  fs.writeFileSync(`./tests/${fileName}.spec.ts`, "");
  return true;
};

const generateIndexFile = async () => {
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
  return true;
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
./scripts.sh --api fileName -> create ./src/fileName.ts and ./src/types/fileName.ts to help you get started with writing a resource.\n \
./scripts.sh --generate-index -> generate an index.ts file in ./src based on the exports in resource files.";
  console.log(helpText);
};

main();
