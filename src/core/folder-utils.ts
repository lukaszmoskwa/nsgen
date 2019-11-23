import fs from 'fs';
import path from 'path';

class FolderUtils {
  public static createFolder(folderName: string): void {
    fs.mkdirSync(path.join(global.outDir, folderName), {
      recursive: true,
    });
  }
}

export default FolderUtils;
