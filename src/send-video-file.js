import fs from 'node:fs';
import path from 'path';
import { createVideoStream } from '../utils/create-video-stream.js';
import { createVideoStreamByRange } from '../utils/create-video-stream-by-range.js';

export const sendVideoFile = (params) => {
  const { req, res, pathToVideo } = params;
  const resolvedPath = path.resolve(pathToVideo);
  const fileSize = fs.statSync(resolvedPath).size;
  const range = req.headers.range;

  if (!range) {
    createVideoStream({ res, fileSize, resolvedPath });
    return;
  }

  createVideoStreamByRange({ res, range, fileSize, resolvedPath });
};

