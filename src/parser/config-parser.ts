import NodeJSConfig from '../core/nodejs/nodejs-config';
import {
  ConfigParserErrors,
  DBSupportedDialects,
  IProjectConfig,
} from '../utils';
import Parser from './parser';

class ConfigParser extends Parser {
  public parserType = 'config';

  public parse(config: IProjectConfig): void {
    global.configuration.config = config;
    NodeJSConfig.initializeFiles(config.db);
  }

  public typeMap(config: IProjectConfig): IProjectConfig {
    return config;
  }

  public validate(configObject: any): void {
    if (!configObject.config) {
      throw new Error(ConfigParserErrors.NO_CONFIG);
    }
    configObject = configObject.config;
    if (!configObject.name) {
      throw new Error(ConfigParserErrors.NO_NAME);
    }
    if (!configObject.db) {
      throw new Error(ConfigParserErrors.NO_DB_CONFIG);
    }
    if (!configObject.db.type) {
      throw new Error(ConfigParserErrors.NO_DIALECT);
    }
    if (!DBSupportedDialects.includes(configObject.db.dialect)) {
      throw new Error(ConfigParserErrors.NOT_SUPPORTED_DIALECT);
    }
  }
}

export default ConfigParser;
