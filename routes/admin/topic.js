const express = require('express');
const router = express.Router();
const models = require('../../models/models')

router.post('/create_topic', async (req, res) => {
    let {
        topicName,
        sectionId
    } = req.body

    if (!topicName || !sectionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.create({name: topicName, SectionId: sectionId}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.post('/get_topics', async (req, res) => {
    let {
        skipNumber
    } = req.body

    let result = await models.Topic.findAndCountAll({limit: 10, offset: skipNumber ? skipNumber : 0}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.put('/update_topic', async (req, res) => {
    let {
        topicId,
        topicName,
    } = req.body

    if (!topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.update({name: topicName}, {where: {id: topicId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        updatedCount: result[0]
    })
})

router.delete('/delete_topic', async (req, res) => {
    let {
        topicId
    } = req.body

    if (!topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.destroy({where: {id: topicId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        deletedCount: result
    })
})


// Section Topic
router.post('/get_topic_sections', async (req, res) => {
    let {
        sectionId
    } = req.body

    if (!sectionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.findAll({where: {SectionId: sectionId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})


module.exports = router
