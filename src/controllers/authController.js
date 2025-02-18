const { v4: uuidv4 } = require('uuid');
const { dbReader } = require('../models/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { BadRequestResponse, SuccessResponse } = require('../core');
const saltRounds = 10

const register = async (req, res) => {
    try {
        let { profile, name, email, password, contact } = req.body
        let user_id = uuidv4();

        let validateUser = await dbReader.admin.findOne({
            where: {
                email: email,
                is_deleted: 0
            }
        });

        if (validateUser) {
            throw new Error('User already exists.')
        }

        var unixTimestamp = Math.floor(new Date().getTime() / 1000);
        let created_datetime = JSON.stringify(unixTimestamp),
            updated_datetime = JSON.stringify(unixTimestamp);


        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        password = hash;

        let data = {
            user_id: user_id,
            email: email
        }

        let access_token = jwt.sign(data, process.env.SECRET_KEY);

        let adminObj = {
            user_id: user_id,
            profile: profile,
            name: name,
            email: email,
            password: password,
            contact: contact,
            admin_type: 2,
            access_token: access_token,
            created_datetime: created_datetime,
            updated_datetime: updated_datetime,
            is_super: false,
        }

        let createAdmin = await dbReader.admin.create(adminObj)
        if (createAdmin) {

            // create admin permission
            let admin_permission_id = uuidv4();
            let permissionObj = {
                admin_permission_id: admin_permission_id,
                user_id: user_id,
                jewelry_read: true,
                jewelry_write: false,
                created_datetime: created_datetime,
                updated_datetime: updated_datetime,
            }
            await dbReader.adminPermissions.create(permissionObj)

        } else {
            throw new Error("Something went wrong.")
        }

        new SuccessResponse("register successfully.", {}).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

const login = async (req, res) => {
    try {

        let { email, password } = req.body

        let userData = await dbReader.admin.findOne({
            where: {
                email: email,
                is_deleted: 0
            }
        });
        userData = JSON.parse(JSON.stringify(userData))

        if (_.isEmpty(userData)) {
            throw new Error("user not found.")
        }

        const match = bcrypt.compareSync(password, userData.password); // true
        if (!match) {
            throw new Error("Invalid email or password.")
        }
        delete userData.password
        new SuccessResponse("Logged in successfully.", userData).send(res);

    } catch (e) {
        new BadRequestResponse(e.message).send(res)
    }
};

module.exports = {
    register,
    login,
};
