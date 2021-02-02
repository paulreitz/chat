const UserDB = require('../database/userdb');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destPath = process.env.DEV && process.env.DEV === 'true'
            ? path.join(__dirname, '..', '..', 'public', 'images', 'avatars')
            : path.join(__dirname, '..', '..', 'build', 'images', 'avatars');
        cb(null, destPath)
    },
    filename: (req, file, cb) => {
        const key = verifyToken(req.get('x-access-token'));
        const extension = file.originalname.split('.').pop();
        if (key) {
            const name = key.replace(/(-)/g, '');
            cb(null, `${name}.${extension}`);
        }
        else {
            cb(null, `unusable.${extension}`);
        }
    }
});

const verifyToken = (header) => {
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

const upload = multer({ storage: storage });

class UserController {
    constructor(router) {
        this.userDB = new UserDB();
        this.isDev = !!(process.env.DEV && process.env.DEV === 'true');
        this.avatarFolder = this.isDev
            ? path.join(__dirname, '..', '..', 'public', 'images', 'avatar')
            : path.join(__dirname, '..', '..', 'build', 'images', 'avatars')
        
        const userPath = '/user';
        router.route(`${userPath}/create`).post(this.create);
        router.route(`${userPath}/auth`).post(this.authenticate);
        router.route(`${userPath}/avatar`).post(upload.single('avatar'), this.updateAvatar);
        router.route(`${userPath}/display`).post(this.updateDisplayName);
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
                    res.status(200).send(result);
                }
            })
            .catch(error => {
                res.status(500).send({error});
            })
        }
        else {
            res.status(200).send({success: false, message: 'Missing Parameters'});
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
                    res.status(200).send(result);
                }
            })
        }
        else {
            res.status(200).send({success: false, message: 'Missing Parameters'});
        }
    }

    updateAvatar = (req, res) => {
        const key = verifyToken(req.get('x-access-token'));
        if (key) {
            if (req.file && req.file.filename) {
                this.userDB.updateAvatar(key, req.file.filename)
                .then(result => {
                    if (result.success) {
                        res.status(200).send(result);
                    }
                    else {
                        res.status(200).send(result);
                    }
                })
                .catch(error => {
                    res.status(200).send({error});
                }); 
            }
            else {
                res.status(200).send({success: false, message: 'Missing Parameters'});
            }
        }
        else {
            res.status(200).send({success: false, message: 'Unauthorized'});
        }
    }

    updateDisplayName = (req, res) => {
        const key = verifyToken(req.get('x-access-token'));
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
}

module.exports = UserController;