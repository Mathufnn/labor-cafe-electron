//Como o webpack n da suporte ao sequelize.import nao eh possivel fazer a importacao dos models dinamicamente
//temos que fazer estaticamente
// https://github.com/sequelize/sequelize/issues/7600 / https://github.com/sequelize/sequelize/issues/4974
module.exports = function(sequelize, DataTypes) {
	var models = {}
	models.Fazenda = require('./Fazenda')(sequelize, DataTypes);
	return models;
}
