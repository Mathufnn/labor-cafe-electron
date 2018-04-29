const Sequelize = require('sequelize');
const remote = require('electron').remote;
const fs = require('fs');
const path = require('path');


//helper functions
const fatal_error = err => {remote.dialog.showErrorBox('Não foi possível conectar ao banco de dados!', err); remote.getCurrentWindow().close();}

//global vars/objects
var synchronized = false;
var models;

// main object
const backend = {
  install(Vue, options) {
    const sequelize = new Sequelize('sqlite:laborrural.db');


    // callbackhell.com f
    const sync = () => sequelize.sync().then(() => synchronized = true, err => fatal_error(err));
    const loadmodels = () => {
      models = require('./models')(sequelize, Sequelize);
      sync();
    }
    sequelize.authenticate().then(loadmodels, err => fatal_error(err));


    Vue.prototype.$backend = {
      addFazenda(fazendaObj){
        console.log(fazendaObj);
        return 123;
      }

    }

  }
}

export default backend
