import pg from 'pg';
import logger from './Assets/Logger.js';

const { Pool, Client } = pg;

const config = {
  connectionString:
    'postgresql://hwwvkkximhiquc:9f3f4e252f12d855a243b999a2defec638e24c6e02438f790157f8cb4167d710@ec2-52-204-195-41.compute-1.amazonaws.com:5432/d60opoelqj6te7?sslmode=require',
  // Beware! The ssl object is overwritten when parsing the connectionString
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Client(config);
client.connect(err => {
  if (err) {
    logger.error(`Error Connecting: ${err.stack}`);
  } else {
    logger.info('Client connected');
    client.end();
  }
});

const pool = new Pool(config);

const userid = '780771337332981780';

pool
  .connect()
  .then(async poolclient => {
    logger.info('Pool connected');

    const res1 = await poolclient.query(
      `INSERT INTO talkcount VALUES ('${userid}',0) ON CONFLICT (userid) DO NOTHING;`,
    );
    logger.info(res1.rows[0]);

    const res2 = await poolclient.query(
      `SELECT * FROM talkcount where userid='${userid}'`,
    );
    logger.info(JSON.stringify(res2.rows[0]));

    const res3 = await poolclient.query(
      `UPDATE talkcount SET value = ${
        res2.rows[0].value + 1
      } WHERE userid='${userid}'`,
    );

    logger.info(JSON.stringify(res3));

    poolclient.release();
  })
  .catch(err => logger.error(`Error: ${err.stack}`))
  .then(() => pool.end());
