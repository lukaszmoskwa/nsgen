"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_parser_1 = __importDefault(require("../../src/parser/config-parser"));
const utils_1 = require("../../src/utils");
describe('Config Parser - Throw exception tests', () => {
    const configTest = new config_parser_1.default();
    test('missing config', () => {
        const configObject = {};
        configObject.model = {};
        expect(() => {
            configTest.validate(configObject);
        }).toThrowError(utils_1.ConfigParserErrors.NO_CONFIG);
    });
    test('missing name', () => {
        const configObject = {};
        configObject.config = {};
        expect(() => {
            configTest.validate(configObject);
        }).toThrowError(utils_1.ConfigParserErrors.NO_NAME);
    });
    test('missing db configuration', () => {
        const configObject = {};
        configObject.config = { name: 'test' };
        expect(() => {
            configTest.validate(configObject);
        }).toThrowError(utils_1.ConfigParserErrors.NO_DB_CONFIG);
    });
    test('missing db dialect', () => {
        const configObject = {};
        configObject.config = { name: 'test', db: { name: 'db_test' } };
        expect(() => {
            configTest.validate(configObject);
        }).toThrowError(utils_1.ConfigParserErrors.NO_DIALECT);
    });
    test('wrong db dialect', () => {
        const configObject = {};
        configObject.config = {
            db: { name: 'db_test', type: 'randomSQL' },
            name: 'test',
        };
        expect(() => {
            configTest.validate(configObject);
        }).toThrowError(utils_1.ConfigParserErrors.NOT_SUPPORTED_DIALECT);
    });
});
//# sourceMappingURL=config-parser.test.js.map