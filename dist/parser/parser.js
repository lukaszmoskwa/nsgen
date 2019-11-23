"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_parser_1 = __importDefault(require("./config-parser"));
class Parser {
    constructor(configObject, outDir) {
        // chiamare chi crea package.json
        // chiamare chi crea .eslintrc
        // chiamare chi crea .gitignore
        // chiamare chi crea README.md
        this.configObject = configObject;
        this.outDir = outDir;
        const parsersObject = this.getParsers();
        for (const param of Object.keys(parsersObject)) {
            parsersObject[param].parse(this.configObject[param], this.outDir);
        }
        console.log('chiamatooo');
    }
    getParsers() {
        return {
            config: config_parser_1.default,
        };
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map