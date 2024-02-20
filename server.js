const dotnev = require('dotenv');
dotnev.config({ path: './config.env' });

const app = require('./app');

const port = 3000;
app.listen(port, () => {
  console.log('App is running');
});
