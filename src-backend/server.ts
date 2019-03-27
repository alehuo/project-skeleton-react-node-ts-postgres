import 'reflect-metadata'
import 'express-async-errors'
import path from 'path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import projects from './routes/projects'

const app = express()
app.use(bodyParser.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'A4ObaaNVNCDJRkU9TL3l1x3BtHc81zUfWY8XGYqD',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))

  app.get('/', (req, res) => {
    res.sendFile(path.join('build', 'index.html'))
  })
}

app.use(projects)

app.listen(process.env.PORT || 8001)