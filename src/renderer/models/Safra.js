module.exports = function(sequelize, DataTypes) {
	var Safra = sequelize.define('Safra',	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		FazendaID: DataTypes.INTEGER,
		IdentSafra: DataTypes.STRING,
		AreaProducao: DataTypes.INTEGER,
		PrecoMTerraN: DataTypes.INTEGER,
		ProducaoTotal: DataTypes.INTEGER,
		PrecoVenda: DataTypes.INTEGER
	},
	{
		indexes: [{fields: ['id', 'FazendaID']}]
	});

	return Safra;
}
