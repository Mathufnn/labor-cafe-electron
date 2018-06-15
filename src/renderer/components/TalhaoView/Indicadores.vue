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
              <b>{{i.text}}</b><br /><span class="indicator">{{formatN(i.value)}}</span> <span class="unidade"><b>{{i.unidade}}</b></span>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      indicadores: {
        rendabruta: { text: 'RENDA BRUTA', status: 3, value: 0, unidade: 'R$/Ano' },
        coe: { text: 'CUSTO OPERACIONAL EFETIVO (COE)',  status: 3, value: 0, unidade: 'R$/Ano' },
        cot: { text: 'CUSTO OPERACIONAL TOTAL (COT)',status: 3, value: 0, unidade: 'R$/Ano' },
        ct: { text: 'CUSTO TOTAL (CT)', status: 3, value: 0, unidade: 'R$/Ano'},
        pcv: { text: 'PREÇO MÉDIO DE VENDA', status: 3, value: 0, unidade: 'R$/Sc' },
        producao: { text: 'PRODUÇÃO',status: 3, value: 0, unidade: 'Sacas' },
        aplantada: { text: 'ÁREA PLANTADA', status: 3, value: 0, unidade: 'Ha' },
        ppaplantada: { text: 'PRODUÇÃO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'Und/Ha'  },
        coeap: { text: 'COE POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        coeu: { text: 'COE POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc'  },
        cotap: { text: 'COT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        cotu: { text: 'COT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        ctap: { text: 'CT POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha' },
        ctu: { text: 'CT POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        mb: { text: 'MARGEM BRUTA', status: 3, value: 0, unidade: 'R$/Ano'  },
        mbap: { text: 'MARGEM BRUTA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'  },
        mbu: { text: 'MARGEM BRUTA POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc' },
        ml: { text: 'MARGEM LÍQUIDA',status: 3, value: 0, unidade: 'R$/Ano'  },
        mlap: { text: 'MARGEM LÍQUIDA POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'},
        mlu: { text: 'MARGEM LÍQUIDA POR UNIDADE',status: 3, value: 0, unidade: 'R$/Sc'  },
        lucro: { text: 'LUCRO',status: 3, value: 0, unidade: 'R$/Ano'},
        lucroap: { text: 'LUCRO POR ÁREA PLANTADA', status: 3, value: 0, unidade: 'R$/Ha'},
        lucrou: { text: 'LUCRO POR UNIDADE', status: 3, value: 0, unidade: 'R$/Sc'  },
        trcst: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL SEM TERRA',status: 3, value: 0, unidade: '%'  },
        trcct: { text: 'TAXA DE REMUNERAÇÃO DO CAPITAL COM TERRA', status: 3, value: 0, unidade: '%'  },
        bencusto: { text: 'RELAÇÃO BENEFÍCIO/CUSTO',status: 3, value: 0, unidade: 'R$' },
        capitalest: { text: 'CAPITAL EMPATADO SEM TERRA', status: 3, value: 0, unidade: 'R$/Sc' },
        capitalct: { text: 'CAPITAL EMPATADO COM TERRA', status: 3, value: 0, unidade: 'R$/Sc'  },
        taxagiro: { text: 'TAXA DE GIRO', status: 3, value: 0, unidade: '%a.a' },
        lucrativ: { text: 'LUCRATIVIDADE', status: 3, value: 0, unidade: '%a.a' }
      }
    }
  },
  props: {
    tid: {
      default: '-1'
    }
  },
  methods: {
    formatN(vr){
      return vr.toLocaleString('pt-BR');
    }
  },
  mounted: function() {
    this.$backend.getTalhao(this.tid, (talhaoObj) => {
      this.$backend.getSafra(talhaoObj.SafraID, (safraObj) => {
        //renda bruta
        this.indicadores.rendabruta.value = Math.floor(talhaoObj.ProdTotal * safraObj.PrecoVenda);
        //coe
        this.indicadores.coe.value = Math.floor(talhaoObj.ArrendamentoTerras + talhaoObj.AluguelMaquinas + talhaoObj.Combustivel + talhaoObj.ManutencaoBenf + talhaoObj.ManutencaoMaq + talhaoObj.EnergiaEletrica + talhaoObj.Frete + talhaoObj.Impostos + talhaoObj.MaoObraContratada + talhaoObj.MaoObraFixa + talhaoObj.Despesas + talhaoObj.Assistencia + talhaoObj.Certificacao + talhaoObj.AnaliseSolo + talhaoObj.AnaliseFoliar + talhaoObj.EPi + talhaoObj.Acidos + talhaoObj.Adubos + talhaoObj.Acaricida  + talhaoObj.Bactericida + talhaoObj.Espalhante + talhaoObj.Fungicida + talhaoObj.Inseticida + talhaoObj.Nematicida + talhaoObj.OleoMineral + talhaoObj.Herbicida + talhaoObj.Hormonios + talhaoObj.Maturadores + talhaoObj.MaterialColheita + talhaoObj.Armazenamento + talhaoObj.Beneficios + talhaoObj.GasLenhaCarvao + talhaoObj.PosColheita + talhaoObj.Rebeneficio + talhaoObj.Saco + talhaoObj.Correntagem);

        //cot
        this.indicadores.cot.value = Math.floor(this.indicadores.coe.value + talhaoObj.MaoObraF) /* + CAPITALESTOQUE DEPRECIACAO */;

        //ct
        this.indicadores.ct.value = Math.floor(this.indicadores.cot.value) /* + CAPITALESTOQUE REMUNERACAO CAPITAL */;

        //pcv
        this.indicadores.pcv.value = Math.floor(safraObj.PrecoVenda);

        //producao
        this.indicadores.producao.value = Math.floor(talhaoObj.ProdTotal);

        //aplantada
        this.indicadores.aplantada.value = Math.floor(safraObj.AreaProducao);

        //ppaplantada
        this.indicadores.ppaplantada.value = Math.floor(this.indicadores.producao.value / this.indicadores.aplantada.value);

        //coeap
        this.indicadores.coeap.value = Math.floor(this.indicadores.coe.value / this.indicadores.aplantada.value);

        //coeu
        this.indicadores.coeu.value = Math.floor(this.indicadores.coe.value / this.indicadores.producao.value);

        //cotap
        this.indicadores.cotap.value = Math.floor(this.indicadores.cot.value / this.indicadores.aplantada.value);

        //cotu
        this.indicadores.cotu.value = Math.floor(this.indicadores.cot.value / this.indicadores.producao.value);

        //ctap
        this.indicadores.ctap.value = Math.floor(this.indicadores.ct.value / this.indicadores.aplantada.value);

        //ctu
        this.indicadores.ctu.value = Math.floor(this.indicadores.ct.value / this.indicadores.producao.value);

        //mb
        this.indicadores.mb.value = Math.floor(this.indicadores.rendabruta.value - this.indicadores.coe.value);

        //mbap
        this.indicadores.mbap.value = Math.floor(this.indicadores.mb.value / this.indicadores.aplantada.value);


        this.indicadores.mbu.value = Math.floor(this.indicadores.mb.value / this.indicadores.producao.value);

        this.indicadores.ml.value = Math.floor(this.indicadores.rendabruta.value - this.indicadores.cot.value);

        this.indicadores.mlap.value = Math.floor(this.indicadores.ml.value / this.indicadores.aplantada.value);

        this.indicadores.mlu.value = Math.floor(this.indicadores.ml.value / this.indicadores.producao.value);

        this.indicadores.lucro.value = Math.floor(this.indicadores.rendabruta.value - this.indicadores.ct.value);

        this.indicadores.lucroap.value = Math.floor(this.indicadores.lucro.value / this.indicadores.aplantada.value);

        this.indicadores.lucrou.value = Math.floor(this.indicadores.lucro.value / this.indicadores.producao.value);

        this.indicadores.trcst.value = Math.floor(this.indicadores.ml.value) /* / ESTOQC EM LAVOURAS +   BENFEITORIAS */ ;

        this.indicadores.trcct.value = Math.floor(this.indicadores.ml.value) /* / ESTOQC EM LAVOURAS +   BENFEITORIAS  +  estoque capital em terra */;

        this.indicadores.vbencusto.value = Math.floor(this.indicadores.rendabruta.value / this.indicadores.ct.value);

        this.indicadores.capitalest.value =  /* ESTOQC EM LAVOURAS +   BENFEITORIAS  / */  Math.floor(this.indicadores.producao.value);

        this.indicadores.capitalct.value =   /* ESTOQC EM LAVOURAS +   BENFEITORIAS + estoque de capital em terra / */ Math.floor(this.indicadores.producao.value)

        this.indicadores.taxagiro.value = Math.floor((this.indicadores.rendabruta.value / this.indicadores.producao.value) / this.indicadores.capitalct.value);

        this.indicadores.lucrativ.value = Math.floor(this.indicadores.mlu.value / this.indicadores.capitalct.value);

      });
    });
//
  }


}
</script>

<style scoped>
  .indicator {
    font-size:41px;
  }

  .unidade {
    font-size:15px;

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
