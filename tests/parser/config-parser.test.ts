import ConfigParser from '../../src/parser/config-parser';
import { ConfigParserErrors } from '../../src/utils';

describe('Config Parser - Throw exception tests', () => {
  const configTest = new ConfigParser();
  test('missing config', () => {
    const configObject: any = {};
    configObject.model = {};
    expect(() => {
      configTest.validate(configObject);
    }).toThrowError(ConfigParserErrors.NO_CONFIG);
  });

  test('missing name', () => {
    const configObject: any = {};
    configObject.config = {};
    expect(() => {
      configTest.validate(configObject);
    }).toThrowError(ConfigParserErrors.NO_NAME);
  });

  test('missing db configuration', () => {
    const configObject: any = {};
    configObject.config = { name: 'test' };
    expect(() => {
      configTest.validate(configObject);
    }).toThrowError(ConfigParserErrors.NO_DB_CONFIG);
  });

  test('missing db dialect', () => {
    const configObject: any = {};
    configObject.config = { name: 'test', db: { name: 'db_test' } };
    expect(() => {
      configTest.validate(configObject);
    }).toThrowError(ConfigParserErrors.NO_DIALECT);
  });

  test('wrong db dialect', () => {
    const configObject: any = {};
    configObject.config = {
      db: { name: 'db_test', type: 'randomSQL' },
      name: 'test',
    };
    expect(() => {
      configTest.validate(configObject);
    }).toThrowError(ConfigParserErrors.NOT_SUPPORTED_DIALECT);
  });
});
