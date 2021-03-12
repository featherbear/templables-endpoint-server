import express from 'express'
import pluginCORS from 'cors'
import { json as pluginJSON } from 'body-parser'
require('dotenv').config()

const server = express()
server.use(pluginCORS())
server.use(pluginJSON())

server.get('/', function (req, res) {
  return res.json({ /* ... */ })
})

{
  const PORT = Number(process.env.PORT)
  const HOST = process.env.HOST

  server.listen(PORT, HOST, function () {
    console.log(`Server listening on ${HOST}:${PORT}`)
  })
}
