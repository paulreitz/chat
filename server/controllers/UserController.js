const UserDB = require('../database/userdb');
const jwt = require('jsonwebtoken');

class UserController {
    constructor(router) {
        this.userDB = new UserDB();
        const path = '/user';
        router.route(`${path}/test`).get(this.test);
    }

    test = (req, res) => {
        res.status(200).send({success: true, message: 'Test successful.'});
    }

    create = (req, res) => {
        if (req.body && req.body.user && req.body.password && req.body.code) {
            this.userDB.createUser(req.body.user, req.body.password, req.body.code)
            .then(result => {
                if (result.success) {
                    const data = this.getUserObject(result);
                    res.status(200).send(data);
                }
                else {
                    res.status(422).send(result);
                }
            })
            .catch(error => {
                res.status(500).send({error});
            })
        }
        else {
            res.status(400).send({success: false, message: 'Missing Parameters'});
        }
    }

    getUserObject(data) {
        let userData = {
            success: true,
            name: data.name,
            displayName: data.display_name,
            avatar: data.avatar,
            key: data.user_key,
            createdAt: data.created_at
        };
        const token = jwt.sign(userData, process.env.SECRET);
        userData.token = token;
        return userData;
    }
}

module.exports = UserController;