const express = require('express')
const cors = require('cors')
const AppRouter = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ msg: 'Server Works' }))
app.use('/api', AppRouter)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
