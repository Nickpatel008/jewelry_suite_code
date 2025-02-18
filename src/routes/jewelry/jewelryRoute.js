const express = require('express');
const { getJewelryTypes, getJewelrySubTypes, addJewelry, getMetalTypes, fetchAllJewelry, fetchJewelry, editJewelry, addMetaData } = require('../../controllers/jewelryController');
const tokenValidate = require('../../middlewares/tokenValidate');
const permissionCheck = require('../../middlewares/permissionCheck');
const validator = require("../../helper/validator");
const { jois } = require('./schema');
const router = express.Router();

// types
router.get('/types', tokenValidate, getJewelryTypes);
router.get('/subtypes', tokenValidate, getJewelrySubTypes);

// Jewelry MetaData
router.get('/metal-types', tokenValidate, permissionCheck, getMetalTypes);

// CRUD Jewelry
router.post('/', tokenValidate, permissionCheck, validator(jois.addJewelryPayload), addJewelry);
router.get('/', tokenValidate, permissionCheck, fetchAllJewelry);
router.get('/:id', tokenValidate, permissionCheck, fetchJewelry);
router.put('/:id', tokenValidate, permissionCheck, validator(jois.addJewelryPayload), editJewelry);

module.exports = router;
