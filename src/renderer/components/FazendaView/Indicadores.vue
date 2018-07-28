<template>
  <v-card>
    <v-card-title class="headline">
      Indicadores da fazenda
    </v-card-title>
    <v-divider></v-divider>
    <v-layout>
      <v-container row wrap justify-space-around>
        <v-layout row wrap class="text-xs-center">
          <v-flex xs4 v-for="i in indicadores" v-bind:key="i.text">
            <v-card :class="'status' + i.status">
              <b>{{i.text}} <v-btn flat icon v-on:click="dialog = true, msg=i.help"><v-icon>help</v-icon></v-btn></b>
              <v-dialog max-width="290" v-model="dialog" :class="'status' + i.status">
                <v-card>
                  <v-card-text>
                    <b>{{msg}}</b>
                  </v-card-text>
                  <v-btn color="green darken-1" flat="flat" @click="dialog = false">FECHAR</v-btn>
                </v-card>
              </v-dialog>
              <span class="indicator">{{formatN(i.value)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
import fs from 'fs'
import path from 'path'
import { remote } from 'electron'

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', status: 3, value: 0, unidade: 'R$/Ano', help: 'Renda Bruta é o somatório de (Produção Total x Preço de Venda).' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: 0, unidade: 'R$/Ano', help: 'O Custo Operacional Efetivo é calculado pelo somatório de todas despesas.' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: 0, unidade: 'R$/Ano', help: 'O Custo Operacional Total é calculado pelo somatório do COE + Mão de Obra Familiar + Capital Estoque Depreciação.' },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 0, unidade: 'R$/Ano', help: 'O Custo Total é calculado pelo soma do COT + Capital Estoque Remuneração de Capital.'},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: 0, unidade: 'R$/Sc', help: '4' },
        producao: { text: 'PRODUÇÃO',status: 3, value: 0, unidade: 'Sacas', help: '5' },
        aplantada: { text: 'ÁREA PLANTADA', status: 3, value: 0, unidade: 'Ha', help: '6' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'Und/Ha', help: '7'  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '8' },
        coeu: { text: 'COE POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '9'  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '10' },
        cotu: { text: 'COT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '11' },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '12' },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '13' },
        mb: { text: 'MARGEM BRUTA', status: 3, value: 0, unidade: 'R$/Ano', help: '14'  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '15'  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '16' },
        ml: { text: 'MARGEM LÍQUIDA',status: 3, value: 0, unidade: 'R$/Ano', help: '17'  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '18'},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: 0, unidade: 'R$/Sc', help: '19'  },
        lucro: { text: 'LUCRO',status: 3, value: 0, unidade: 'R$/Ano', help: '20'},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '21'},
        lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '22'  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: 0, unidade: '%', help: '23'  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: 0, unidade: '%', help: '24'  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: 0, unidade: 'R$', help: '25' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 0, unidade: 'R$/Sc', help: '26' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 0, unidade: 'R$/Sc', help: '27'  },
        taxagiro: { text: 'TAXA DE GIRO', status: 3, value: 0, unidade: '%a.a', help: '28' },
        lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: 0, unidade: '%a.a', help: '29' }
      },
      dialog: false,
      msg: ''
    }
  },
  props: {
    fid: {
      default: '0'
    },
    checkeds: {
      default: []
    }
  },
  methods: {
    formatN(vr){
      return parseFloat(vr.toFixed(2)).toLocaleString('pt-BR');
      // return vr;
    },
    geraIndicadores(SafraIDs){
      let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
      let CidadeTipoEstoque = require('./../cidades_estoque.json');

      Object.keys(this.indicadores).forEach(key => {
        this.indicadores[key].value = 0;
      });

      this.$backend.getFazenda(this.fid, (fazendaObj) => {
        let EstoqueCapital = estoqueCapitalObj[CidadeTipoEstoque[fazendaObj.Cidade]];
        this.$backend.getSafras(this.checkeds, safras => {
          let SafraCount = 0;
          if(safras!=null)
          safras.forEach(safraObj => {
            SafraCount++;
            //PRECO MEDIO DE VENDA
            //EH MEDIA, TEM QUE DIVIDR DEPOIS
            this.indicadores.pcv.value += safraObj.PrecoVenda;

            this.$backend.getSafraTalhao(safraObj.id, (talhoes) => {
              if(talhoes!=null)
              talhoes.forEach(talhaoObj => {
                let IndicadoresTalhao = {};
                //renda bruta
                this.indicadores.rendabruta.value += (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;
                IndicadoresTalhao.rendabruta = (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;

                //coe
                this.indicadores.coe.value += talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

                IndicadoresTalhao.coe = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;


                //cot
                this.indicadores.cot.value += IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);
                IndicadoresTalhao.cot = IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);

                //ct
                this.indicadores.ct.value += IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);
                IndicadoresTalhao.ct = IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);

                //producao
                this.indicadores.producao.value += talhaoObj.ProdTotal;
                IndicadoresTalhao.producao = talhaoObj.ProdTotal;

                //aplantada
                this.indicadores.aplantada.value += talhaoObj.Area;
                IndicadoresTalhao.aplantada = talhaoObj.Area;

                //ppaplantada
                this.indicadores.ppaplantada.value = this.indicadores.producao.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.ppaplantada = IndicadoresTalhao.producao / IndicadoresTalhao.aplantada;

                //coeap
                this.indicadores.coeap.value = this.indicadores.coe.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.coeap = IndicadoresTalhao.coe / IndicadoresTalhao.aplantada;

                //coeu
                this.indicadores.coeu.value = this.indicadores.coe.value / this.indicadores.producao.value;
                IndicadoresTalhao.coeu = IndicadoresTalhao.coe / IndicadoresTalhao.producao;

                //cotap
                this.indicadores.cotap.value = this.indicadores.cot.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.cotap = IndicadoresTalhao.cot / IndicadoresTalhao.aplantada;

                //cotu
                this.indicadores.cotu.value = this.indicadores.cot.value / this.indicadores.producao.value;
                IndicadoresTalhao.cotu = IndicadoresTalhao.cot / IndicadoresTalhao.producao;

                //ctap
                this.indicadores.ctap.value = this.indicadores.ct.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.ctap = IndicadoresTalhao.ct / IndicadoresTalhao.aplantada;

                //ctu
                this.indicadores.ctu.value = this.indicadores.ct.value / this.indicadores.producao.value;
                IndicadoresTalhao.ctu = IndicadoresTalhao.ct / IndicadoresTalhao.producao;

                //mb
                this.indicadores.mb.value = this.indicadores.rendabruta.value - this.indicadores.coe.value;
                IndicadoresTalhao.mb = IndicadoresTalhao.rendabruta - IndicadoresTalhao.coe;

                //mbap
                this.indicadores.mbap.value = this.indicadores.mb.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.mbap  = IndicadoresTalhao.mb / IndicadoresTalhao.aplantada;


                this.indicadores.mbu.value = this.indicadores.mb.value / this.indicadores.producao.value;
                IndicadoresTalhao.mbu = IndicadoresTalhao.mb / IndicadoresTalhao.producao;

                this.indicadores.ml.value = this.indicadores.rendabruta.value - this.indicadores.cot.value;
                IndicadoresTalhao.ml = IndicadoresTalhao.rendabruta - IndicadoresTalhao.cot;

                this.indicadores.mlap.value = this.indicadores.ml.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.mlap = IndicadoresTalhao.ml / IndicadoresTalhao.aplantada;

                this.indicadores.mlu.value = this.indicadores.ml.value / this.indicadores.producao.value;
                IndicadoresTalhao.mlu = IndicadoresTalhao.ml / IndicadoresTalhao.producao;

                this.indicadores.lucro.value = this.indicadores.rendabruta.value - this.indicadores.ct.value;
                IndicadoresTalhao.lucro = IndicadoresTalhao.rendabruta - IndicadoresTalhao.ct;

                this.indicadores.lucroap.value = this.indicadores.lucro.value / this.indicadores.aplantada.value;
                IndicadoresTalhao.lucroap = IndicadoresTalhao.lucro / IndicadoresTalhao.aplantada;

                this.indicadores.lucrou.value = this.indicadores.lucro.value / this.indicadores.producao.value;
                IndicadoresTalhao.lucrou = IndicadoresTalhao.lucro / IndicadoresTalhao.producao;

                this.indicadores.trcst.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * this.indicadores.aplantada.value))*100 ;
                IndicadoresTalhao.trcst = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area))*100 ;


                //verificar isso aqui
                //estou usando a área do talhao atual, contudo, parece que ela quer a área TOTAL DE TODOS TALHOES DA SAFRA
                this.indicadores.trcct.value = (this.indicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * this.indicadores.aplantada.value + this.indicadores.aplantada.value*safraObj.PrecoMTerraN))*100 ;
                IndicadoresTalhao.trcct = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN))*100 ;


                this.indicadores.bencusto.value = this.indicadores.rendabruta.value / this.indicadores.ct.value;
                IndicadoresTalhao.bencusto = IndicadoresTalhao.rendabruta / IndicadoresTalhao.ct;

                this.indicadores.capitalest.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * this.indicadores.aplantada.value) / this.indicadores.producao.value;
                IndicadoresTalhao.capitalest = ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area) / IndicadoresTalhao.producao;


                this.indicadores.capitalct.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * this.indicadores.aplantada.value + this.indicadores.aplantada.value*safraObj.PrecoMTerraN ) / this.indicadores.producao.value;
                IndicadoresTalhao.capitalct =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN ) / IndicadoresTalhao.producao;


                this.indicadores.taxagiro.value = ((this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value ) * 100;
                IndicadoresTalhao.taxagiro = ((IndicadoresTalhao.rendabruta / IndicadoresTalhao.producao) / IndicadoresTalhao.capitalct ) * 100;

                this.indicadores.lucrativ.value = (this.indicadores.mlu.value / this.indicadores.capitalct.value) * 100;
                IndicadoresTalhao.lucrativ  = (IndicadoresTalhao.mlu / IndicadoresTalhao.capitalct) * 100;

              });
            });
          });

          //media preco venda
          this.indicadores.pcv.value = this.indicadores.pcv.value / SafraCount;

        });
      });
    }
  },
  mounted: function() {
    this.geraIndicadores(this.checkeds);
  },
  watch: {
    checkeds: function (newV, oldV) {
      this.geraIndicadores(this.checkeds);
    }
  }
}
</script>

<style scoped>
.indicator {
  font-size:41px;
}

.unidade {
  font-size:15px;
  color:#B5B5B5;
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
