"use strict";
require('shelljs/global');

const shell      = require('shelljs'),
      path       = require('path'),
      fs         = require('fs'),
      releaseDir = './release',
      sourceDir  = './src',
      file       = filename => {
          return path.resolve(sourceDir, filename)
      };
var sourcePdf  = './node_modules/pdfjs-dist';
var sourcePdfWeb = './node_modules/pdf.js';
var requireJs = './node_modules/requireJs';
if(shell.exec(`if [ -d "./node_modules" ]; then
 echo exists
fi`).stdout.length === 0) {
    sourcePdf = "../pdfjs-dist";
    sourcePdfWeb= "../pdf.js";
    requireJs = '../requirejs';
};

shell.mkdir("release");
shell.cp("-R", path.resolve(sourcePdf), releaseDir);
shell.cp("-R", path.resolve(sourcePdfWeb, "web"), releaseDir);
shell.cp("-R", path.resolve(sourcePdfWeb, "external"), releaseDir);
shell.cp("-R", path.resolve(sourcePdfWeb, "src"), releaseDir);
shell.cp("-R", path.resolve(sourceDir, "viewer.html"), path.resolve(releaseDir, "web"));
shell.cp("-R", path.resolve(sourceDir, "loader.css"), path.resolve(releaseDir, "web"));

shell.mkdir(path.resolve(releaseDir, "node_modules"));
shell.cp("-R", requireJs, path.resolve(releaseDir, "node_modules"));

console.info('Build Ok');
