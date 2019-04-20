const Sequelize = require('sequelize');

const database = new Sequelize(process.env.db, process.env.dbusername, process.env.dbpassword, {
    host: 'localhost',
    dialect: 'mariadb',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false
    }
});

const user = database.define('users', {
    userId: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    password: Sequelize.STRING(500)
})

module.exports = user