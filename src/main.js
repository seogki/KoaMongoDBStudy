require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
const app = new Koa();
const router = new Router();

const { PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected To MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

router.use('/api', api.routes());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
