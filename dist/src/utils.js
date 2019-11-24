"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_VERSION = '0.0.1';
exports.packageDepencencies = {
    dotenv: '^8.2.0',
    express: '^4.17.1',
    mysql2: '^2.0.1',
    sequelize: '^5.19.3',
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