const express = require('express');
const router = express.Router();
const models = require('../../models/models')

router.post('/create_question_answer', async (req, res) => {
    let {
        questionText,
        topicId
    } = req.body

    if (!questionText || !topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.QuestionAnswer.create({questionText, TopicId: topicId}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})


router.put('/update_question_answer', async (req, res) => {
    let {
        topicId,
        questionId,
        questionText,
        viewCount,
        liked,
        status
    } = req.body

    if (!questionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.QuestionAnswer.update({TopicId: topicId, questionText, viewCount, liked, status}, {where: {id: questionId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        updatedCount: result[0]
    })
})

router.delete('/delete_question_answers', async (req, res) => {
    let {
        questionId
    } = req.body

    if (!sectionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.QuestionAnswer.destroy({where: {id: questionId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        deletedCount: result
    })
})


router.post('/get_question_answers_based_on_topic', async (req, res) => {
    let {
        topicId,
        skipNumber
    } = req.body

    if (!topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.QuestionAnswer.findAndCountAll({limit: 10, offset: skipNumber ? skipNumber : 0, where: {TopicId: topicId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

module.exports = router

