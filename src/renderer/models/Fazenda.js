module.exports = function(sequelize, DataTypes) {
	var Fazenda = sequelize.define('Fazenda',	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		NomeFazenda: DataTypes.STRING,
		SistemaProducao: DataTypes.INTEGER,
		Agronegocio: DataTypes.STRING,
		Cidade: DataTypes.STRING
	},
	{
		indexes: [{fields: ['id']}]
	});

	return Fazenda;
}
