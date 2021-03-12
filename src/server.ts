import express from 'express'
import pluginCORS from 'cors'
import { json as pluginJSON } from 'body-parser'

import AuthManager from './AuthManager'
import TemplateManager from './TemplateManager'
//
import fs from 'fs'
import path from 'path'
require('dotenv').config()

const dataDirPath = path.join(__dirname, 'data')
if (!fs.existsSync(dataDirPath)) fs.mkdirSync(dataDirPath, { recursive: true })

AuthManager.init(path.join(dataDirPath, 'users.json'))
TemplateManager.init(path.join(dataDirPath, 'templates.json'))

import AuthMiddlewareFactory from './AuthMiddlewareFactory'
const authMiddleware = AuthMiddlewareFactory(AuthManager.check)

///
const server = express()
server.use(pluginCORS())
server.use(pluginJSON())

server.get('/', function (req, res) {
  return res.json({ /* ... */ })
})

server.get('/auth', authMiddleware, function (req, res) {
  return res.json({status: true})
})

server.get('/templates', function (req, res) {
  return res.json({
    templates: [
      { title: 'Remote 1', description: '' },
      { title: 'Remote 2', description: '' }
    ]
  })
})

const PORT = Number(process.env.PORT)
const HOST = process.env.HOST

server.listen(PORT, HOST, function () {
  console.log(`Server listening on ${HOST}:${PORT}`)
})
