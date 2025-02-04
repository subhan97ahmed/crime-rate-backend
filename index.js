const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const users = require('./router/users');
const auth = require('./router/auth');

const cors = require('cors');

const app = express();

console.log(`Enviorment: ${process.env.NoDE_ENV}`);
const url = "mongodb+srv://sam:sam@cluster0.zd0y4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 3000
})
  .then(() => { console.log("Connect to database") })
  .catch((e) => { console.error(e) });



app.use(express.json());

app.options('*', cors());
app.use(cors({ origin: '*', credentials: true }));

app.get('/', async (req, res) => {
  res.send("Build-back-end")
})

app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));