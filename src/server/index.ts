/* eslint-disable @typescript-eslint/camelcase */
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.PORT || '3000';

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

app.post('/api', (req: Request, res: Response) => {
  axios
    .post(
      'https://owner-api.teslamotors.com/oauth/token',
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
    .then((response) => res.status(200).send(response.data));
});

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server has started running at http://localhost:${PORT}/ 🚀`);
});

module.exports = app;
