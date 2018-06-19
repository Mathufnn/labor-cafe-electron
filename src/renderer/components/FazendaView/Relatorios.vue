<template>
  <v-card>
    <v-card-title class="headline">
      Relatórios
      <v-tooltip right>
          <v-btn small color="info" slot="activator" v-on:click="preview" ><v-icon center dark>description</v-icon>  GERAR RELATÓRIO</v-btn>
          <span>Gerar Relatório PDF</span>
          <v-card v-if="load">
            <v-card-actions>
              <v-spacer></v-spacer>

            </v-card-actions>
          </v-card>
      </v-tooltip>
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <v-flex>
        lorem ipsum
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { BrowserWindow, remote } from 'electron'
import indicadores from './Indicadores.vue'

export default {
  data: () => ({
    load: false,

  }),
  props: {
    fid: {
      default: '-1'
    }
  },
  methods: {
    preview: function() {
      var pdf = require('pdfkit');
      var fs = require('fs');

      var myDoc = new pdf;

      myDoc.pipe(fs.createWriteStream('Relatório.pdf'));

      myDoc.font('Times-Roman')
      myDoc.fontSize(40)
      myDoc.text('Relatório da Safra ')
           .fontSize(25)
           .text('Indicadores: ')
           .fontSize(18)
           .text('RENDA BRUTA: ' + 0)
           .text('CUSTO OPERACIONAL EFETIVO (COE): ' + 0)
           .text('CUSTO OPERACIONAL TOTAL (COT): ' + 0)
           .text('CUSTO TOTAL (CT): ' + 0)
           .text('PREÇO MÉDIO DE VENDA: ' + 0)
           .text('PRODUÇÃO: ' + 0)
           .text('ÁREA PLANTADA: ' + 0)
           .text('PRODUÇÃO POR ÁREA PLANTADA: ' + 0)
           .text('COE POR ÁREA PLANTADA: ' + 0)
           .text('COE POR UNIDADE: ' + 0)
           .text('COT POR ÁREA PLANTADA: ' + 0)
           .text('COT POR UNIDADE: ' + 0)
           .text('CT POR ÁREA PLANTADA: ' + 0)
           .text('CT POR UNIDADE: ' + 0)
           .text('MARGEM BRUTA: ' + 0)
           .text('MARGEM BRUTA POR ÁREA PLANTADA: ' + 0)
           .text('MARGEM BRUTA POR UNIDADE: ' + 0)
           .text('MARGEM LÍQUIDA: ' + 0)
           .text('MARGEM LÍQUIDA POR ÁREA PLANTADA: ' + 0)
           .text('MARGEM LÍQUIDA POR UNIDADE: ' + 0)
           .text('LUCRO: ' + 0)
           .text('LUCRO POR ÁREA PLANTADA: ' + 0)
           .text('LUCRO POR UNIDADE: ' + 0)
           .text('TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA: ' + 0)
           .text('TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA: ' + 0)
           .text('RELAÇÃO BENEFÍCIO/CUSTO: ' + 0)
           .text('CAPITAL EMPATADO SEM TERRA: ' + 0)
           .text('CAPITAL EMPATADO COM TERRA: ' + 0)
           .text('TAXA DE GIRO: ' + 0)
           .text('LUCRATIVIDADE: ' + 0)




      myDoc.end();
      //console.log(this.indicadores.rendabruta.value);
      this.load = !this.load;
    },
  }

 }
</script>

<style scoped>

</style>
