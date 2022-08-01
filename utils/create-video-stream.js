import { pipeline } from 'stream';
import fs from 'node:fs';

export const createVideoStream = (params) => {
  const { res, fileSize, resolvedPath } = params;

  res.writeHead(200, {
    'Content-Length': fileSize,
    'Content-Type': 'video/mp4',
  });

  const readStream = fs.createReadStream(resolvedPath);
  return pipeline(readStream, res, (err) => {
    if (err && (!err.code === 'ERR_STREAM_PREMATURE_CLOSE')) {
      console.log(err);
    }
  });
};