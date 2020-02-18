"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const utils_1 = require("../utils");
const api_parser_1 = __importDefault(require("./api-parser"));
const config_parser_1 = __importDefault(require("./config-parser"));
const model_parser_1 = __importDefault(require("./model-parser"));
class MainParser {
    constructor(configObject) {
        this.configObject = configObject;
        this.parsers = [];
        this.parsers = [new config_parser_1.default(), new model_parser_1.default(), new api_parser_1.default()];
    }
    startParsing() {
        for (const p of this.parsers) {
            this.configObject[p.parserType] = p.typeMap(this.configObject[p.parserType]);
            p.parse(this.configObject[p.parserType]);
        }
        this.initializeFiles(this.configObject.config);
    }
    validateConfiguration() {
        for (const parser of this.parsers) {
            parser.validate(this.configObject);
        }
    }
    initializeFiles(config) {
        // Create the package.json
        this.createPackageJSON(config);
        // Create the .gitignore
        this.createGitIgnore();
        // Create the README.md
        this.createREADME();
        // Create the main index.ts
        this.createIndex();
    }
    /**
     * Creates the package.json file starting from the given configuration
     * @param config configuration elements to create the package.json content
     */
    createPackageJSON(config) {
        const packageObject = {
            dependencies: utils_1.packageDependencies,
            description: config.description || '',
            name: config.name || '',
            version: '1.0.0',
        };
        file_utils_1.default.createJSONFile('package.json', packageObject);
    }
    createIndex() {
        file_utils_1.default.createFile('index.ts', function () {
            this.write(`import express from 'express';\n`);
            this.write(`import BaseRouter from './api';\n\n`);
            this.write(`import config from './config';\n\n`);
            this.write(`const app = express();\n\n`);
            this.write(`app.use(express.json());\n\n`);
            this.write(`app.use('/api', BaseRouter);\n\n`);
            this.write(`const port = 3000;
      app.listen(port, () => {
          console.log('Express server started on port: ' + port);
      });`);
            this.end();
        });
    }
    /**
     * Creates a basic .gitignore file for the new project
     */
    createGitIgnore() {
        file_utils_1.default.createFile('.gitignore', function () {
            for (const ignore of utils_1.gitignoreList) {
                this.write(`${ignore}\n`);
            }
            this.end();
        });
    }
    /**
     * Creates the README of the new project
     */
    createREADME() {
        file_utils_1.default.createFile('README.md', function () {
            this.write('TODO');
            this.end();
        });
    }
}
exports.default = MainParser;
//# sourceMappingURL=main-parser.js.map