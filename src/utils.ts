export const APP_VERSION = '0.0.1';

declare global {
  let outDir: string;
}

export const packageDependencies = {
  dotenv: '^8.2.0',
  express: '^4.17.1',
  mysql2: '^2.0.1',
  sequelize: '^5.19.3',
};

export const devDependecies = {};

export const gitignoreList = ['node_modules/', 'package-lock.json', '.env'];

export const TSConfigObject = {
  compilerOptions: {
    esModuleInterop: true,
    module: 'commonjs',
    moduleResolution: 'node',
    outDir: 'dist',
    sourceMap: true,
    target: 'es6',
  },
  lib: ['es2015'],
};

export enum ModelParserErrors {
  NO_MODEL = 'Missing model configuration',
  ASSOC_AS_ARRAY = 'model.associations must be an object - found array',
  NO_SRC_IN_TABLES = 'An association source is not declared in the model.tables object ',
  NO_TRG_IN_TABLES = 'An association target is not declared in the model.tables object ',
  WRONG_RELATION = 'A provided relation is not supported in model.associations',
  TARGET_NOT_ARRAY = 'A provided target is not an array',
}

/**
 * Database configuration interface
 */
export interface IDBConfig {
  name: string;
  username: string;
  password: string;
  type: string;
}

/**
 * Project configuration interface
 */
export interface IProjectConfig {
  db?: IDBConfig;
  name?: string;
  description?: string;
}

/**
 * Column inside a 'table' object
 * @param name Name of the column
 * @param class Type of the column, optionally with validation options
 */
export interface IModelValueConfig {
  name: string;
  class?: string | { type: string; check?: {} };
}

/**
 * Tables inside the model object
 * @param name Name of the table
 * @param values Columns of the table
 */
export interface IModelTableConfig {
  name: string;
  values: IModelValueConfig[];
}

export interface IApiMethodsConfig {
  type: string;
}

/**
 * Association type
 * @param type Type of the association [1:1], [1:n], [n:m]
 * @param targets List of target for that type of association
 */
export interface IAssociation {
  type: string;
  targets: string[];
}

/**
 * Associations between tables in model configuration
 * @param source Name of the source of the association
 * @param association Array of possibile associations
 */
export interface IModelAssociationConfig {
  source: string;
  association: IAssociation[];
}

/**
 * API configuration interface
 * @param endpoint Name of the endpoint
 * @param model Optional reference to an existing model name
 * @param methods methods for the selected api
 */
export interface IApiConfig {
  endpoint: string;
  model?: IModelTableConfig;
  methods: IApiMethodsConfig[];
}

export interface IModelConfig {
  tables: IModelTableConfig[];
  associations: IModelAssociationConfig[];
}

/**
 * The whole configuration object interface
 * @param config Project configuration object
 * @param model Model configuration object with relations
 * @param api Routes and API endpoint data object
 */
export interface IConfigurationFile {
  config?: IProjectConfig;
  model?: IModelConfig;
  api?: IApiConfig[];
}
