const Sequelize = require('sequelize');
const remote = require('electron').remote;

//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var models;

const sequelize = new Sequelize('sqlite:laborrural.db');

// callbackhell.com
const sync = () => sequelize.sync().then(() => backend.install.synced = true, err => fatal_error(err));
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
}
sequelize.authenticate().then(loadmodels, err => fatal_error(err));

// main object
const backend = {
  install: (Vue, options) => {
    Vue.prototype.$backend = {
      //os métodos devem ter callbacks. O nodejs é por natureza non blocking pra I/O
      //para evitar divergencias e erros é recomendando sempre usar funções assicronas com callbacks pra operacoes I/O

      //lembrar de modularizar essas funções
      synced: false,




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

      deleteFazenda(fid, callback){
        this.getFazendaSafras(fid, all_safras => {
          if(all_safras!=null)
          all_safras.forEach(safraObj => {
            this.deleteSafra(safraObj.id, () => null);
          });

          //sim nao estou esperando a callback. teria que usar promises.all. nao temos tempo pra isso
          //só dara problema se tiver algumas milhares de linhas de safra/talhao
          models.Fazenda.destroy({ where: {id: fid} })
          .then(() => callback());
          });
      },


        // /==================================================/

        addSafra(safraObj, callback=null){
          Object.keys(safraObj).forEach(function(key) {
            if(key=="IdentSafra" || key=="FazendaID") return;
            if(safraObj[key]=='') safraObj[key] = 0;
          });

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

        deleteSafra(sid, callback){
          models.Talhao.destroy({ where: {SafraID: sid} })
          .then(() => {
            models.Safra.destroy({ where: {id: sid} })
            .then(() => callback());
          });
        },

        // /==================================================/

        addTalhao(talhaoObj, callback=null){
          Object.keys(talhaoObj).forEach(function(key) {
            if(key=="SafraID" || key=="NomeTalhao") return;
            if(talhaoObj[key]=='') talhaoObj[key] = 0;
          });

          models.Talhao.create({
            SafraID: talhaoObj.SafraID,
            NomeTalhao: talhaoObj.NomeTalhao,
            ProdTotal: talhaoObj.ProdTotal,
            Area: talhaoObj.Area,
            PrecoVenda: talhaoObj.PrecoVenda,
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
        },

        deleteTalhao(talhaoid, callback){
          models.Talhao.destroy({ where: {id: talhaoid} })
          .then(() => callback());
        },

        //==============================================================/

        ClearEverything(callback){ //CUIDADO ATTETION WARNINGG ATTECION ATETUTE JOEL
          models.Fazenda.destroy({
            truncate: true
          }).then(() => {
            models.Safra.destroy({
              truncate: true
            }).then(() => {
              models.Talhao.destroy({
                truncate: true
              }).then(() => {
                callback();
              });
            });
          });
        },

        dogetBackupData(callback){
          let bdata = {};

          //callbackhellllllllllllllll
          models.Fazenda.findAll()
          .then(all_fazendas => {
            bdata.Fazenda = all_fazendas;
            models.Safra.findAll()
            .then(all_safras => {
              bdata.Safra = all_safras;
              models.Talhao.findAll()
              .then(all_talhao => {
                bdata.Talhao = all_talhao;
                callback(JSON.stringify(bdata));
              });
            });
          });
        },

        getHighestIDs(callback){
          Promise.all([models.Fazenda.max('id'),models.Safra.max('id'),models.Talhao.max('id')]).then((result) => { callback(result) });
        },

        doimportBackup(data, reorderids, callback){
          let promises = [];
          this.getHighestIDs((hids) => {

            //coeficientes
            let coef_faz = isNaN(hids[0])?0:hids[0]+1;
            let coef_safra = isNaN(hids[0])?0:hids[1]+1;
            let coef_talhao = isNaN(hids[0])?0:hids[2]+1;

            data.Fazenda.forEach((itm) => {
              if(reorderids) {
                itm.id += coef_faz;
              }
              promises.push(models.Fazenda.create(itm));
            });

            data.Safra.forEach((itm) => {
              if(reorderids) {
                itm.id += coef_safra;
                itm.FazendaID += coef_faz;
              }
              promises.push(models.Safra.create(itm));
            });

            data.Talhao.forEach((itm) => {
              if(reorderids) {
                itm.id += coef_talhao;
                itm.SafraID += coef_safra;
              }
              promises.push(models.Talhao.create(itm));
            });

            Promise.all(promises).then(() => callback(true)).catch(() => callback(false));
          });
        }

      }
    }
  }

  export default backend
