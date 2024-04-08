const express = require('express');
const router = express.Router();
const models = require('../models/models')



// Section Part
router.post('/create_section', async (req, res) => {
    let {
        sectionName,
        status
    } = req.body

    if (!sectionName || !status) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Section.create({name: sectionName , status: status}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.post('/get_sections', async (req, res) => {
    let {
        skipNumber
    } = req.body

    let result = await models.Section.findAndCountAll({limit: 10, offset: skipNumber ? skipNumber : 0}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.put('/update_section', async (req, res) => {
    let {
        sectionId,
        sectionName,
        status
    } = req.body

    if (!sectionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Section.update({name: sectionName , status}, {where: {id: sectionId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        updatedCount: result[0]
    })
})

router.delete('/delete_section', async (req, res) => {
    let {
        sectionId
    } = req.body

    if (!sectionId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Section.destroy({where: {id: sectionId}}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send({
        deletedCount: result
    })
})



// Topic Part
router.post('/create_topic', async (req, res) => {
    let {
        topicName,
    } = req.body

    if (!topicName) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.create({name: topicName}).catch((err)=>{
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


// Section Topic Part
router.post('/add_section_topic', async (req, res) => {
    let {
        sectionId,
        topicId
    } = req.body

    if (!sectionId || !topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.SectionTopic.create({SectionId: sectionId, TopicId: topicId}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})

router.post('/get_section_topics', async (req, res) => {
    let {
        topicId
    } = req.body

    if (!topicId) {
        res.status(500).send({
            message: "Incomplete Data"
        });
        return;
    }

    let result = await models.Topic.findOne({include: {
        model: models.Section,
        through: {
          where: { TopicId: topicId }
        }
      }}).catch((err)=>{
        res.status(500).send({message: err.name})
        console.log("EE" , err);
        return
    })

    res.send(result)
})


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

    let result = await models.Section.findOne({include: {
        model: models.Topic,
        through: {
          where: { SectionId: sectionId }
        }
      }}).catch((err)=>{
        res.status(500).send({message: err.name})
        return
    })

    res.send(result)
})


module.exports = router