
import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './server/routes/BookRoutes';
import memberRoutes from './server/routes/MemberRoutes';
import clientRoutes from './server/routes/ClientRoutes';

config.config();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.use('/books', bookRoutes);
app.use('/members', memberRoutes)
app.use('/clients', clientRoutes)

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;