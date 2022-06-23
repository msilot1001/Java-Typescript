import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './Assets/Logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 7700;

app.use(cors());

app.options;

const server = app.listen(port, () => {
  logger.info(`
  ################################################
  🛡️  Server listening on port: ${process.env.PORT}🛡️
  ################################################
`);
});
// https://www.section.io/engineering-education/how-to-create-a-simple-rest-api-using-typescript-and-nodejs/
