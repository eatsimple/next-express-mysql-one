import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/Database.js';
import sequelizeStore from 'connect-session-sequelize';
import userRouter from './app/user/router/userRouter.js';
import authRouter from './router/authRouter.js';
import session from 'express-session';
dotenv.config();

const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
//   console.log('berhasil dibuat');
// })();

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(authRouter);

// store.sync();

app.listen(process.env.PORT || 5000, () => {
  console.log(`API server berjalan di ${process.env.PORT}`);
});
