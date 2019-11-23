"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FolderUtils {
    static createFolder(outDir, folderName) {
        fs_1.default.mkdirSync(path_1.default.join(outDir, folderName), {
            recursive: true,
        });
    }
}
exports.default = FolderUtils;
//# sourceMappingURL=folder-utils.js.map