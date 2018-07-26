module.exports = function(sequelize, DataTypes) {
  var Talhao = sequelize.define('Talhao', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    SafraID: DataTypes.INTEGER,
    NomeTalhao: DataTypes.STRING,
    ProdTotal: DataTypes.INTEGER,
    Area: DataTypes.INTEGER,
    PrecoVenda: DataTypes.INTEGER,
    VendaSubP: DataTypes.INTEGER,
    MaoObraF: DataTypes.INTEGER,
    ArrendamentoTerras: DataTypes.INTEGER,
    AluguelMaquinas: DataTypes.INTEGER,
    Combustivel: DataTypes.INTEGER,
    ManutencaoBenf: DataTypes.INTEGER,
    ManutencaoMaq: DataTypes.INTEGER,
    EnergiaEletrica: DataTypes.INTEGER,
    Frete: DataTypes.INTEGER,
    Impostos: DataTypes.INTEGER,
    MaoObraContratada: DataTypes.INTEGER,
    MaoObraFixa: DataTypes.INTEGER,
    Despesas: DataTypes.INTEGER,
    Assistencia: DataTypes.INTEGER,
    Certificacao: DataTypes.INTEGER,
    AnaliseSolo: DataTypes.INTEGER,
    AnaliseFoliar: DataTypes.INTEGER,
    EPi: DataTypes.INTEGER,
    Fertilizantes: DataTypes.INTEGER,
    Acidos: DataTypes.INTEGER,
    Adubos: DataTypes.INTEGER,
    Acaricida: DataTypes.INTEGER,
    Bactericida: DataTypes.INTEGER,
    Espalhante: DataTypes.INTEGER,
    Fungicida: DataTypes.INTEGER,
    Inseticida: DataTypes.INTEGER,
    Nematicida: DataTypes.INTEGER,
    OleoMineral: DataTypes.INTEGER,
    Herbicida: DataTypes.INTEGER,
    Hormonios: DataTypes.INTEGER,
    Maturadores: DataTypes.INTEGER,
    MaterialColheita: DataTypes.INTEGER,
    Armazenamento: DataTypes.INTEGER,
    Beneficios: DataTypes.INTEGER,
    GasLenhaCarvao: DataTypes.INTEGER,
    PosColheita: DataTypes.INTEGER,
    Rebeneficio: DataTypes.INTEGER,
    Saco: DataTypes.INTEGER,
    Correntagem: DataTypes.INTEGER
  },
  {
    indexes: [{ fields: ['id', 'SafraID']}]
  });

  return Talhao;
}
