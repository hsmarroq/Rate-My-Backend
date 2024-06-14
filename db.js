import pkg from 'pg';
const { Client } = pkg;
import { getDatabaseUri } from './config.js';
import 'colors';

const db = new Client({ connectionString: getDatabaseUri() });

db.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('Successfully connected to postgres database!'.blue);
  }
});

export default db;
