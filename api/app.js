const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('pactice server is rinning');
})

router.get('/hello', (req, res) => {
    res.send('my name is md jahirul islam emon');
})

module.exports = router;
