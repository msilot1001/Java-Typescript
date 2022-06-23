import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import typegoose from '@typegoose/typegoose';

const { prop, getModelForClass } = typegoose;

import { logger } from './Assets/Logger.js';

dotenv.config();

class Cmd {
  @prop()
  public CmdName!: string;

  @prop()
  public output!: string;

  @prop()
  public react?: string;
}

const CmdModel = getModelForClass(Cmd);

mongoose
  .connect(process.env.DBURL!, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then(() => logger.info('==> MongoDB Connected...'))
  .catch(err => logger.error(err));

await CmdModel.create({
  CmdName: '꺠미야',
  output: '저 여깄어요!',
} as Cmd); // an "as" assertion, to have types for all properties

const user = await CmdModel.findOne({ CmdName: '꺠미야' }).exec();

console.log(user);
