import { IConfigurationFile } from './utils';

export {};

declare global {
  namespace NodeJS {
    interface Global {
      outDir: string;
      configuration: IConfigurationFile;
    }
  }
}
