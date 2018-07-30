<template>
  <v-card>
    <v-card-title class="headline">
      Indicadores do talhão
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">

          <v-flex xs4 v-for="i in indicadores" v-bind:key="i.text">
            <v-card :class="'status' + i.status">
              <b>{{i.text}}<!-- <v-btn small flat icon v-on:click="dialog = true, msg=i.help" style="text-align:right; float:right; margin:0;"><v-icon>help</v-icon></v-btn> --></b>
                <v-dialog max-width="290" v-model="dialog" :class="'status' + i.status">
                  <v-card>
                    <v-card-text>
                    <b>{{msg}}</b>
                    </v-card-text>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">FECHAR</v-btn>
                  </v-card>
                </v-dialog>
              <span class="indicator">{{formatN(i.value, i.decimals)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
import fs from 'fs'

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',decimals: 2, value: 0, unidade: 'R$/Ano', help: '' },
        ct: { text: 'CUSTO TOTAL (CT)', decimals: 2, value: 0, unidade: 'R$/Ano', help: ''},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        producao: { text: 'PRODUÇÃO',decimals: 0, value: 0, unidade: 'Sacas', help: '' },
        aplantada: { text: 'ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'Ha', help: '' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'Und/Ha', help: ''  },
        coeap: { text: 'COE POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        coeu: { text: 'COE POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        cotap: { text: 'COT POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        cotu: { text: 'COT POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        ctap: { text: 'CT POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: '' },
        ctu: { text: 'CT POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        mb: { text: 'MARGEM BRUTA', decimals: 2, value: 0, unidade: 'R$/Ano', help: ''  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        ml: { text: 'MARGEM LÍQUIDA',decimals: 2, value: 0, unidade: 'R$/Ano', help: ''  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        lucro: { text: 'LUCRO',decimals: 2, value: 0, unidade: 'R$/Ano', help: ''},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', decimals: 2, value: 0, unidade: 'R$/Ha', help: ''},
        lucrou: { text: 'LUCRO POR UNIDADE', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',decimals: 2, value: 0, unidade: '%', help: ''  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', decimals: 2, value: 0, unidade: '%', help: ''  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',decimals: 2, value: 0, unidade: 'R$', help: '' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', decimals: 2, value: 0, unidade: 'R$/Sc', help: '' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', decimals: 2, value: 0, unidade: 'R$/Sc', help: ''  },
        taxagiro: { text: 'TAXA DE GIRO', decimals: 2, value: 0, unidade: '%a.a', help: '' },
        lucrativ: { text: 'LUCRATIVIDADE', decimals: 2, value: 0, unidade: '%a.a', help: '' }
      },
      dialog: false,
      msg: ''
    }
  },
  props: {
    tid: {
      default: '-1'
    }
  },
  methods: {
    formatN(vr,minimium=2){
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR', {maximumFractionDigits: 2, minimumFractionDigits: minimium});
    }
  },
  mounted: function() {
    let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
    let CidadeTipoEstoque = require('./../cidades_estoque.json');


    this.$backend.getTalhao(this.tid, (talhaoObj) => {
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
      this.$backend.getFazenda(safraObj.FazendaID, (fazendaObj) => {
        let EstoqueCapital = estoqueCapitalObj[CidadeTipoEstoque[fazendaObj.Cidade]];


        //renda bruta
        this.indicadores.rendabruta.value = (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;
        //coe
        this.indicadores.coe.value = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
          talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
          + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

        //cot
        this.indicadores.cot.value = this.indicadores.coe.value + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);

        //ct
        this.indicadores.ct.value = this.indicadores.cot.value + (EstoqueCapital["remuneracao"] * talhaoObj.Area);

        //pcv
        this.indicadores.pcv.value = safraObj.PrecoVenda;

        //producao
        this.indicadores.producao.value = talhaoObj.ProdTotal;

        //aplantada
        this.indicadores.aplantada.value = talhaoObj.Area;

        //ppaplantada
        this.indicadores.ppaplantada.value = this.indicadores.producao.value / this.indicadores.aplantada.value;

        //coeap
        this.indicadores.coeap.value = this.indicadores.coe.value / this.indicadores.aplantada.value;

        //coeu
        this.indicadores.coeu.value = this.indicadores.coe.value / this.indicadores.producao.value;

        //cotap
        this.indicadores.cotap.value = this.indicadores.cot.value / this.indicadores.aplantada.value;

        //cotu
        this.indicadores.cotu.value = this.indicadores.cot.value / this.indicadores.producao.value;

        //ctap
        this.indicadores.ctap.value = this.indicadores.ct.value / this.indicadores.aplantada.value;

        //ctu
        this.indicadores.ctu.value = this.indicadores.ct.value / this.indicadores.producao.value;

        //mb
        this.indicadores.mb.value = this.indicadores.rendabruta.value - this.indicadores.coe.value;

        //mbap
        this.indicadores.mbap.value = this.indicadores.mb.value / this.indicadores.aplantada.value;


        this.indicadores.mbu.value = this.indicadores.mb.value / this.indicadores.producao.value;

        this.indicadores.ml.value = this.indicadores.rendabruta.value - this.indicadores.cot.value;

        this.indicadores.mlap.value = this.indicadores.ml.value / this.indicadores.aplantada.value;

        this.indicadores.mlu.value = this.indicadores.ml.value / this.indicadores.producao.value;

        this.indicadores.lucro.value = this.indicadores.rendabruta.value - this.indicadores.ct.value;

        this.indicadores.lucroap.value = this.indicadores.lucro.value / this.indicadores.aplantada.value;

        this.indicadores.lucrou.value = this.indicadores.lucro.value / this.indicadores.producao.value;

        this.indicadores.trcst.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area))*100 ;


        //verificar isso aqui
        //estou usando a área do talhao atual, contudo, parece que ela quer a área TOTAL DE TODOS TALHOES DA SAFRA
        this.indicadores.trcct.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN))*100 ;

        this.indicadores.bencusto.value = this.indicadores.rendabruta.value / this.indicadores.ct.value;

        this.indicadores.capitalest.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area) / this.indicadores.producao.value;

        this.indicadores.capitalct.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN ) / this.indicadores.producao.value;

        this.indicadores.taxagiro.value = ((this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value ) * 100;

        this.indicadores.lucrativ.value = (this.indicadores.mlu.value / this.indicadores.capitalct.value) * 100;

      });
      });
    });
//
  }


}
</script>

<style scoped>
  .indicator {
    font-size:25px;
  }

  .unidade {
    font-size:13px;
  }

  .status1 {
    background-color: #F08080;
  }

  .status2 {
    background-color: #FFEC8B;
  }

  .status3 {

  }

  .status4 {
    background-color: #98FB98;
  }
</style>
