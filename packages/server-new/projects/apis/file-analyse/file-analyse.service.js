import { Buffer } from 'node:buffer';
import prettyBytes from 'pretty-bytes';

class FileAnalyseService {
  static async analyse(data) {
    const { filename, mimetype } = data;
    const buffer = await data.toBuffer();
    const size = Buffer.byteLength(buffer);

    return {
      name: filename,
      type: mimetype,
      size: prettyBytes(size),
    };
  }
}

export default FileAnalyseService;
