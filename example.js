const express = require('express')
const app = express()
// const port = process.env.PORT || 3000;
const cfenv = require("cfenv");
const pg = require('pg');
const appEnv = cfenv.getAppEnv();
const connectionString = appEnv.getServiceURL("my-pg-service");
const client = new pg.Client(connectionString);
client.ssl = true;
client.connect();

client
.query('SELECT * FROM public.test_table')
.then(result=>console.log('*****result' + result))
.catch(error=>console.error(error.stack))
.then(()=>client.end())

app.get('/', (req, res) => {
  console.log("In the first GET call");
  res.send('Hello World!')
})


console.log("******** example.js ************");
console.log(appEnv);
console.log("connection string: ", connectionString);

// app.get("/", async (req, res) => {
//   console.log("************* In the GET request **************");
//   try {
//     console.log("In the try block");
//     const response = await client.query("SELECT * FROM public.test_table");
//     console.log(response);
//     res.send('Hello World!');
//   } catch (err) {
//     console.log("In the catch block");
//     console.log(err);
//     res.send(err);
//   }
// });



app.listen(appEnv.port, appEnv.bind, () => {
  console.log(`Example app listening at http://localhost:${appEnv.port}`)
  console.log("server starting on " + appEnv.url)
});
