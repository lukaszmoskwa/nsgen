"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_parser_1 = __importDefault(require("../../src/parser/model-parser"));
const utils_1 = require("../../src/utils");
describe('Model Configuration - Correct configurations', () => {
    const modelTest = new model_parser_1.default();
    test('test 1', () => {
        const configObject = {
            model: {
                tables: {
                    user: {
                        password: {
                            type: 'string',
                        },
                        username: 'string',
                    },
                },
            },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).not.toThrow();
    });
    test('test 2 - associations', () => {
        const configObject = {
            model: {
                associations: {
                    article: {
                        '1->n': ['user'],
                    },
                },
                tables: {
                    article: {
                        title: 'string',
                    },
                    user: {
                        password: {
                            type: 'string',
                        },
                        username: 'string',
                    },
                },
            },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).not.toThrow();
    });
});
describe('Model Tables - Throw exception tests', () => {
    const modelTest = new model_parser_1.default();
    test('missing tables', () => {
        const configObject = {};
        configObject.model = {};
        expect(() => {
            modelTest.validate(configObject);
        }).toThrowError(utils_1.ModelParserErrors.NO_TABLES);
    });
    test('table as array', () => {
        const configObject = {};
        configObject.model = {};
        configObject.model.tables = { user: { username: 'string' }, post: [] };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrowError(utils_1.ModelParserErrors.TABLE_AS_ARRAY);
    });
    test('wrong table format', () => {
        const configObject = {};
        configObject.model = {};
        configObject.model.tables = { user: { username: 'string' }, post: {} };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrowError(utils_1.ModelParserErrors.EMPTY_COLUMN);
    });
});
describe('Model Association - Throw exception tests', () => {
    const modelTest = new model_parser_1.default();
    test('missing model', () => {
        const configObject = {};
        expect(() => {
            modelTest.validate(configObject);
        }).toThrow(utils_1.ModelParserErrors.NO_MODEL);
    });
    test('associations type wrong', () => {
        const configObject = {};
        configObject.model = { tables: {} };
        configObject.model.associations = [1, 2];
        expect(() => {
            modelTest.validate(configObject);
        }).toThrowError(utils_1.ModelParserErrors.ASSOC_AS_ARRAY);
    });
    test('association source is not in table', () => {
        const configObject = {
            model: { tables: {}, associations: { user: { username: 'string' } } },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrowError(utils_1.ModelParserErrors.NO_SRC_IN_TABLES);
    });
    test('relation not supported', () => {
        const configObject = {
            model: {
                associations: { user: { '1-->n': 'test' } },
                tables: { user: { username: 'string' } },
            },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrow(utils_1.ModelParserErrors.WRONG_RELATION);
    });
    test('target is not an array', () => {
        const configObject = {
            model: {
                associations: { user: { '1->n': 'test' } },
                tables: { user: { username: 'string' } },
            },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrow(utils_1.ModelParserErrors.TARGET_NOT_ARRAY);
    });
    test('target is not in table', () => {
        const configObject = {
            model: {
                associations: { user: { '1->n': ['user', 'test'] } },
                tables: { user: { username: 'string' } },
            },
        };
        expect(() => {
            modelTest.validate(configObject);
        }).toThrow(utils_1.ModelParserErrors.NO_TRG_IN_TABLES);
    });
});
//# sourceMappingURL=model-parser.test.js.map