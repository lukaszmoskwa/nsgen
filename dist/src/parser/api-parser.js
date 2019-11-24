"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_utils_1 = __importDefault(require("../core/file-utils"));
const folder_utils_1 = __importDefault(require("../core/folder-utils"));
class ApiParser {
    static parse(apis) {
        global.configuration.api = apis;
        ApiParser.initializeFiles(apis);
    }
    static typeMap(configObject) {
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
    static getMethodString(method, model) {
        const modelName = model.name[0].toUpperCase() + model.name.slice(1);
        switch (method) {
            case 'get':
                return `const result = await ${modelName}.findAll();\n`;
            case 'post':
                return `const result = await ${modelName}.create(req.body);\n`;
            case 'put':
                return `const result = await ${modelName}.update(req.body,{where: {id: body.id}});\n`;
            case 'delete':
                return `const result = await ${modelName}.destroy({where: {id: body.id}});\n`;
        }
    }
    static createRoutingIndex(apis) {
        file_utils_1.default.createFile('api/index.ts', function () {
            this.write(`import { Router } from 'express';\n`);
            for (const api of apis) {
                const apiName = api.endpoint[0].toUpperCase() + api.endpoint.slice(1);
                this.write(`import ${apiName}Router from './${apiName.toLowerCase()}';\n`);
            }
            this.write('\nconst router = Router();\n');
            for (const api of apis) {
                const apiName = api.endpoint[0].toUpperCase() + api.endpoint.slice(1);
                this.write(`router.use('/${apiName.toLowerCase()}', ${apiName}Router);\n`);
            }
            this.write(`\nexport default router;`);
            this.end();
        });
    }
    static initializeFiles(apis) {
        // Create the 'config' folder
        folder_utils_1.default.createFolder('api');
        // Create a route file for every api
        for (const api of apis) {
            file_utils_1.default.createFile(`api/${api.endpoint}.ts`, function () {
                this.write(`import { Request, Response, Router, Express } from 'express';\n`);
                this.write(`const seq = require('../sequelize');\n`);
                if (api.model) {
                    const modelName = api.model.name[0].toUpperCase() + api.model.name.slice(1);
                    this.write(`const ${modelName} = seq.default.${modelName};\n`);
                }
                this.write('const router = Router();\n\n');
                for (const method of api.methods) {
                    this.write(`router.${method.type}('/', async (req: Request, res: Response) => {\n`);
                    if (api.model) {
                        this.write(`
        try {
            const body = req.body;
            ${ApiParser.getMethodString(method.type, api.model)}
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: err,
            });
        }\n`);
                    }
                    else {
                        this.write('\n\t// Write here your code\n\n');
                        this.write('\n\treturn res.status(200).json({message: "http-Method not yet implemented"});\n\n');
                    }
                    this.write('});\n\n');
                }
                this.write('export default router;');
                this.end();
            });
        }
        // Create the index.ts in api
        ApiParser.createRoutingIndex(apis);
    }
}
exports.default = ApiParser;
//# sourceMappingURL=api-parser.js.map