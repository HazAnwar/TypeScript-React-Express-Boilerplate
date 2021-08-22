import express, { Application } from 'express';
import path from 'path';

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.PORT || '3000';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../../build'), { maxAge: Infinity })
);

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
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
