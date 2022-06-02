const express = require('express');
const router = express.Router();


router.get('/users', (req, res) => {
    res.send(`hello this is users route`)

})
router.get('/user', (req, res) => {
    res.send(`hello this is single route`)

})



module.exports = router;