export const APP_VERSION = '0.0.1';

export const packageDepencencies = {
  dotenv: '^8.2.0',
};

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

export interface IDBConfig {
  dbname: string;
  username: string;
  password: string;
  type: string;
}
export interface IProjectConfig {
  db?: IDBConfig;
  name?: string;
  description?: string;
}
export interface IConfigurationFile {
  config?: IProjectConfig;
}
