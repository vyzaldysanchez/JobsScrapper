'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import db from './db';
import { assignRoutes } from './routes';

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

assignRoutes(app, router);

(async () => {
  try {
    await db.sync(); // Waiting for all models and DB resources to load properly
  } catch (e) {
    console.error('Unable to sync the database:', e);
  }

  app.listen(PORT, () => console.log(`Scrapper backend started on port ${PORT}`));
})();
