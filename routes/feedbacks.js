import express from 'express';
import {
    createFeedback,
    getFeedback,
    getFeedbacks,
    deleteFeedback,
    updateFeedback
} from '../controllers/feedbackcontroller.js';

// const Feedback = require('../models/feedbackmodel')

const router = express.Router()

//get all the feedbacks
router.get('/', getFeedbacks)

//get single feedback
router.get('/:id', getFeedback)

//add a new feedback
router.post('/', createFeedback)

//delete a single feedback
router.delete('/:id', deleteFeedback)

//update a single feedback
router.patch('/:id', updateFeedback)




export default router;