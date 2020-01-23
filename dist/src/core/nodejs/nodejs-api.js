"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../file-utils"));
const folder_utils_1 = __importDefault(require("../folder-utils"));
class NodeJSApi {
    static initializeFiles(apis) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder('api');
        // Create a route file for every api
        for (const api of apis) {
            file_utils_1.default.createFromTemplate('api/api.ts', `api/${api.endpoint}.ts`, {
                api,
                getMethodString: this.getMethodString,
            });
        }
        // Create the index.ts in api
        NodeJSApi.createRoutingIndex(apis);
    }
    static getMethodString(method, model) {
        const modelName = model.name[0].toUpperCase() + model.name.slice(1);
        switch (method) {
            case 'get':
                return `const result = await ${modelName}.findAll();`;
            case 'post':
                return `const result = await ${modelName}.create(req.body);`;
            case 'put':
                return `const result = await ${modelName}.update(req.body,{where: {id: body.id}});`;
            case 'delete':
                return `const result = await ${modelName}.destroy({where: {id: body.id}});`;
        }
    }
    static createRoutingIndex(apis) {
        file_utils_1.default.createFromTemplate('api/index.ts', 'api/index.ts', {
            apis,
        });
    }
}
exports.default = NodeJSApi;
//# sourceMappingURL=nodejs-api.js.map