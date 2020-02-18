import ModelParser from '../../src/parser/model-parser';
import { ModelParserErrors } from '../../src/utils';

describe('Model Configuration - Correct configurations', () => {
  const modelTest = new ModelParser();

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
  const modelTest = new ModelParser();
  test('missing tables', () => {
    const configObject: any = {};
    configObject.model = {};
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.NO_TABLES);
  });
  test('table as array', () => {
    const configObject: any = {};
    configObject.model = {};
    configObject.model.tables = { user: { username: 'string' }, post: [] };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.TABLE_AS_ARRAY);
  });
  test('wrong table format', () => {
    const configObject: any = {};
    configObject.model = {};
    configObject.model.tables = { user: { username: 'string' }, post: {} };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.EMPTY_COLUMN);
  });
});

describe('Model Association - Throw exception tests', () => {
  const modelTest = new ModelParser();
  test('missing model', () => {
    const configObject: any = {};
    expect(() => {
      modelTest.validate(configObject);
    }).toThrow(ModelParserErrors.NO_MODEL);
  });
  test('associations type wrong', () => {
    const configObject: any = {};
    configObject.model = { tables: {} };
    configObject.model.associations = [1, 2];
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.ASSOC_AS_ARRAY);
  });

  test('association source is not in table', () => {
    const configObject = {
      model: { tables: {}, associations: { user: { username: 'string' } } },
    };
    expect(() => {
      modelTest.validate(configObject);
    }).toThrowError(ModelParserErrors.NO_SRC_IN_TABLES);
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
    }).toThrow(ModelParserErrors.WRONG_RELATION);
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
    }).toThrow(ModelParserErrors.TARGET_NOT_ARRAY);
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
    }).toThrow(ModelParserErrors.NO_TRG_IN_TABLES);
  });
});
