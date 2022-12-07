'use strict';
const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const path = require('path')
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Gọi db
async function getDBConnection() {
  const db = await sqlite.open({
    filename: "db.sqlite3",
    driver: sqlite3.Database
  });
  return db;
}
//annoucement
app.get('/api/annoucements', async function (req, res) {
  const db = await getDBConnection()
  const qry = 'SELECT title, content FROM announcement ;'
  const rows = await db.all(qry)
  res.json(rows)
  db.close()
})
//register
app.post('/api/register', async function (req, res) {
  const username = req.body.username
  const studentID = req.body.studentID
  const password = req.body.password
  const hash = await bcrypt.hash(password, 10)
  const db = await getDBConnection()
  const result = await db.run("insert into register (username, studentID, password) values (?,?,?) ", [username, studentID, hash])
  res.status(500)
  res.send(result)
})
//login
app.post('/api/login', async function (req, res) {

  const db = await getDBConnection()
  const password = req.body.password
  const result = await db.get("Select*from register where studentID = ? ", req.body.studentID)
  if (result <= 0) {
    res.send('Non-exist account')
  }
  else {
    if (result) {
      let validatePassword = await bcrypt.compare(password, result.password);
      if (validatePassword) {
        // res.cookie('user_id', result.id);
        // res.cookie('studentID', result.studentID)
        res.send('Sucessful login')
      }
      else {
        res.send('Incorrect password')
      }
    }
  }
  res.send(result)
})

const PORT = 8000;
app.listen(PORT);