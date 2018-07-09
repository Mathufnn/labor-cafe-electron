<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs12 >
      <v-card>
        <v-card-title class="headline">
          Importar estoque de capital
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm12>
                Você pode importar um estoque de capital atualizado. <br />
                Acessando <a @click="openLBR">https://www.laborrural.com/paginas/estoque_cafe</a>, você pode baixar um arquivo com o estoque de capital atualizado para o ano atual.<br />
                Após realizar o download do arquivo você poderá importá-lo abaixo.
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions >
          <v-flex xs12 text-xs-center>
            <v-btn v-if="!loading" block color="primary" large  v-on:click="doimportE">IMPORTAR ESTOQUE</v-btn>
            <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="green"></v-progress-circular>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { remote, shell } from 'electron'
import fs from 'fs'

export default {
  data: () => ({
    loading: false,
    deletaall: false,
  }),
  methods:{
    openLBR: function() {
      shell.openExternal('https://www.laborrural.com/paginas/estoque_cafe');
    },
    doimportE: function() {
      remote.dialog.showOpenDialog({title: 'Selecione local do arquivo de estoque de capital', filters: [{name: 'Estoque_Cafe', extensions:['json']}] }, (filename) => {
        if(typeof filename == 'undefined') return;
        this.loading = true;
        fs.readFile(filename[0], (err, data) => {
          if (err) {
            remote.dialog.showErrorBox('Erro ao abrir arquivo!', 'Não foi possível abrir o arquivo.');
            return;
          }

          let i_obj;

          try {
            i_obj = JSON.parse(data);
          }
          catch(e) {
            this.loading = false;
            remote.dialog.showErrorBox('Arquivo inválido!', 'O arquivo é inválido!. 1');
            return;
          }

          if(typeof i_obj.Cerrado=='undefined' || typeof i_obj['Sul de Minas']=='undefined' || typeof i_obj['Matas de Minas']=='undefined') {
            this.loading = false;
            remote.dialog.showErrorBox('Arquivo inválido!', 'O arquivo é inválido!. 2');
            return;
          }


          this.$backend.doImportEstoque(i_obj, (deu) => {
            console.log(deu);
            if (deu) remote.dialog.showErrorBox('Erro ao importar o estoque!', 'O estoque de capital não foi importado corretamente!');
            else remote.dialog.showMessageBox({type:'info', title:'Estoque de capital importado com sucesso!', message: 'O estoque de capital foi importado para a aplicação com sucesso!'});
            this.loading = false;
          });




        });
      });
    }
  }
}
</script>

<style scoped>

</style>
