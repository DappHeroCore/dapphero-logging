import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { ApplicationError } from './errors'
import routes from './routes'

const express = require('express')

const app = express()

app.options('*', cors())
app.use(cors())
app.use(morgan('short'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))

app.use(routes)

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }

  return res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err : undefined,
    message: err.message
  })
})

export default app
