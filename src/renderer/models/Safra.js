module.exports = function(sequelize, DataTypes) {
	var Safra = sequelize.define('Safra',	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		IdentSafra: DataTypes.STRING,
		AreaProducao: DataTypes.INTEGER,
		PrecoMTerraN: DataTypes.INTEGER,
		ProducaoTotal: DataTypes.INTEGER,
		PrecoVenda: DataTypes.INTEGER
	},
	{
		indexes: [{fields: ['id']}]
	});

	return Safra;
}
