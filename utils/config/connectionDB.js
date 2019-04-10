var Sequelize       = require('sequelize');

var config          = require('../constan/databaseConstant');

var sequelize       = new Sequelize(
                        config.database,
                        config.username,
                        config.password,{
                            host: config.host,
                            port: config.port,
                            dialect: config.dialec,
                            logging: false,
                            freezeTableName: true,
                            operatorsAliases: false,
                            define: {
                                timestamps: false
                            }
                        }
                    );

                    sequelize.authenticate().then(function(err){
    if(err)
        console.log('There is connection in ERROR');
    
    console.log('Connection has been estabiled successfully');
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
};
