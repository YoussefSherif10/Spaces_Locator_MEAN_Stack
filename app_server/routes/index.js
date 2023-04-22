const express = require('express');
const ctrlMain = require("../controllers/main");
const router = express.Router();

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
