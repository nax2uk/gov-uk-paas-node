const express = require('express')
const app = express()
const cfenv = require("cfenv");
const pg = require('pg');
const appEnv = cfenv.getAppEnv();
const connectionString = appEnv.getServiceURL("my-pg-service");
const client = new pg.Client({ connectionString, ssl: true });

client
.connect()
.then(()=>console.log('connected'))
.catch(err => console.error('connection error', err.stack))

app.get('/', (req, res) => {
  client
  .query('SELECT * FROM public.id')
  .then(result=>res.send(`These are the id values ${JSON.stringify(result.rows)}`))
  .catch(error=>console.error(error.stack))
  
})

app.listen(appEnv.port, appEnv.bind, () => {
  console.log(`Example app listening at http://localhost:${appEnv.port}`)
  console.log("server starting on " + appEnv.url)
});
