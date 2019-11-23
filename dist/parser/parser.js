"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const utils_1 = require("../utils");
const config_parser_1 = __importDefault(require("./config-parser"));
class Parser {
    constructor(configObject) {
        this.configObject = configObject;
        // chiamare chi crea package.json
        this.createPackageJSON(configObject.config);
        // chiamare chi crea .gitignore
        this.createGitIgnore();
        // chiamare chi crea README.md
        this.createREADME();
        const parsersObject = this.getParsers();
        for (const param of Object.keys(parsersObject)) {
            parsersObject[param].parse(this.configObject[param]);
        }
    }
    getParsers() {
        return {
            config: config_parser_1.default,
        };
    }
    createPackageJSON(config) {
        const packageObject = {
            dependencies: utils_1.packageDepencencies,
            description: config.description || '',
            name: config.name || '',
            version: '1.0.0',
        };
        file_utils_1.default.createJSONFile('package.json', packageObject);
    }
    createGitIgnore() {
        file_utils_1.default.createFile('.gitignore', function () {
            for (const ignore of utils_1.gitignoreList) {
                this.write(`${ignore}\n`);
            }
            this.end();
        });
    }
    createREADME() {
        file_utils_1.default.createFile('README.md', function () {
            this.write('TODO');
            this.end();
        });
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map