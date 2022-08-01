import fs from 'node:fs';
import { pipeline } from 'stream';
import { getChunkData } from './get-chunk-data.js';

export const createVideoStreamByRange = (params) => {
  const { res, range, fileSize, resolvedPath } = params;
  const { start, end, chunkSize } = getChunkData(range, fileSize);
  const readStream = fs.createReadStream(resolvedPath, { start, end });

  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  });
  return pipeline(readStream, res, (err) => {
    if (err && (!err.code === 'ERR_STREAM_PREMATURE_CLOSE')) {
      console.log(err);
    }
  });
};

