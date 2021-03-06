// require the express module (installed via `npm i express`)
const express = require('express');

// make an express app. no "new" keyword ¯\_(ツ)_/¯
const app = express();

// import cors "middleware" to enable our server to do CORS
const cors = require('cors');
// register it
app.use(cors());

// register express "middleware" for converting incoming
// request body to deserialized request.body property
app.use(express.json());

// require our "mock" data
const fruits = require('./data/fruits');

// temp solution to updating data...
const fs = require('fs');
// path to data file:
const dataPath = 'data/fruits.json';


// app.<method>(<path>, handler)
app.get('/api/fruits', (req, res) => {
  // fs file paths are relative to pwd (cwd) aka where you started node
  const raw = fs.readFileSync(dataPath)
  // make into js array with objects
  const data = JSON.parse(raw);
  res.send(data);
});

app.post('/api/fruits', (req, res) => {
  console.log(req.method, req.url, req.body);
  // fs file paths are relative to pwd (cwd) aka where you started node
  const raw = fs.readFileSync(dataPath)
  // make into js array with objects
  const data = JSON.parse(raw);
  // push our new object into array
  data.push(req.body);
  // save file
  fs.writeFileSync(dataPath, JSON.stringify(data));

  // send back object
  res.send(req.body);
});

app.use((req, res) => {
  console.log(req.method, req.url, req.body.name);
  res.send({ error: 'path not found' });
});

const PORT = 3000;
// start "listening" (run) the app (server)
app.listen(PORT, () => console.log('app running on ' + PORT));