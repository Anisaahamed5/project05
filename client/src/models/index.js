const sequelize = new Sequelize('project05', 'admin', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;