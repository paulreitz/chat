const Pool = require('pg').Pool;
const config = require('./dbConfig');

class UserDB {
    constructor() {
        this.pool = new Pool(config);
    }

    createUser = (userName, password, activationCode) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT createUser('${userName}', '${password}', '${activationCode}');`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].createUser);
            });
        });
    }

    authenticate = (userName, password) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT loginUser('${userName}', '${password}');`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].loginUser);
            });
        });
    }

    updateAvatar = (userKey, newAvatar) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT updateAvatar('${userKey}', '${newAvatar}');`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].updateAvatar);
            });
        });
    }

    updateDisplayName = (userKey, displayName) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT updateDisplayName('${userKey}', '${displayName}');`;
            this.pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result.rows[0].updateDisplayName);
            })
        })
    }
}

module.exports = UserDB;