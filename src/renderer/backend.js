const Sequelize = require('sequelize');
const remote = require('electron').remote;
const fs = require('fs')

//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var models;

const sequelize = new Sequelize('sqlite:laborrural.db');

// callbackhell.com
const sync_estoque = () => fs.access('estoquecapital.json', fs.constants.F_OK, (err) => {
  if(err) {
    let estoqueCapitalObj = require('./estoque_repo/estoquecapital.json');
    fs.writeFile('estoquecapital.json', JSON.stringify(estoqueCapitalObj), (err) => {
      if(err) fatal_error('Não foi possível criar estoque de capital.');
      else backend.install.synced = true;
    });
  } else backend.install.synced = true;
});
const sync = () => sequelize.sync().then(() => sync_estoque(), err => fatal_error(err));
const loadmodels = () => {
  models = require('./models')(sequelize, Sequelize);
  sync();
}
sequelize.authenticate().then(loadmodels, err => fatal_error(err));

//Estoque de capital
//Cria o arquivo no diretorio root da aplicação



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

        getSafras(sids, callback){
          models.Safra.findAll({ where: {id: sids} })
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
            Fertilizantes: talhaoObj.Fertilizantes,
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
            Beneficios: talhaoObj.Beneficios,
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

        updateTalhao(Tid, tObj, Fid, Sid ,callback){
          this.getFazenda(Fid, () => {
            this.getTalhao(Tid, () => {
              if(tObj.fazenda_ident != "") {
                models.Fazenda.update(
                  {NomeFazenda: tObj.fazenda_ident},
                  {where: {id: Fid}}
                )
              }
              if(tObj.safra_ident != "") {
                models.Safra.update(
                  {IdentSafra: tObj.safra_ident},
                  {where: {id: Sid}}
                )
              }
              if(tObj.talhao_ident != "") {
                models.Talhao.update(
                  {NomeTalhao: tObj.talhao_ident},
                  {where: {id: Tid}}
                )
              }
              if(tObj.preco_venda != "") {
                models.Talhao.update(
                  {PrecoVenda: tObj.preco_venda},
                  {where: {id: Tid}}
                )
              }
              if(tObj.producao_total != "") {
                models.Talhao.update(
                  {ProdTotal: tObj.producao_total},
                  {where: {id: Tid}}
                )
              }
              if(tObj.area != "") {
                models.Talhao.update(
                  {Area: tObj.area},
                  {where: {id: Tid}}
                )
              }
              if(tObj.venda_subp != "") {
                models.Talhao.update(
                  {VendaSubP: tObj.venda_subp},
                  {where: {id: Tid}}
                )
              }
              if(tObj.mao_familiar != "") {
                models.Talhao.update(
                  {MaoObraF: tObj.mao_familiar},
                  {where: {id: Tid}}
                )
              }
              if(tObj.arrend_terra != "") {
                models.Talhao.update(
                  {ArrendamentoTerras: tObj.arrend_terra},
                  {where: {id: Tid}}
                )
              }
              if(tObj.aluguel_maq != "") {
                models.Talhao.update(
                  {AluguelMaquinas: tObj.aluguel_maq},
                  {where: {id: Tid}}
                )
              }
              if(tObj.combustivel != "") {
                models.Talhao.update(
                  {Combustivel: tObj.combustivel},
                  {where: {id: Tid}}
                )
              }
              if(tObj.manu_benf != "") {
                models.Talhao.update(
                  {ManutencaoBenf: tObj.manu_benf},
                  {where: {id: Tid}}
                )
              }
              if(tObj.manu_maq != "") {
                models.Talhao.update(
                  {ManutencaoMaq: tObj.manu_maq},
                  {where: {id: Tid}}
                )
              }
              if(tObj.energia != "") {
                models.Talhao.update(
                  {EnergiaEletrica: tObj.energia},
                  {where: {id: Tid}}
                )
              }
              if(tObj.frete != "") {
                models.Talhao.update(
                  {Frete: tObj.frete},
                  {where: {id: Tid}}
                )
              }
              if(tObj.impostos != "") {
                models.Talhao.update(
                  {Impostos: tObj.impostos},
                  {where: {id: Tid}}
                )
              }
              if(tObj.mao_contratada != "") {
                models.Talhao.update(
                  {MaoObraContratada: tObj.mao_contratada},
                  {where: {id: Tid}}
                )
              }
              if(tObj.mao_fixa != "") {
                models.Talhao.update(
                  {MaoObraFixa: tObj.mao_fixa},
                  {where: {id: Tid}}
                )
              }
              if(tObj.despesas_gerais != "") {
                models.Talhao.update(
                  {Despesas: tObj.despesas_gerais},
                  {where: {id: Tid}}
                )
              }
              if(tObj.ass_tec != "") {
                models.Talhao.update(
                  {Assistencia: tObj.ass_tec},
                  {where: {id: Tid}}
                )
              }
              if(tObj.certificacao != "") {
                models.Talhao.update(
                  {Certificacao: tObj.certificacao},
                  {where: {id: Tid}}
                )
              }
              if(tObj.analise_solo != "") {
                models.Talhao.update(
                  {AnaliseSolo: tObj.analise_solo},
                  {where: {id: Tid}}
                )
              }
              if(tObj.analise_foliar != "") {
                models.Talhao.update(
                  {AnaliseFoliar: tObj.analise_foliar},
                  {where: {id: Tid}}
                )
              }
              if(tObj.epi != "") {
                models.Talhao.update(
                  {EPi: tObj.epi},
                  {where: {id: Tid}}
                )
              }
              if(tObj.acidos != "") {
                models.Talhao.update(
                  {Acidos: tObj.acidos},
                  {where: {id: Tid}}
                )
              }
              if(tObj.adubos != "") {
                models.Talhao.update(
                  {Adubos: tObj.adubos},
                  {where: {id: Tid}}
                )
              }
              if(tObj.acaricida != "") {
                models.Talhao.update(
                  {Acaricida: tObj.acaricida},
                  {where: {id: Tid}}
                )
              }
              if(tObj.bactericida != "") {
                models.Talhao.update(
                  {Bactericida: tObj.bactericida},
                  {where: {id: Tid}}
                )
              }
              if(tObj.espalhante != "") {
                models.Talhao.update(
                  {Espalhante: tObj.espalhante},
                  {where: {id: Tid}}
                )
              }
              if(tObj.fungicida != "") {
                models.Talhao.update(
                  {Fungicida: tObj.fungicida},
                  {where: {id: Tid}}
                )
              }
              // if(tObj.inseticida != "") {
              //   models.Talhao.update(
              //     {Inseticida: tObj.inseticida},
              //     {where: {id: Tid}}
              //   )
              // }
              if(tObj.nematicida != "") {
                models.Talhao.update(
                  {Nematicida: tObj.nematicida},
                  {where: {id: Tid}}
                )
              }
              if(tObj.oleo_mineral != "") {
                models.Talhao.update(
                  {OleoMineral: tObj.oleo_mineral},
                  {where: {id: Tid}}
                )
              }
              if(tObj.herbicida != "") {
                models.Talhao.update(
                  {Herbicida: tObj.herbicida},
                  {where: {id: Tid}}
                )
              }
              if(tObj.hormonios != "") {
                models.Talhao.update(
                  {Hormonios: tObj.hormonios},
                  {where: {id: Tid}}
                )
              }
              if(tObj.maturadores != "") {
                models.Talhao.update(
                  {Maturadores: tObj.maturadores},
                  {where: {id: Tid}}
                )
              }
              if(tObj.material_colheita != "") {
                models.Talhao.update(
                  {MaterialColheita: tObj.material_colheita},
                  {where: {id: Tid}}
                )
              }
              if(tObj.armazenamento != "") {
                models.Talhao.update(
                  {Armazenamento: tObj.armazenamento},
                  {where: {id: Tid}}
                )
              }
              if(tObj.beneficio != "") {
                models.Talhao.update(
                  {Beneficios: tObj.beneficio},
                  {where: {id: Tid}}
                )
              }
              if(tObj.gas_lenha != "") {
                models.Talhao.update(
                  {GasLenhaCarvao: tObj.gas_lenha},
                  {where: {id: Tid}}
                )
              }
              if(tObj.materiais_colheita != "") {
                models.Talhao.update(
                  {PosColheita: tObj.materiais_colheita},
                  {where: {id: Tid}}
                )
              }
              if(tObj.rebeneficio != "") {
                models.Talhao.update(
                  {Rebeneficio: tObj.rebeneficio},
                  {where: {id: Tid}}
                )
              }
              if(tObj.embalagens != "") {
                models.Talhao.update(
                  {Saco: tObj.embalagens},
                  {where: {id: Tid}}
                )
              }
              if(tObj.corretagem != "") {
                models.Talhao.update(
                  {Correntagem: tObj.corretagem},
                  {where: {id: Tid}}
                )
              }
            })
          })

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
        },

        doImportEstoque(data, callback){
          fs.writeFile('estoquecapital.json', JSON.stringify(data), err => callback(err));
        }

      }
    }
  }

  export default backend
