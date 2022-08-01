import fs from 'node:fs';
import { pipeline } from 'stream';
import * as url from 'url';

export const sendImage = (req, res) => {
  const imgUrl = req.url;
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

  res.setHeader('Content-Type', 'image/png');
  const readStream = fs.createReadStream(__dirname + `../public${imgUrl}`);
  pipeline(readStream, res, (err) => err && console.log(err));
}