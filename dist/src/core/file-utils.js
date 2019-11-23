"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileUtils {
    static createFile(outDir, filename, fn) {
        const stream = fs_1.default.createWriteStream(path_1.default.join(outDir, filename));
        fn = fn.bind(stream);
        stream.once('open', fn);
    }
}
exports.default = FileUtils;
//# sourceMappingURL=file-utils.js.map