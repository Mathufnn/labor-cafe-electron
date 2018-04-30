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
          IdentSafra: safraObj.IdentSafra,
      		AreaProducao: safraObj.AreaProducao,
      		PrecoMTerraN: safraObj.PrecoMTerraN,
      		ProducaoTotal: safraObj.ProducaoTotal,
      		PrecoVenda: safraObj.PrecoVenda
        })
        .then(safra_created => callback(safra_created));
      }



    }

  }
}

export default backend
