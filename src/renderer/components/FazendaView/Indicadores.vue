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
              <b>{{i.text}} <v-btn v-if="i.help!=''" flat icon v-on:click="dialog = true, msg=i.help" style="text-align:right; float:right; margin:0;"><v-icon>info</v-icon></v-btn></b>
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

let estoqueCapitalObj = JSON.parse(fs.readFileSync('estoquecapital.json', 'utf8'));
let CidadeTipoEstoque = require('./../cidades_estoque.json');

export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', status: 3, value: 0, unidade: 'R$/Ano', help: '' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: 0, unidade: 'R$/Ano', help: '' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: 0, unidade: 'R$/Ano', help: '' },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 0, unidade: 'R$/Ano', help: ''},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: 0, unidade: 'R$/Sc', help: '' },
        producao: { text: 'PRODUÇÃO',status: 3, value: 0, unidade: 'Sacas', help: '' },
        aplantada: { text: 'ÁREA PLANTADA', status: 3, value: 0, unidade: 'Ha', help: '' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'Und/Ha', help: ''  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '' },
        coeu: { text: 'COE POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: ''  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '' },
        cotu: { text: 'COT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '' },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: '' },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '' },
        mb: { text: 'MARGEM BRUTA', status: 3, value: 0, unidade: 'R$/Ano', help: ''  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: ''  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: '' },
        ml: { text: 'MARGEM LÍQUIDA',status: 3, value: 0, unidade: 'R$/Ano', help: ''  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: ''},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: 0, unidade: 'R$/Sc', help: ''  },
        lucro: { text: 'LUCRO',status: 3, value: 0, unidade: 'R$/Ano', help: ''},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha', help: ''},
        lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc', help: ''  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: 0, unidade: '%', help: ''  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: 0, unidade: '%', help: ''  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: 0, unidade: 'R$', help: '' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 0, unidade: 'R$/Sc', help: '' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 0, unidade: 'R$/Sc', help: ''  },
        taxagiro: { text: 'TAXA DE GIRO', status: 3, value: 0, unidade: '%a.a', help: '' },
        lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: 0, unidade: '%a.a', help: '' }
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
    limpaInterpretacoes(){
      Object.keys(this.indicadores).forEach(key => {
        //this.indicadores[key].help = 'Para visualizar as interpretações é preciso selecionar pelo menos 1 safra para geração de indicadores.';
        this.indicadores[key].help = '';
      });
    },
    calculaInterpretacoes(){
      this.limpaInterpretacoes();
      if(this.indicadores.mb.value<0) this.indicadores.mb.help='Ponto de fechamento da empresa. A propriedade não está conseguindo saldar o custo operacional efetivo (custeio).';
      if(this.indicadores.mb.value==0) this.indicadores.mb.help='A propriedade consegue saldar todo o custo operacional efetivo (custeio), porém não possui sobras para pagamento de depreciação de lavouras, máquinas, equipamentos e benfeitorias e também o pró-labore do empresário. Se a empresa manter este resultado nas próximas safras, pode sair da atividade por não ter a capacidade de renovar os bens para produção.';
      if(this.indicadores.mb.value>0) this.indicadores.mb.help='A propriedade consegue pagar todo o custo operacional efetivo (custeio) e ainda tem sobras para saldar os custos fixos. No curto prazo se mantém na atividade, mas para melhor avaliação, deve-se avançar para a análise da margem líquida.';

      if(this.indicadores.mb.value>0 && this.indicadores.ml.value<0){
        this.indicadores.mb.help+='\n A propriedade consegue pagar todo o custo operacional efetivo (custeio), porém não consegue saldar todo o custo operacional total. Se permanecer com este resultado a empresa sai da atividade no médio prazo.';
        this.indicadores.ml.help+='\n A propriedade consegue pagar todo o custo operacional efetivo (custeio), porém não consegue saldar todo o custo operacional total. Se permanecer com este resultado a empresa sai da atividade no médio prazo.';
      }

      if(this.indicadores.ml.value==0) this.indicadores.ml.help = 'A propriedade consegue saldar todo o custo operacional total (custeio + depreciações + pró-labore), porém não possui sobras para pagamento do custo do capital investido em lavouras, máquinas, equipamentos e benfeitorias. Com este resultado a empresa se mantém na atividade no médio prazo, porém sem atratividade econômica.';
      

    },
    geraIndicadores(SafraIDs){
      if(SafraIDs.length==0){
        Object.keys(this.indicadores).forEach(key => {
          this.indicadores[key].value = 0;
        });
        this.limpaInterpretacoes();
        return;
      }

      let thisindicadores = {};
      Object.assign(thisindicadores, this.indicadores);
      Object.keys(thisindicadores).forEach(key => {
        thisindicadores[key].value = 0;
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
            thisindicadores.pcv.value += safraObj.PrecoVenda;

            this.$backend.getSafraTalhao(safraObj.id, (talhoes) => {
              if(talhoes!=null)
              talhoes.forEach(talhaoObj => {
                let IndicadoresTalhao = {};
                //renda bruta
                thisindicadores.rendabruta.value += (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;
                IndicadoresTalhao.rendabruta = (talhaoObj.ProdTotal * safraObj.PrecoVenda) + talhaoObj.VendaSubP;

                //coe
                thisindicadores.coe.value += talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;

                IndicadoresTalhao.coe = talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo +
                talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Fertilizantes + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios
                + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem;


                //cot
                thisindicadores.cot.value += IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);
                IndicadoresTalhao.cot = IndicadoresTalhao.coe + talhaoObj.MaoObraF + (EstoqueCapital["depreciacao"] * talhaoObj.Area);

                //ct
                thisindicadores.ct.value += IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);
                IndicadoresTalhao.ct = IndicadoresTalhao.cot + (EstoqueCapital["remuneracao"] * talhaoObj.Area);

                //producao
                thisindicadores.producao.value += talhaoObj.ProdTotal;
                IndicadoresTalhao.producao = talhaoObj.ProdTotal;

                //aplantada
                thisindicadores.aplantada.value += talhaoObj.Area;
                IndicadoresTalhao.aplantada = talhaoObj.Area;

                //ppaplantada
                thisindicadores.ppaplantada.value = thisindicadores.producao.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.ppaplantada = IndicadoresTalhao.producao / IndicadoresTalhao.aplantada;

                //coeap
                thisindicadores.coeap.value = thisindicadores.coe.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.coeap = IndicadoresTalhao.coe / IndicadoresTalhao.aplantada;

                //coeu
                thisindicadores.coeu.value = thisindicadores.coe.value / thisindicadores.producao.value;
                IndicadoresTalhao.coeu = IndicadoresTalhao.coe / IndicadoresTalhao.producao;

                //cotap
                thisindicadores.cotap.value = thisindicadores.cot.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.cotap = IndicadoresTalhao.cot / IndicadoresTalhao.aplantada;

                //cotu
                thisindicadores.cotu.value = thisindicadores.cot.value / thisindicadores.producao.value;
                IndicadoresTalhao.cotu = IndicadoresTalhao.cot / IndicadoresTalhao.producao;

                //ctap
                thisindicadores.ctap.value = thisindicadores.ct.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.ctap = IndicadoresTalhao.ct / IndicadoresTalhao.aplantada;

                //ctu
                thisindicadores.ctu.value = thisindicadores.ct.value / thisindicadores.producao.value;
                IndicadoresTalhao.ctu = IndicadoresTalhao.ct / IndicadoresTalhao.producao;

                //mb
                thisindicadores.mb.value = thisindicadores.rendabruta.value - thisindicadores.coe.value;
                IndicadoresTalhao.mb = IndicadoresTalhao.rendabruta - IndicadoresTalhao.coe;

                //mbap
                thisindicadores.mbap.value = thisindicadores.mb.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.mbap  = IndicadoresTalhao.mb / IndicadoresTalhao.aplantada;


                thisindicadores.mbu.value = thisindicadores.mb.value / thisindicadores.producao.value;
                IndicadoresTalhao.mbu = IndicadoresTalhao.mb / IndicadoresTalhao.producao;

                thisindicadores.ml.value = thisindicadores.rendabruta.value - thisindicadores.cot.value;
                IndicadoresTalhao.ml = IndicadoresTalhao.rendabruta - IndicadoresTalhao.cot;

                thisindicadores.mlap.value = thisindicadores.ml.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.mlap = IndicadoresTalhao.ml / IndicadoresTalhao.aplantada;

                thisindicadores.mlu.value = thisindicadores.ml.value / thisindicadores.producao.value;
                IndicadoresTalhao.mlu = IndicadoresTalhao.ml / IndicadoresTalhao.producao;

                thisindicadores.lucro.value = thisindicadores.rendabruta.value - thisindicadores.ct.value;
                IndicadoresTalhao.lucro = IndicadoresTalhao.rendabruta - IndicadoresTalhao.ct;

                thisindicadores.lucroap.value = thisindicadores.lucro.value / thisindicadores.aplantada.value;
                IndicadoresTalhao.lucroap = IndicadoresTalhao.lucro / IndicadoresTalhao.aplantada;

                thisindicadores.lucrou.value = thisindicadores.lucro.value / thisindicadores.producao.value;
                IndicadoresTalhao.lucrou = IndicadoresTalhao.lucro / IndicadoresTalhao.producao;

                thisindicadores.trcst.value = (thisindicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value))*100 ;
                IndicadoresTalhao.trcst = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area))*100 ;


                //verificar isso aqui
                //estou usando a área do talhao atual, contudo, parece que ela quer a área TOTAL DE TODOS TALHOES DA SAFRA
                thisindicadores.trcct.value = (thisindicadores.ml.value / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value + thisindicadores.aplantada.value*safraObj.PrecoMTerraN))*100 ;
                IndicadoresTalhao.trcct = (IndicadoresTalhao.ml / ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN))*100 ;


                thisindicadores.bencusto.value = thisindicadores.rendabruta.value / thisindicadores.ct.value;
                IndicadoresTalhao.bencusto = IndicadoresTalhao.rendabruta / IndicadoresTalhao.ct;

                thisindicadores.capitalest.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value) / thisindicadores.producao.value;
                IndicadoresTalhao.capitalest = ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area) / IndicadoresTalhao.producao;


                thisindicadores.capitalct.value =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * thisindicadores.aplantada.value + thisindicadores.aplantada.value*safraObj.PrecoMTerraN ) / thisindicadores.producao.value;
                IndicadoresTalhao.capitalct =  ((EstoqueCapital["estoquelavouras"]+EstoqueCapital["estoquemaquinas"]+EstoqueCapital["estoquebenfeitorias"]) * talhaoObj.Area + talhaoObj.Area*safraObj.PrecoMTerraN ) / IndicadoresTalhao.producao;


                thisindicadores.taxagiro.value = ((thisindicadores.rendabruta.value / thisindicadores.producao.value) / thisindicadores.capitalct.value ) * 100;
                IndicadoresTalhao.taxagiro = ((IndicadoresTalhao.rendabruta / IndicadoresTalhao.producao) / IndicadoresTalhao.capitalct ) * 100;

                thisindicadores.lucrativ.value = (thisindicadores.mlu.value / thisindicadores.capitalct.value) * 100;
                IndicadoresTalhao.lucrativ  = (IndicadoresTalhao.mlu / IndicadoresTalhao.capitalct) * 100;
              });

            //  this.indicadores = thisindicadores;
            this.indicadores = {}
            Object.assign(this.indicadores, thisindicadores);
            this.calculaInterpretacoes();
            });
          });

          //media preco venda
          thisindicadores.pcv.value = thisindicadores.pcv.value / SafraCount;

        });
      });
    }
  },
  mounted: function() {
    //this.geraIndicadores(this.checkeds);
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
