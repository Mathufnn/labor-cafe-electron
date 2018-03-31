const {remote} = require('electron');
const fs = require('fs');
const os = require("os");
const funcs = require('./app/js/funcs');
const {ipcRenderer} = require('electron');

var maximized = false;


$( document ).ready(() => {
  funcs.loading(false);
  funcs.load_simple_view("Início", "modules/index.html");
});



$( "#app_close" ).click(() => {
  window.close();
});

$( "#app_minimize" ).click(() => {
  remote.BrowserWindow.getFocusedWindow().minimize();
});

$( "#app_maximize" ).click(() => {
  if(maximized) {
    remote.BrowserWindow.getFocusedWindow().unmaximize();
    maximized=false;
  } else {
    remote.BrowserWindow.getFocusedWindow().maximize();
    maximized=true;
  }
});
