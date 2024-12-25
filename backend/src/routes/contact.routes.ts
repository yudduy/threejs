import { Router } from 'express'
import { handleContact } from '../controllers/contact.controller'

const router = Router()

// Middleware to validate request body
const validateContactRequest = (req: any, res: any, next: any) => {
  const contentType = req.headers['content-type']
  
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({
      error: 'Invalid content type',
      details: 'Request must be JSON'
    })
  }

  next()
}

router.post('/contact', validateContactRequest, handleContact)

export default router 