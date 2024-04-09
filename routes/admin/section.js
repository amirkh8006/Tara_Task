const express = require('express');
const router = express.Router();
const models = require('../../models/models')


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


module.exports = router
