export const APP_VERSION = '0.0.1';

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
