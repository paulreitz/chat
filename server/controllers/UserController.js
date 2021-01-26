const UserDB = require('../database/userdb');
const jwt = require('jsonwebtoken');

class UserController {
    constructor(router) {
        this.userDB = new UserDB();
        const path = '/user';
        router.route(`${path}/create`).post(this.create);
        router.route(`${path}/auth`).post(this.authenticate);
        router.route(`${path}/avatar`).post(this.updateAvatar);
        router.route(`${path}/display`).post(this.updateDisplayName);
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

    authenticate = (req, res) => {
        if (req.body && req.body.user && req.body.password) {
            this.userDB.authenticate(req.body.user, req.body.password)
            .then(result => {
                if (result.success) {
                    const data = this.getUserObject(result);
                    res.status(200).send(data);
                }
                else {
                    res.status(403).send(result);
                }
            })
        }
        else {
            res.status(400).send({success: false, message: 'Missing Parameters'});
        }
    }

    updateAvatar = (req, res) => {
        const key = this.verifyToken(req.get('x-access-token'));
        if (key) {
            if (req.body && req.body.avatar) {
                this.userDB.updateAvatar(key, req.body.avatar)
                .then(result => {
                    if (result.success) {
                        res.status(200).send(result);
                    }
                    else {
                        res.status(403).send(result);
                    }
                })
                .catch(error => {
                    res.status(500).send({error});
                }); 
            }
            else {
                res.status(400).send({success: false, message: 'Missing Parameters'});
            }
        }
        else {
            res.status(403).send({success: false, message: 'Unauthorized'});
        }
    }

    updateDisplayName = (req, res) => {
        const key = this.verifyToken(req.get('x-access-token'));
        if (key) {
            if (req.body && req.body.display) {
                this.userDB.updateDisplayName(key, req.body.display)
                .then(result => {
                    if (result.success) {
                        res.status(200).send(result);
                    }
                    else {
                        res.status(403).send(result);
                    }
                })
                .catch(error => {
                    res.status(500).send({error});
                });
            }
            else {
                res.status(400).send({success: false, message: 'Missing Parameters'});
            }
        }
        else {
            res.status(403).send({success: false, message: 'Unauthorized'});
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

    verifyToken(header) {
        let token = header.split(' ')[1];
        let key;
        try {
            key = jwt.verify(token, process.env.SECRET).key;
        }
        catch(err) {
            key = null;
        }
        return key;
    }
}

module.exports = UserController;