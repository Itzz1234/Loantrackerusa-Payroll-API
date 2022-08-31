import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import morgan from "morgan";
import moment from 'moment-timezone';
import path from 'path';
import v2Routes from './v2/routes'
const rfs = require('rotating-file-stream');

import { logFilename } from '../src/v2/utils/utils'

const app: Application = express();
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }))


const accessLogStream = rfs.createStream(logFilename, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '/../_log')
})

morgan.token('ip', (req: any) => req.headers['x-forwarded-for'] || req.connection.remoteAddress);
morgan.token('utctime', (req: any, res: any) => moment.utc().format('DD MMM YYYY HH:mm:ss z'));
app.use(morgan(':utctime\t:remote-addr\t:remote-user\t:method\t:url\t:status\t:response-time ms\t:res[content-length]\t:req[content-length]', { stream: accessLogStream }));


const PORT = process.env.APP_PORT || 9080;

v2Routes(app)


app.get('/', (_req: Request, res: Response) => {
  const timeNow = `EST: ${moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss.SSS")}`;
  res.send(`<div align="center">Payroll backend is running<br/>${timeNow}</div>`)
})






app.listen(PORT, () => { // server listen port
  console.log(`Server Running here 👉 http://localhost:${PORT}`);
});