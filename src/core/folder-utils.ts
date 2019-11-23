import fs from 'fs';
import path from 'path';

class FolderUtils {
  public static createFolder(outDir: string, folderName: string): void {
    fs.mkdirSync(path.join(outDir, folderName), {
      recursive: true,
    });
  }
}

export default FolderUtils;
