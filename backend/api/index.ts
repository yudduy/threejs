import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from '../src/routes/contact.routes'

dotenv.config()

const app = express()

const allowedOrigins = [
  'https://axess.vc',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use('/api', contactRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' })
})

// Export the Express app for serverless
export default app 