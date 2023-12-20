import express from 'express';
import {
    createFeedback,
    getFeedback,
    getFeedbacks,
    deleteFeedback,
    updateFeedback
} from '../controllers/feedbackcontroller.js';

// const Feedback = require('../models/feedbackmodel')
import Verification from '../Middleware/jwt.js';

const router = express.Router()

//get all the feedbacks
router.get('/', getFeedbacks)

//get single feedback
router.get('/:id', getFeedback)

//add a new feedback
router.post('/', Verification.verifyUser,createFeedback)// user and admin have access

//delete a single feedbak
router.delete('/:id', Verification.verifyAdmin,deleteFeedback)// admin have access

//update a single feedback
router.patch('/:id', Verification.verifyUser,updateFeedback)// user and admin have access




export default router;