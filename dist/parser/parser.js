"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const utils_1 = require("../utils");
const config_parser_1 = __importDefault(require("./config-parser"));
const model_parser_1 = __importDefault(require("./model-parser"));
class Parser {
    constructor(configObject) {
        this.configObject = configObject;
        this.initializeFiles(configObject.config);
        const parsersObject = this.getParsers();
        for (const param of Object.keys(parsersObject)) {
            this.configObject[param] = parsersObject[param].typeMap(this.configObject[param]);
            parsersObject[param].parse(this.configObject[param]);
        }
        /*const parsersObject = this.getParsers();
        this.configObject.model = parsersObject.model.typeMap(
          this.configObject.model,
        );
        console.log(JSON.stringify(this.configObject.model));
        parsersObject.model.parse(this.configObject.model);*/
    }
    getParsers() {
        return {
            config: config_parser_1.default,
            model: model_parser_1.default,
        };
    }
    initializeFiles(config) {
        // Create the package.json
        this.createPackageJSON(config);
        // Create the .gitignore
        this.createGitIgnore();
        // Create the README.md
        this.createREADME();
    }
    /**
     * Creates the package.json file starting from the given configuration
     * @param config configuration elements to create the package.json content
     */
    createPackageJSON(config) {
        const packageObject = {
            dependencies: utils_1.packageDepencencies,
            description: config.description || '',
            name: config.name || '',
            version: '1.0.0',
        };
        file_utils_1.default.createJSONFile('package.json', packageObject);
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
exports.default = Parser;
//# sourceMappingURL=parser.js.map