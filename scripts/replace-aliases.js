#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const root = path.resolve(__dirname, "..");
const publicSrc = path.join(root, "public", "src");
const shared = path.join(root, "shared");

function replaceInFile(file) {
  let code = fs.readFileSync(file, "utf8");
  const dir = path.dirname(file);
  let changed = false;

  // @/ -> public/src
  code = code.replace(/from\s+(["'])@\/(.*?)\1/g, (m, q, p) => {
    const target = path.join(publicSrc, p);
    let rel = path.relative(dir, target);
    if (!rel.startsWith(".")) rel = "./" + rel;
    rel = rel.replace(/\\/g, "/");
    changed = true;
    return `from ${q}${rel}${q}`;
  });

  // @shared/ -> shared
  code = code.replace(/from\s+(["'])@shared\/(.*?)\1/g, (m, q, p) => {
    const target = path.join(shared, p);
    let rel = path.relative(dir, target);
    if (!rel.startsWith(".")) rel = "./" + rel;
    rel = rel.replace(/\\/g, "/");
    changed = true;
    return `from ${q}${rel}${q}`;
  });

  if (changed) {
    fs.writeFileSync(file, code, "utf8");
    console.log("Updated", path.relative(root, file));
  }
}

function run() {
  const patterns = [
    "public/src/**/*.{ts,tsx,js,jsx}",
    "server/**/*.ts",
    "shared/**/*.ts",
  ];
  patterns.forEach((p) => {
    const files = glob.sync(p, { cwd: root, absolute: true, nodir: true });
    files.forEach(replaceInFile);
  });
}

run();
console.log("Done");
