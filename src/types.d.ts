export {};

declare global {
  namespace NodeJS {
    interface Global {
      outDir: string;
    }
  }
}
