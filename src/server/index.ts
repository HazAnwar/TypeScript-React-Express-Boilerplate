/* eslint-disable @typescript-eslint/camelcase */
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.PORT || '3000';
const API_URL: string =
  process.env.API_URL || 'https://owner-api.teslamotors.com';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../dist'), {
    maxAge: Infinity
  })
);

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../public'), {
    maxAge: '30 days'
  })
);

app.post('/api/login', (req: Request, res: Response) => {
  axios
    .post(
      `${API_URL}/oauth/token`,
      {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        email: req.body.email,
        password: req.body.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => res.status(200).send(response.data))
    .catch((response) => res.status(400).send(response.data));
});

app.get('/api/vehicles', (req: Request, res: Response) => {
  axios
    .get(`${API_URL}/api/1/vehicles`, {
      headers: {
        Authorization: `Bearer ${req.headers.authorization}`
      }
    })
    .then((response) => res.status(200).send(response.data))
    .catch((response) => res.status(400).send(response.data));
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(
    '\x1b[34m',
    `${String.fromCodePoint(
      0x1f680
    )} Server has started running at http://localhost:${PORT}/ ${String.fromCodePoint(
      0x1f680
    )}`
  );
});

module.exports = app;
