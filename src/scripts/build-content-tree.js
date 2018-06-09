#!/usr/bin/env node
// ./build-content-tree source output
// ./build-content-tree "./src/content" ".src/_content.json"

const directoryTree = require('directory-tree');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Import Utils
const { restructure } = require('../utilities/content-tree-enhancers.js');

if (require.main === module) {
  main();
} else {
  module.exports = buildContentTeee;
}

function main() {
  const source = process.argv[2];
  const output = process.argv[3];
  buildContentTeee(source, output)
}

function buildContentTeee(source, output) {
  if(!source) {
    return console.error('build-content-tree: you must provide a source path');
  }
  if(!output) {
    return console.error('build-content-tree: you must provide a output file name');
  }

  let content = directoryTree(source, { extensions: /\.md/ });

  content = restructure(content, {
    dir: source
  });

  fs.writeFileSync(path.resolve(output), JSON.stringify(content, 2), (err) => {
    if (err) {
      console.log('scripts/build-content-tree', error);
    } else {
      console.log('Successfully built content tree file at ' + output);
    }
  });
}
