const Sequelize = require('sequelize');
const remote = require('electron').remote;

//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var synchronized = false;
var models;

// main object
const backend = {
  install(Vue, options) {
    const sequelize = new Sequelize('sqlite:laborrural.db');


    // callbackhell.com
    const sync = () => sequelize.sync().then(() => synchronized = true, err => fatal_error(err));
    const loadmodels = () => {
      models = require('./models')(sequelize, Sequelize);
      sync();
    }
    sequelize.authenticate().then(loadmodels, err => fatal_error(err));


    Vue.prototype.$backend = {
      //os métodos devem ter callbacks. O nodejs é por natureza non blocking pra I/O
      //para evitar divergencias e erros é recomendando sempre usar funções assicronas com callbacks pra operacoes I/O

      //lembrar de modularizar essas funções

      addFazenda(fazendaObj, callback=null){
        models.Fazenda.create({
          NomeFazenda: fazendaObj.nome_fazenda,
          SistemaProducao: fazendaObj.sistema_producao=='Irrigado'?1:2,
          Agronegocio: fazendaObj.agronegocio,
          Cidade: fazendaObj.cidade
        })
        .then(fazenda_created => callback(fazenda_created));
      },

      getAllFazendas(callback){
        models.Fazenda.findAll()
        .then(all_fazendas => callback(all_fazendas));
      },

      getFazenda(fid, callback){
        models.Fazenda.findOne({ where: {id: fid} })
        .then(fazenda => callback(fazenda));
      },

      // /==================================================/

      addSafra(safraObj, callback=null){
        models.Safra.create({
          FazendaID: safraObj.FazendaID,
          IdentSafra: safraObj.IdentSafra,
      		AreaProducao: safraObj.AreaProducao,
      		PrecoMTerraN: safraObj.PrecoMTerraN,
      		ProducaoTotal: safraObj.ProducaoTotal,
      		PrecoVenda: safraObj.PrecoVenda
        })
        .then(safra_created => callback(safra_created));
      },

      getFazendaSafras(fazendaid, callback){
        models.Safra.findAll({ where: {FazendaID: fazendaid} })
        .then(safra => callback(safra));
      },

      getSafra(fid, callback){
        models.Safra.findOne({ where: {id: fid} })
        .then(safra => callback(safra));
      },


      // /==================================================/


      addTalhao(talhaoObj, callback=null){
        models.Talhao.create({
          SafraID: talhaoObj.SafraID,
          NomeTalhao: talhaoObj.NomeTalhao,
          ProdTotal: talhaoObj.ProdTotal,
          Area: talhaoObj.Area,
          VendaSubP: talhaoObj.VendaSubP,
          MaoObraF: talhaoObj.MaoObraF,
          ArrendamentoTerras: talhaoObj.ArrendamentoTerras,
          AluguelMaquinas: talhaoObj.AluguelMaquinas,
          Combustivel: talhaoObj.Combustivel,
          ManutencaoBenf: talhaoObj.ManutencaoBenf,
          ManutencaoMaq: talhaoObj.ManutencaoMaq,
          EnergiaEletrica: talhaoObj.EnergiaEletrica,
          Frete: talhaoObj.Frete,
          Impostos: talhaoObj.Impostos,
          MaoObraContratada: talhaoObj.MaoObraContratada,
          MaoObraFixa: talhaoObj.MaoObraFixa,
          Despesas: talhaoObj.Despesas,
          Assistencia: talhaoObj.Assistencia,
          Certificacao: talhaoObj.Certificacao,
          AnaliseSolo: talhaoObj.AnaliseSolo,
          AnaliseFoliar: talhaoObj.AnaliseFoliar,
          EPi: talhaoObj.EPi,
          Acidos: talhaoObj.Acidos,
          Adubos: talhaoObj.Adubos,
          Acaricida: talhaoObj.Acaricida,
          Bactericida: talhaoObj.Bactericida,
          Espalhante: talhaoObj.Espalhante,
          Fungicida: talhaoObj.Fungicida,
          Inseticida: talhaoObj.Inseticida,
          Nematicida: talhaoObj.Nematicida,
          OleoMineral: talhaoObj.OleoMineral,
          Herbicida: talhaoObj.Herbicida,
          Hormonios: talhaoObj.Hormonios,
          Maturadores: talhaoObj.Maturadores,
          MaterialColheita: talhaoObj.MaterialColheita,
          Armazenamento: talhaoObj.Armazenamento,
          Benficios: talhaoObj.Beneficios,
          GasLenhaCarvao: talhaoObj.GasLenhaCarvao,
          PosColheita: talhaoObj.PosColheita,
          Rebeneficio: talhaoObj.Rebeneficio,
          Saco: talhaoObj.Saco,
          Correntagem: talhaoObj.Correntagem
        })
        .then(talhao_created => callback(talhao_created));
      },

      getTalhao(talhaoid, callback){
        models.Talhao.findOne({where: {id: talhaoid} })
        .then(talhao => callback(talhao));
      },

      getSafraTalhao(safraid, callback){
        models.Talhao.findAll({ where: {SafraID: safraid} })
        .then(talhao => callback(talhao));
      }

    }
  }
}

export default backend
