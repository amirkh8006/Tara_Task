const express = require('express');
const router = express.Router();
const models = require('../../models/models')
const { Op } = require('sequelize')


router.post('/view_question_answers', async (req, res) => {
    let {
        skipNumber
    } = req.body

    let result = await models.QuestionAnswer.findAndCountAll({limit: 10, offset: skipNumber ? skipNumber : 0 , include: [{model: models.Topic}]}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})


router.post('/search_question_answers', async (req, res) => {
    let {
        questionText,
        skipNumber
    } = req.body


    if (!questionText) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }


    let result = await models.QuestionAnswer.findAndCountAll({
        where: {
            questionText: { [Op.like]: `%${questionText}%` },
        },
        include: [{model: models.Topic}],
        limit: 10,
        offset: skipNumber ? skipNumber : 0,
      }).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.post('/popular_question_answers', async (req, res) => {
    let {
        skipNumber
    } = req.body



    let result = await models.QuestionAnswer.findAndCountAll({
        order: [['viewCount', 'DESC']],
        include: [{model: models.Topic}],
        limit: 10,
        offset: skipNumber ? skipNumber : 0,
      }).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

module.exports = router
