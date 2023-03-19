const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes/AppRouter')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json({ msg: 'Server Works' }))
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
