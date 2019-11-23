"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_VERSION = '0.0.1';
exports.packageDepencencies = {
    dotenv: '^8.2.0',
};
exports.devDependecies = {};
exports.gitignoreList = ['node_modules/', 'package-lock.json'];
exports.TSConfigObject = {
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
//# sourceMappingURL=utils.js.map