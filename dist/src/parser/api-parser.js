"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodejs_api_1 = __importDefault(require("../core/nodejs/nodejs-api"));
const parser_1 = __importDefault(require("./parser"));
class ApiParser extends parser_1.default {
    constructor() {
        super(...arguments);
        this.parserType = 'api';
    }
    parse(apis) {
        global.configuration.api = apis;
        nodejs_api_1.default.initializeFiles(apis);
    }
    typeMap(configObject) {
        const finalApis = [];
        const apiNames = Object.keys(configObject);
        for (const endpoint of apiNames) {
            const methods = [];
            if (configObject[endpoint].crud) {
                methods.push({ type: 'get' }, { type: 'post' }, { type: 'put' }, { type: 'delete' });
            }
            else {
                for (const methodName of Object.keys(configObject[endpoint])) {
                    if (['get', 'post', 'put', 'delete'].includes(methodName)) {
                        methods.push({
                            type: methodName,
                        });
                    }
                }
            }
            const model = global.configuration.model.find((el) => el.name === configObject[endpoint].model) || null;
            const api = {
                endpoint,
                methods,
                model,
            };
            finalApis.push(api);
        }
        return finalApis;
    }
    validate(configObject) {
        return true;
    }
}
exports.default = ApiParser;
//# sourceMappingURL=api-parser.js.map