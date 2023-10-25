import express from 'express';
import Feedback from '../models/feedbackmodel.js';
import mongoose from 'mongoose';


// get all feedbacks
const getFeedbacks = async (req, res) => {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 })
    res.json({
        data: feedbacks,
        message: 'success',
        status: 200
    })
}
// get single feedback
const getFeedback = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid' })
    }

    const feedback = await Feedback.findById(id)

    if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' })
    }
    res.json({
        data: feedback,
        message: 'success',
        status: 200
    })
}
// create a new Feedback
const createFeedback = async (req, res) => {
    const { content, first_name, last_name } = req.body
    // add feedback to db
    try {
        const feedback = await Feedback.create({ content, first_name, last_name })
        res.json({
            data: feedback,
            message: 'success',
            status: 200
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }

}
// delete a single Feedback
const deleteFeedback = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid' })
    }
    const feedback = await Feedback.findOneAndDelete({ _id: id })

    if (!feedback) {
        res.status(404).json({ err: 'Not Found' })
    }
    res.json({
        data: feedback,
        message: 'success',
        status: 200
    })
}
// update a single Feedback
const updateFeedback = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid' })
    }
    const feedback = await Feedback.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!feedback) {
        res.status(404).json({ err: 'Not Found' })
    }
    res.json({
        data: feedback,
        message: 'success',
        status: 200
    })
}

export {  createFeedback,
    getFeedback,
    getFeedbacks,
    deleteFeedback,
    updateFeedback };