const { v4: uuidv4 } = require('uuid');
const { dbReader } = require('../models/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { SuccessResponse, BadRequestResponse } = require('../core');
const permissionCheck = require('../middlewares/permissionCheck');
const saltRounds = 10

// ? Types
const getJewelryTypes = async (req, res) => {
    try {

        let fetchTypes = await dbReader.JewelryType.findAll({
            include: [{
                required: false,
                model: dbReader.JewelrySubType,
                where: {
                    is_deleted: 0
                },
            }],
            where: {
                is_deleted: 0
            }
        })

        fetchTypes = JSON.parse(JSON.stringify(fetchTypes))

        new SuccessResponse("Jewelry Types fetched successfully.", fetchTypes).send(res);
    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

// ? Sub Types
const getJewelrySubTypes = async (req, res) => {
    try {

        let fetchTypes = await dbReader.JewelrySubType.findAll({
            where: {
                is_deleted: 0
            }
        })

        fetchTypes = JSON.parse(JSON.stringify(fetchTypes))

        new SuccessResponse("Jewelry Sub Types fetched successfully.", fetchTypes).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

//  *****************************

// ? Add new Jewelry
const addJewelry = async (req, res) => {
    try {

        let { jewelry_type_sub_id, title, description, weight, metal_id, images, natural_price, lab_price } = req.body

        var unixTimestamp = Math.floor(new Date().getTime() / 1000);
        let created_datetime = JSON.stringify(unixTimestamp),
            updated_datetime = JSON.stringify(unixTimestamp);
        let jewelry_id = uuidv4()

        let JObject = {
            jewelry_id: jewelry_id,
            jewelry_type_sub_id: jewelry_type_sub_id,
            title: title,
            description: description,
            weight: weight,
            created_datetime: created_datetime,
            updated_datetime: updated_datetime,
        }

        let createJewelry = await dbReader.jewelry.create(JObject)
        if (createJewelry) {
            let jewelry_metadata_id = uuidv4()
            images = JSON.stringify(images)

            let JW_META_Object = {
                jewelry_metadata_id: jewelry_metadata_id,
                jewelry_id: jewelry_id,
                metal_id: metal_id,
                images: images,
                natural_price: natural_price,
                lab_price: lab_price,
                created_datetime: created_datetime,
                updated_datetime: updated_datetime,
            }
            await dbReader.jewelryMetadata.create(JW_META_Object)
        } else {
            throw new Error("Something went wrong.")
        }

        new SuccessResponse("Jewelry Sub Types fetched successfully.", {}).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

// ? All Jewelry
const fetchAllJewelry = async (req, res) => {
    try {

        let { search, page_record, page_no } = req.body
        // pagination
        let row_offset = 0, row_limit = 10
        if (page_record) {
            row_limit = parseInt(page_record)
        }
        if (page_no) {
            row_offset = (page_no * page_record) - page_record;
        }
        var SearchCondition = dbReader.Sequelize.Op.ne,
            SearchData = null;
        if (search) {
            SearchCondition = dbReader.Sequelize.Op.like;
            SearchData = "%" + search + "%";
        }

        let getData = await dbReader.jewelry.findAll({
            include: [{
                required: false,
                model: dbReader.JewelrySubType,
                attributes: ["jewelry_type_sub_id", "jewelry_type_id", "code", "name", "concept", "created_by"],
                where: {
                    is_deleted: 0
                },
                include: [{
                    model: dbReader.JewelryType,
                    attributes: ["jewelry_type_id", "name"],
                }]
            },
            {
                required: false,
                model: dbReader.jewelryMetadata,
                attributes: [
                    "jewelry_metadata_id", "jewelry_id", "metal_id", "images", "natural_price", "lab_price",]
            }],
            where: {
                is_deleted: 0
            },
            // order: [sortJoin],
            // limit: row_limit,
            // offset: row_offset,
        })

        getData = JSON.parse(JSON.stringify(getData))

        new SuccessResponse("Jewelry list fetched successfully.", getData).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

// fetch by id
const fetchJewelry = async (req, res) => {
    try {

        let { id } = req.params
        let getData = await dbReader.jewelry.findOne({
            include: [{
                required: false,
                model: dbReader.JewelrySubType,
                attributes: ["jewelry_type_sub_id", "jewelry_type_id", "code", "name", "concept", "created_by"],
                where: {
                    is_deleted: 0
                },
                include: [{
                    model: dbReader.JewelryType,
                    attributes: ["jewelry_type_id", "name"],
                }]
            },
            {
                required: false,
                model: dbReader.jewelryMetadata,
                attributes: [
                    "jewelry_metadata_id", "jewelry_id", "metal_id", "images", "natural_price", "lab_price",]
            }],
            where: {
                jewelry_id: id,
                is_deleted: 0
            }
        })

        getData = JSON.parse(JSON.stringify(getData))

        new SuccessResponse("Jewelry list fetched successfully.", getData).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

// fetch by id
const editJewelry = async (req, res) => {
    try {
        let { id } = req.params
        let { jewelry_type_sub_id, title, description, weight, metal_id, images, natural_price, lab_price } = req.body
        var unixTimestamp = Math.floor(new Date().getTime() / 1000);
        let created_datetime = JSON.stringify(unixTimestamp),
            updated_datetime = JSON.stringify(unixTimestamp);

        // validate product
        let validateJewel = await dbReader.jewelry.findOne({
            include: [{
                model: dbReader.jewelryMetadata,
                where: {
                    is_deleted: 0
                }
            }],
            where: {
                jewelry_id: id,
                is_deleted: 0
            }
        })

        if (_.isEmpty(validateJewel)) {
            throw new Error("Jewelry not found.")
        }

        validateJewel = JSON.parse(JSON.stringify(validateJewel))

        let JObject = {
            jewelry_type_sub_id: jewelry_type_sub_id,
            title: title,
            description: description,
            weight: weight,
            updated_datetime: updated_datetime,
        }

        let updateJewelry = await dbReader.jewelry.update(JObject, {
            where: {
                jewelry_id: id,
                is_deleted: 0
            }
        })
        if (updateJewelry[0] > 0) {
            // update metadata
            images = JSON.stringify(images)

            let JW_META_Object = {
                metal_id: metal_id,
                images: images,
                natural_price: natural_price,
                lab_price: lab_price,
                updated_datetime: updated_datetime,
            }
            await dbReader.jewelryMetadata.update(JW_META_Object, {
                where: {
                    jewelry_metadata_id: validateJewel.js_jewelry_metadatum.jewelry_metadata_id,
                    jewelry_id: id,
                    is_deleted: 0
                }
            })

        } else {
            throw new Error("Something went wrong.")
        }

        new SuccessResponse("Jewelry data updated successfully.", {}).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

//  *****************************

// ? Meta data
const getMetalTypes = async (req, res) => {
    try {

        let fetchMetalTypes = await dbReader.metals.findAll({
            include: [{
                required: false,
                model: dbReader.metalsPrices,
                where: {
                    is_deleted: 0
                },
            }],
            where: {
                is_deleted: 0
            }
        })

        fetchMetalTypes = JSON.parse(JSON.stringify(fetchMetalTypes))

        new SuccessResponse("Metal Types fetched successfully.", fetchMetalTypes).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

module.exports = {
    getJewelryTypes,
    getJewelrySubTypes,
    addJewelry,
    getMetalTypes,
    fetchAllJewelry,
    fetchJewelry,
    editJewelry,
};
