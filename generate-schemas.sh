#!/usr/bin/env node

const { execSync } = require("child_process");

const files = ["alias", "authorization", "deployment", "user", "certs"];

const main = () => {
  files.forEach((fname) => {
    const filePath = `./src/types/${fname}.ts`;
    const targetPath = `./src/schema/${fname}.ts`;
    try {
      execSync(`yarn ts-to-zod ${filePath} ${targetPath} --skipValidation`);
    } catch (e) {
      console.log(`Error generating schema for ${fname} resource`);
      console.log(e.toString());
    }
  });
};

main();
